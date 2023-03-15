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

const PartyLogs = () => {
  const [gridApi, setGridApi] = useState(null);
  const perPage = 10;

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      sortable: true,
      resizable: true,
      filter: true,
      minWidth: 230,
      rowHeight: 1500,
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
      //autoHeight: true,
      wrapHeaderText: true,
      autoHeaderHeight: true,
    };
  }, []);
  const gridRef = useRef();
  const [columnDefs] = useState([
    {
      field: "id",
      headerName: "شناسه",
      flex: 1,
      minWidth: 120,
    },
    {
      field: "httpMethod",
      headerName: "متد درخواست",
      flex: 1,
      minWidth: 150,
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
      headerName: "آدرس یو آر ال",
      flex: 1,
      minWidth: 500,
    },
    {
      field: "responseBody",
      headerName: "بدنه پاسخ",
      flex: 1,
      minWidth: 600,
    },
    {
      field: "requestBody",
      headerName: "بدنه درخواست",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "requestHeader",
      headerName: "هدر درخواست",
      flex: 1,
      minWidth: 400,
    },
    {
      field: "responseHeader",
      headerName: "هدر پاسخ",
      flex: 1,
      minWidth: 400,
    },
    { field: "requestTime", headerName: "زمان درخواست" },
    {
      field: "responseTime",
      headerName: "زمان پاسخ",
    },
    {
      field: "responseStatus",
      headerName: "وضعیت پاسخ",
    },
    {
      field: "responseException",
      headerName: "خطا",
    },
    { field: "createdAt", headerName: "زمان ایجاد" },
    { field: "updatedAt", headerName: "زمان بروز رسانی" },
    { field: "updatedBy", headerName: "کاربر بروز رسانی" },
  ]);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

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
          let pageSize = params.endRow - params.startRow,
            pageNum = params.startRow / pageSize;

          //console.log("pageNum.pageNum: ", pageNum);

          jwtInterceptor
          .post(`${baseURL}/filter?page=${pageNum}&size=${pageSize}`, {
              httpMethod: "POST",
              createdBy: "",
              uri: null,
              responseException: null,
              responseStatus: null,
            })
            .then((res) => {
              if (!res.data.content) {
                gridApi.showNoRowsOverlay();
              } else {
                gridApi.hideOverlay();
              }
              params.successCallback(res.data.content, res.data.totalElements);
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
    <div>
      <div
        style={{
          height: "800px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="container" style={{ marginRight: "600px" }}>
          <i className="button" onClick={onExportClick}>
            {floppy}
          </i>
        </div>

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
            showToolPanel={true}
            columnHoverHighlight={true}
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
  );
};

export default PartyLogs;
