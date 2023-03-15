import React from "react";
import GlobalFilter from "./GlobalFilter";
import AngleUp from "../assets/icons/angle-up";
import AngleDown from "../assets/icons/angle-down";

function THead(props) {
	const {
		sortable,
		globalFilter,
		translations,
		headerGroups,
		setGlobalFilter,
		visibleColumns,
		preGlobalFilteredRowsLength,
		deleteGlobalFilter,
	} = props;

	return (
		<thead>
			{!deleteGlobalFilter && (
				<tr>
					<th colSpan={visibleColumns.length} className="bg-gray-300">
						<GlobalFilter
							placeholder={translations.searchinXrecords}
							globalFilter={globalFilter}
							setGlobalFilter={setGlobalFilter}
							preGlobalFilteredRowsLength={preGlobalFilteredRowsLength}
						/>
					</th>
				</tr>
			)}
			{headerGroups.map((headerGroup, key) => (
				<tr key={key} {...headerGroup.getHeaderGroupProps()} /* divider={true} */>
					{headerGroup.headers
						.filter((item) => !item.hidden)
						.map((column, key) => (
							<th
								key={key}
								{...column.getHeaderProps(
									sortable &&
										column.getSortByToggleProps({
											title: translations.toggleSortBy,
										})
								)}
								className="bg-gray-200 top-0 border-b border-gray-300 p-3 text-gray-600 font-light uppercase text-sm"
								style={{
									cursor: sortable ? "pointer" : "default",
									width: column.width,
									whiteSpace: "nowrap",
									textAlign: "unset",
								}}
							>
								{column.render("Header")}

								{column.isSorted && (
									<span className="mr-2 relative" style={{ top: 1 }}>
										{column.isSortedDesc ? (
											<AngleDown size={10} fill="#999" />
										) : (
											<AngleUp size={10} fill="#999" />
										)}
									</span>
								)}
							</th>
						))}
				</tr>
			))}
		</thead>
	);
}

export default THead; //React.memo(THead);
