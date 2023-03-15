import React, { useEffect } from "react";
import AngleRight from "../assets/icons/angle-right";
import AngleLeft from "../assets/icons/angle-left";
import replaceVariables from "../utils/replaceVariables";
import _isEqual from "lodash/isEqual";
import uuid from "react-uuid";

function Pagination(props) {
	const {
		translations,
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
		fetchData,
		setIndex,
	} = props;

	useEffect(() => {
		setIndex(pageIndex);
		fetchData(pageIndex, pageSize);
	}, [fetchData, pageSize, pageIndex]);

	const pageItemClass =
		"items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium";
	let rows = [];
	let ellipsis = false;
	for (let i = 0; i < pageCount; i++) {
		const condition =
			i === 0 ||
			(pageIndex > i && i > pageIndex - 3) ||
			(pageIndex < i && i < pageIndex + 3) ||
			i === pageIndex ||
			i === pageCount - 1;

		if (!ellipsis && !condition) {
			rows.push(
				<span key={uuid()} className={`${pageItemClass} text-gray-700`}>
					...
				</span>
			);
			ellipsis = true;
		}

		if (condition) {
			rows.push(
				<button
					key={uuid()}
					disabled={i === pageIndex}
					onClick={() => {
						gotoPage(i);
					}}
					className={`${pageItemClass} hover:bg-gray-50 focus:outline-none ${
						i === pageIndex ? "text-gray-400" : "text-gray-700"
					}`}
				>
					{i + 1}
				</button>
			);
			ellipsis = false;
		}

		if (!ellipsis && !condition) {
			rows.push(<span className={pageItemClass}>...</span>);
			ellipsis = true;
		}
	}

	return (
		<div className="footer mt-4">
			<div className="pagination flex items-center">
				<nav className="relative z-0 inline-flex shadow-sm -space-x-px">
					<a
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
						className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
							canPreviousPage ? "text-gray-600" : "text-gray-300"
						} hover:bg-gray-50`}
					>
						<span className="sr-only">Previous</span>
						<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
					{rows}
					<a
						disabled={!canNextPage}
						onClick={() => nextPage()}
						className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
							canNextPage ? "text-gray-600" : "text-gray-300"
						} hover:bg-gray-50`}
					>
						<span className="sr-only">Next</span>
						<svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
							<path
								fillRule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</nav>

				<div className="flex flex-wrap items-stretch relative mr-auto overflow-hidden shadow-sm rounded-md">
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
						className="flex-shrink flex-grow flex-auto leading-normal flex-1 border h-10 px-3 relative text-gray-700 text-sm font-medium"
						style={{ marginLeft: -20 }}
					>
						{[5, 10, 25, 50, 100].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								{replaceVariables(translations.showX, [pageSize])}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}

export default React.memo(Pagination, (prev, next) =>
	_isEqual(
		[prev.pageCount, prev.pageIndex, prev.pageSize, prev.translations],
		[next.pageCount, next.pageIndex, next.pageSize, next.translations]
	)
);
