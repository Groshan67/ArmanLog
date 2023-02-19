import React, { useCallback, useMemo, useRef, useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "@ag-grid-community/react";
import axios from "axios";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css";
import "./style/style.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import CustomLoadingOverlay from "./customLoadingOverlay";


// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  SetFilterModule,
]);

var filterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    var dateAsString = cellValue;
    if (dateAsString == null) return -1;
    var dateParts = dateAsString.split("/");
    var cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0])
    );
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
  browserDatePicker: true,
};

var savedFilterModel = null;

const PatientBillSnapshot = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(
    () => ({ width: "800px", height: "1200px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const [rowData, setRowData] = useState();
  const [columnDefs, setColumnDefs] = useState([
    { field: "Id", filter: "agTextColumnFilter", minWidth: 150 },
    { field: "PatientUID", filter: "agTextColumnFilter", minWidth: 600 },
    { field: "PersonalId", filter: "agTextColumnFilter" },
    { field: "InsurerCode", filter: "agNumberColumnFilter", minWidth: 200 },
    {
      field: "CreatedDate",
      filter: "agDateColumnFilter",
      filterParams: filterParams,
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
      //rowHeight: 400,
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

  const onGridReady = useCallback((params) => {
    axios
      .get(`/api/patientBillSnapshots`)
      // .then((resp) => resp.json())
      .then(function (response) {
        setRowData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    params.api.getToolPanelInstance("filters").expandFilters();
  }, []);

  const loadingOverlayComponent = useMemo(() => {
    return CustomLoadingOverlay;
  }, []);
  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: "لطفا چند لحظه صبر نمایید...",
    };
  }, []);

  return (
    <div>
      <div
        style={{
          height: "800px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="container" style={{ marginRight: "600px" }}>
          {/* <a className="button" onClick={() => onExportClick()}>
            {floppy}
          </a> */}
        </div>

        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            ref={gridRef}
            // enableRtl={true}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            sideBar={"filters"}
            onGridReady={onGridReady}
            animateRows={true}
            pagination={true}
            loadingOverlayComponent={loadingOverlayComponent}
            loadingOverlayComponentParams={loadingOverlayComponentParams}
            showToolPanel={true}
            columnHoverHighlight={true}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default PatientBillSnapshot;
