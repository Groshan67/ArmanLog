import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState, useRef } from "react";
import { BASE_URL } from "../services/urls";
import jwtInterceptor from "../components/shared/jwtInterceptor";
import "../pages/style/PartyLogs.scss";
import "./style/style.css";

// Insurer
const initialOptionsArr = ["Arman_Hubins", "Dana_Hubins", "Saman_Hubins"];

function PartyLogs() {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 0,
    pageSize: 10,
    searchApiData: "",
  });
  const [columns] = useState([
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
  const handleCreateChange = (newValue) => {
    setPageState((old) => ({
      ...old,
      searchApiData: newValue.target.value,
    }));
  };
  const inputRef = useRef();
  const [options, setOptions] = useState(initialOptionsArr);
  const handleInputChange = ({ target }) => {
    if (target.value) {
      const filteredOptions = initialOptionsArr.filter((option) =>
        option.toLowerCase().startsWith(target.value.toLowerCase())
      );
      setOptions(filteredOptions);
      setPageState((old) => ({ ...old, searchApiData: target.value }));
    } else {
      setOptions(initialOptionsArr);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const response = await jwtInterceptor.post(
        `${BASE_URL}log/thirdPartyServices/filter?page=${pageState.page}&size=${pageState.pageSize}`,
        {
          httpMethod: "POST",
          createdBy: pageState.searchApiData,
          uri: null,
          responseException: null,
          responseStatus: null,
        }
      );

      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: response.data.content,
        total: response.data.totalPages,
      }));
    };
    console.log("searchApiData : ", pageState.searchApiData);
    fetchData();
  }, [pageState.page, pageState.pageSize, pageState.searchApiData]);

  return (
    <Box>
      <div
        style={{
          marginTop: 50,
          marginBottom: 100,
          marginLeft: 100,
          marginRight: 100,
        }}
      >
        {/* Input */}
        <div className="Card">
          <div className="CardInner">
            <div className="container">
              <div className="Icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#657789"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <div className="InputContainer">
                <input
                  ref={inputRef}
                  type="text"
                  list="insurer"
                  name="mycountry"
                  id="countryInput"
                  onBlur={() => {
                    inputRef.current.focus();
                  }}
                  onInput={handleInputChange}
                  placeholder="...شرکت بیمه"
                />
                <datalist id="insurer">
                  {options.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </datalist>
              </div>
            </div>
          </div>
        </div>
        {/* Input */}

        <DataGrid
          style={{ fontFamily: "Shabnam" }}
          autoHeight
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50]}
          pagination
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
          columns={columns}
          componentsProps={{
            filterPanel: { onChange: handleCreateChange },
          }}
        />
      </div>
    </Box>
  );
}
export default PartyLogs;
