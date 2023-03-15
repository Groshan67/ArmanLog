import React from "react";
import SearchIcon from "../assets/icons/search";
import replaceVariables from "../utils/replaceVariables";

export default function GlobalFilter({
	preGlobalFilteredRowsLength,
	globalFilter,
	setGlobalFilter,
	caption,
	placeholder,
}) {
	return (
		<div className="flex items-center px-3">
			{caption || <SearchIcon size={16} fill="#718096" />}
			<input
				value={globalFilter || ""}
				onChange={(e) => {
					setGlobalFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
				}}
				placeholder={replaceVariables(placeholder, [preGlobalFilteredRowsLength])}
				style={{
					background: "transparent",
					width: "calc(100% - 20px)",
					lineHeight: 2,
					outline: 0,
				}}
				className="px-3 py-2"
			/>
		</div>
	);
}