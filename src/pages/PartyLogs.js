import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import jwtInterceptor from "../components/shared/jwtInterceptor";
import PropTypes from "prop-types";
import { DataGrid, GridToolbar, faIR, gridClasses } from "@mui/x-data-grid";
import {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
} from "@mui/material/styles";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import LinearProgress from "@mui/material/LinearProgress";

const baseURL = "https://hlthubofinsco.services.centinsur.ir";
const LOG_URL = "/api/log/thirdPartyServices";
const theme = createTheme({
  typography: {
    fontFamily: "Vazir",
  },
});

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    "&:hover, &.Mui-hovered": {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      "@media (hover: none)": {
        backgroundColor: "transparent",
      },
    },
    "&.Mui-selected": {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity
      ),
      "&:hover, &.Mui-hovered": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity
        ),
        // Reset on touch devices, it doesn't add specificity
        "@media (hover: none)": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  },
}));

const ExpandableCell = ({ value }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Box>
      {expanded ? value : value.slice(0, 200)}&nbsp;
      {value.length > 10 && (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link
          type="button"
          component="button"
          sx={{ fontSize: "inherit" }}
          onClick={() => setExpanded(!expanded)}
        >
          <br></br>
          {expanded ? "کمتر" : "نمایش بیشتر"}
        </Link>
      )}
    </Box>
  );
};

ExpandableCell.propTypes = {
  /**
   * The cell value.
   * If the column has `valueGetter`, use `params.row` to directly access the fields.
   */
  value: PropTypes.any,
};

const columns = [
  { field: "id", headerName: "ردیف", flex: 1, minWidth: 50 },
  { field: "httpMethod", headerName: "متد", flex: 1, minWidth: 88 },
  { field: "createdBy", headerName: "نام شرکت", flex: 1, minWidth: 100 },
  {
    field: "uri",
    headerName: "Uri",
    flex: 1,
    minWidth: 400,
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
    renderCell: (params) => <ExpandableCell {...params} />,
  },
  { field: "requestTime", headerName: "requestTime", flex: 1, minWidth: 200 },
  { field: "responseTime", headerName: "responseTime", flex: 1, minWidth: 200 },
  {
    field: "responseStatus",
    headerName: "responseStatus",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "responseException",
    headerName: "responseException",
    flex: 1,
    minWidth: 200,
  },
  { field: "createdAt", headerName: "CreatedAt", flex: 1, minWidth: 200 },
  { field: "updatedAt", headerName: "UpdatedAt", flex: 1, minWidth: 200 },
  { field: "updatedBy", headerName: "UpdatedBy", flex: 1, minWidth: 100 },
];

const PartyLogs = () => {
  const [errMsg, setErrMsg] = useState("");
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    totalPages: 0,
    page: 0,
    pageSize: 10,
  });

  const fetchData = async () => {
    try {
      console.log("ON");
      setPageState((old) => ({ ...old, isLoading: true }));

      const response = await jwtInterceptor.get(
        `${baseURL}${LOG_URL}?page=${pageState.page}&size=${pageState.pageSize}`
      );

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: response.data.content,
        totalPages: response.data.totalPages,
      }));
    } catch (err) {
      setErrMsg(err.messsage);
      console.log(errMsg);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageState.page, pageState.pageSize]);

  return (
    <ThemeProvider theme={theme}>
      <Box dir="rtl">
        <Container
          style={{
            height: 500,
            width: "auto",
            marginTop: 100,
            marginBottom: 100,
          }}
        >
          <StripedDataGrid
            sortingMode="server"
            filterMode="server"
            rowsLoadingMode="server"
            experimentalFeatures={{
              lazyLoading: true,
            }}
            localeText={faIR.components.MuiDataGrid.defaultProps.localeText}
            rows={pageState.data}
            page={pageState.page + 1}
            pageSize={pageState.pageSize}
            rowsPerPageOptions={[10, 30, 50, 70, 100]}
            paginationMode="server"
            onPageChange={(newPage) => {
              setPageState((old) => ({ ...old, page: newPage + 1 }));
            }}
            onPageSizeChange={(newPageSize) =>
              setPageState((old) => ({ ...old, pageSize: newPageSize }))
            }
            columns={columns}
            rowCount={pageState.totalPages}
            loading={pageState.isLoading}
            getEstimatedRowHeight={() => 150}
            getRowHeight={() => "auto"}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
            }
            components={{
              Toolbar: GridToolbar,
              LoadingOverlay: LinearProgress,
            }}
            sx={{
              "& .MuiDataGrid-toolbarContainer": {
                direction: "ltr",
              },
              "& .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolbar": {
                direction: "ltr",
              },

              "& .MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                py: 1,
              },
              "& .MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                py: "15px",
              },
              "& .MuiDataGrid-root--densityComfortable .MuiDataGrid-cell": {
                py: "22px",
              },
              "& .MuiDataGrid-virtualScroller": {
                overflow: "scroll",
              },
            }}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default PartyLogs;
