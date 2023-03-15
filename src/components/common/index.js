import React, { useMemo, useState, useEffect } from "react";
import { useTable, useGlobalFilter, useSortBy, usePagination, useRowSelect } from "react-table";
import THead from "./screens/THead";
import TBody from "./screens/TBody";
import Checkbox from "./screens/Checkbox";
import convertIndexes from "./utils/convertIndexes";
import isEqual from "lodash/isEqual";
import isEqualWith from "lodash/isEqualWith";
import isFunction from "lodash/isFunction";
import Pagination from "./screens/Pagination";
// Style
import "./assets/styles/main.css";


let indexes = [];
function Index(options) {
	const [indexState, setIndexState] = useState("0");
	// Options
	const {
		columns,
		data,
		onRowClick,
		rowDynamicStyle,
		defaultSorted,
		sortable,
		selectable,
		setSelectedRowIds,
		direction,
		deleteGlobalFilter,
		pageCount,
		fetchData,
		pageNumber,
	} = options;
	// ClayTable Options
	const tableOptions = {
		/* 		bodyVerticalAlignment: options.bodyVerticalAlignment,
		borderedColumns: options.borderedColumns,
		borderless: options.borderless,
		headingNoWrap: options.headingNoWrap,
		headVerticalAlignment: options.headVerticalAlignment,
		noWrap: options.noWrap,
		responsive: options.responsive,
		responsiveSize: options.responsiveSize,
		striped: options.striped,
		tableVerticalAlignment: options.tableVerticalAlignment, */
	};
	// Search
	const filterTypes = useMemo(
		() => ({
			text: (rows, id, filterValue) => {
				return rows.filter((row) => {
					const rowValue = row.values[id];
					return rowValue !== undefined
						? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
						: true;
				});
			},
		}),
		[]
	);
	// Translates
	const translations = useMemo(
		() => ({
			searchinXrecords: "جستجو در بین {0} ردیف",
			toggleSortBy: "تغییر وضعیت ترتیب",
			pageXofY: "صفحه {0} از {1}",
			showX: "نمایش {0} تایی",
			noDataText: "ردیفی یافت نشد",
			loadingText: "در حال بارگیری...",
			previousText: "قبل",
			pageText: "صفحه",
			rowsText: "ردیف ها",
			nextText: "بعد",
			ofText: "از",
			...options.translations,
		}),
		[]
	);
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		// Pagination
		page, // rows
		canPreviousPage,
		canNextPage,
		pageOptions,
		// pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		// eslint-disable-next-line no-unused-vars
		state: { pageIndex, pageSize, selectedRowIds, globalFilter },
		// Search
		visibleColumns,
		preGlobalFilteredRows,
		setGlobalFilter,
		// Select
		// selectedFlatRows
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: indexState }, // Pass our hoisted table state
			manualPagination: true, // Tell the usePagination
			// hook that we'll handle our own data fetching
			// This means we'll also have to provide our own
			// pageCount.
			pageCount: pageCount,
			filterTypes,
			translations,
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		// Select
		useRowSelect,
		(hooks) => {
			if (selectable) {
				hooks.visibleColumns.push((columns) => {
					const newColumns = columns.slice();
					newColumns.unshift({
						width: 0,
						id: "selection",
						className: "CRTS",
						Cell({ row }) {
							return <Checkbox {...row.getToggleRowSelectedProps()} />;
						},
						Header(props) {
							return <Checkbox {...props.getToggleAllRowsSelectedProps()} />;
						},
					});
					return newColumns;
				});
			}
		}
	);

	// Send selectedRowIds to parent
	useEffect(() => {
		if (setSelectedRowIds !== undefined && !isEqual(indexes, convertIndexes(selectedRowIds))) {
			setSelectedRowIds(convertIndexes(selectedRowIds));
			indexes = selectedRowIds;
		}
	}, [selectedRowIds]);

	// bodyProps
	let bodyProps = {
		onRowClick,
		rowDynamicStyle,
		selectable,
		translations,
		getTableBodyProps,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		pageIndex,
		pageSize,
		visibleColumns,
		direction,
		fetchData,
	};

	if (true) {
		//bodyProps["pageIndex"] = 5;
	}

	// Render
	return (
		<div className="tw-react-table">
			<div className="bg-white rounded-lg shadow-sm relative">
				{/* overflow-x-auto overflow-y-auto */}
				<table
					className={`border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative ${
						options.hover && "hoverable"
					}`}
					{...getTableProps()}
					{...tableOptions}
				>
					<THead
						deleteGlobalFilter={deleteGlobalFilter}
						sortable={sortable}
						translations={translations}
						globalFilter={globalFilter}
						headerGroups={headerGroups}
						setGlobalFilter={setGlobalFilter}
						visibleColumns={visibleColumns}
						preGlobalFilteredRowsLength={preGlobalFilteredRows.length}
					/>
					<TBody {...bodyProps} />
				</table>
			</div>

			{pageCount > 1 && <Pagination setIndex={setIndexState} {...bodyProps} />}
		</div>
	);
}

export default React.memo(Index, (prev, next) =>
	isEqualWith(prev, next, (p, n) => (isFunction(p) && isFunction(n) ? p.toString() === n.toString() : isEqual(p, n)))
);
