
import React, { useCallback, useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./style/style.css";
import { ModuleRegistry } from "@ag-grid-community/core";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { MenuModule } from "@ag-grid-enterprise/menu";
import { FiltersToolPanelModule } from "@ag-grid-enterprise/filter-tool-panel";
import { ColumnsToolPanelModule } from "@ag-grid-enterprise/column-tool-panel";
import { SetFilterModule } from "@ag-grid-enterprise/set-filter";
import CustomLoadingOverlay from "./customLoadingOverlay";

//Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  MenuModule,
  FiltersToolPanelModule,
  ColumnsToolPanelModule,
  SetFilterModule,
]);

const PatientBillSnapshot = () => {
  const gridRef = useRef();

  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' , marginTop:'30px'  }), []);

  const [rowData, setRowData] = useState();
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

  const onGridReady = useCallback((params) => {
    
      fetch(`/api/patientBillSnapshots`)
      .then((resp) => resp.json())
      .then((data) =>  {setRowData(data)})
      .catch( (error) => {
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
    <div  style={{
      marginTop: 50,
      marginBottom: 100,
      marginLeft: 100,
      marginRight: 100,
    }}>
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
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default PatientBillSnapshot;
