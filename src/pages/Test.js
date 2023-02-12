import React, { useEffect, useState, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import jwtInterceptor from "../components/shared/jwtInterceptor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import CustomLoadingOverlay from "./customLoadingOverlay";
import "./style/style.css";
import "./style/styles.scss";

const baseURL =
  "https://hlthubofinsco.services.centinsur.ir/api/log/thirdPartyServices";

const floppy = <FontAwesomeIcon icon={faFloppyDisk} />;

const PostList = () => {
  const [gridApi, setGridApi] = useState(null);
  const perPage = 5;

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      width: 100,
      sortable: true,
      resizable: true,
      filter: true,
      minWidth: 220,
      rowHeight: 1500,
      floatingFilter: true,
      cellStyle: (params) => {
        if (params.value === "POST") {
          //mark POST cells as Orange
          return { color: "Orange" };
        } else if (params.value === "GET") {
          return { color: "Green" };
        }
        return null;
      },
      wrapText: true,
      //autoHeight: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);
  const gridRef = useRef();
  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "ردیف",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "httpMethod",
      headerName: "متد",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "createdBy",
      headerName: "نام شرکت",
      filter: "agTextColumnFilter",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "uri",
      headerName: "Uri",
      flex: 1,
      minWidth: 500,
    },
    {
      field: "responseBody",
      headerName: "responseBody",
      flex: 1,
      minWidth: 600,
    },
    {
      field: "requestBody",
      headerName: "RequestBody",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "requestHeader",
      headerName: "requestHeader",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "responseHeader",
      headerName: "responseHeader",
      flex: 1,
      minWidth: 400,
    },
    { field: "requestTime", headerName: "requestTime" },
    {
      field: "responseTime",
      headerName: "responseTime",
    },
    {
      field: "responseStatus",
      headerName: "responseStatus",
    },
    {
      field: "responseException",
      headerName: "responseException",
    },
    { field: "createdAt", headerName: "CreatedAt" },
    { field: "updatedAt", headerName: "UpdatedAt" },
    { field: "updatedBy", headerName: "UpdatedBy" },
  ]);
  const containerStyle = useMemo(
    () => ({ width: "100px", height: "100px" }),
    []
  );
  const gridStyle = useMemo(() => ({ height: "800px", width: "1000px" }), []);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  useEffect(() => {
    if (gridApi) {
      const dataSource = {
        getRows: (params) => {
          // Use startRow and endRow for sending pagination to Backend
          // params.startRow : Start Page
          // params.endRow : End Page

          gridApi.showLoadingOverlay();
          const page = params.endRow / perPage;

          jwtInterceptor
            .get(`${baseURL}?page=${page}&size=${perPage}`)
            .then((res) => {
              if (!res.data.number) {
                console.log("sss", res.data.number);
                gridApi.showNoRowsOverlay();
              } else {
                gridApi.hideOverlay();
              }
              params.successCallback(res.data.content, res.data.totalPages);
            })
            .catch((err) => {
              gridApi.showNoRowsOverlay();
              params.successCallback([], 0);
            });
        },
      };

      gridApi.setDatasource(dataSource);
    }
  }, [gridApi]);
  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  };

  const loadingOverlayComponent = useMemo(() => {
    return CustomLoadingOverlay;
  }, []);
  const loadingOverlayComponentParams = useMemo(() => {
    return {
      loadingMessage: "لطفا چند لحظه صبر نمایید...",
    };
  }, []);

  return (
    <div style={containerStyle}>
      <div
        style={{
          marginTop: "20px",
          height: "800px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="container">
          <a className="button" href={() => onExportClick()}>
            {floppy}
          </a>
        </div>

        <div style={{ flexGrow: "1", height: "10px" }}>
          <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
              ref={gridRef}
              enableRtl={true}
              animateRows={true}
              pagination={true}
              columnDefs={columnDefs}
              rowModelType={"infinite"}
              paginationPageSize={perPage}
              cacheBlockSize={perPage}
              onGridReady={onGridReady}
              rowHeight={150}
              defaultColDef={defaultColDef}
              // overlayLoadingTemplate={loadingOverlayComponent}
              loadingOverlayComponent={loadingOverlayComponent}
              loadingOverlayComponentParams={loadingOverlayComponentParams}
              overlayNoRowsTemplate={
                '<span className="ag-overlay-loading-center">اطلاعاتی برای نمایش موجود نیست.</span>'
              }
            ></AgGridReact>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostList;
