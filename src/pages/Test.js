import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
 import "./style/style.css";
// import "./style/PatientBillSnapshot.scss";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import CustomLoadingOverlay from "./customLoadingOverlay";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";

//Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  SetFilterModule,
]);

const Test = () => {
  const gridRef = useRef();
  const inputRef = useRef();

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const containerStyle = useMemo(
    () => ({ width: "100%", height: "100%", marginTop: "30px" }),
    []
  );

  const [rowData, setRowData] = useState();
  const [query, setQuery] = useState({
    script: `SELECT TOP 2 [Id],[PatientUID],[PersonalId],[InsurerCode],[CreatedDate]  FROM [PatientBillSnapshot] Order By [Id] Desc `,
  });
  const handleChangeText = (event) => {
    setQuery({ script: event.target.value });
  };
  const [columnDefs] = useState([
    { field: "Id", filter: "agTextColumnFilter", minWidth: 150 },
    { field: "PatientUID", filter: "agTextColumnFilter", minWidth: 600 },
    { field: "PersonalId", filter: "agTextColumnFilter" },
    { field: "InsurerCode", filter: "agNumberColumnFilter", minWidth: 200 },
    {
      field: "CreatedDate",
      // filter: "agDateColumnFilter",
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      minWidth: 150,

      floatingFilter: true,
      cellStyle: (params) => {
        if (params.value === "POST") {
          return { color: "Orange" };
        } else if (params.value === "GET") {
          return { color: "Green" };
        }
        return null;
      },
      wrapText: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);

  const onGridReady = useCallback(
    (params) => {
      fetch(`/api/query`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(query),
      })
        .then((resp) => resp.json())
        .then((data) => {
          // if (data.name === "ERROR") {
          //   setError(data);
          // }
          setRowData(data);
        })

        // fetch(`/api/patientBillSnapshots`)
        // .then((resp) => resp.json())
        // .then((data) =>  {setRowData(data)})
        .catch((err) => {
          console.log(err);
        });

      params.api.getToolPanelInstance("filters").expandFilters();
    },
    [query]
  );

  const loadingOverlayComponent = useMemo(() => {
    return CustomLoadingOverlay;
  }, []);
  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: "لطفا چند لحظه صبر نمایید...",
    };
  }, []);

  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <div
      style={{
        marginTop: 50,
        marginBottom: 100,
        marginLeft: 100,
        marginRight: 100,
      }}
    >
      <FormControl >
        <FormLabel>Your Script</FormLabel>
        <Textarea
          value={query.script}
          ref={inputRef}
          onChange={handleChangeText}
          minRows={2}
          maxRows={5}
          endDecorator={
            <Box
              sx={{
                display: "flex",
                gap: "var(--Textarea-paddingBlock)",
                pt: "var(--Textarea-paddingBlock)",
                borderTop: "1px solid",
                borderColor: "divider",
                flex: "auto",
              }}
            >
              <IconButton
                variant="plain"
                color="neutral"
                onClick={(event) => setAnchorEl(event.currentTarget)}
              >
                <FormatBold />
                <KeyboardArrowDown fontSize="md" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                size="sm"
                placement="bottom-start"
                sx={{ "--List-decorator-size": "24px" }}
              >
                {["200", "normal", "bold"].map((weight) => (
                  <MenuItem
                    key={weight}
                    selected={fontWeight === weight}
                    onClick={() => {
                      setFontWeight(weight);
                      setAnchorEl(null);
                    }}
                    sx={{ fontWeight: weight }}
                  >
                    <ListItemDecorator>
                      {fontWeight === weight && <Check fontSize="sm" />}
                    </ListItemDecorator>
                    {weight === "200" ? "lighter" : weight}
                  </MenuItem>
                ))}
              </Menu>
              <IconButton
                variant={italic ? "soft" : "plain"}
                color={italic ? "primary" : "neutral"}
                aria-pressed={italic}
                onClick={() => setItalic((bool) => !bool)}
              >
                <FormatItalic />
              </IconButton>
              <Button
               className="buttons"
                variant="soft"
                color="success"
                ref={gridRef}
                onClick={onGridReady}
                sx={{ ml: "auto" }}
              >
                execute !
              </Button>
            </Box>
          }
          sx={{
            minWidth: 300,
            fontWeight,
            borderColor: "#571382",
            fontStyle: italic ? "italic" : "initial",
          }}
        />
      </FormControl>

      <div style={containerStyle}>
        <div className="example-wrapper">
          <div
            style={{
              height: "800px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={gridStyle} className="ag-theme-alpine">
              <AgGridReact
                ref={gridRef}
                pagination={true}
                loadingOverlayComponent={loadingOverlayComponent}
                loadingOverlayComponentParams={loadingOverlayComponentParams}
                showToolPanel={true}
                columnHoverHighlight={true}
                rowData={rowData}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                sideBar={"filters"}
                enableRtl={true}
                onGridReady={onGridReady}
              ></AgGridReact>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
