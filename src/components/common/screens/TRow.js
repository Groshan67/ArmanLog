import React from "react";
import TCell from "./TCell";
import hasSomeParentTheClasses from "../utils/hasSomeParentTheClasses";

function TRow(props) {
	const {
		row,
		onRowClick,
		rowDynamicStyle,
		// eslint-disable-next-line no-unused-vars
		selectable,
	} = props;

	return (
		<tr
			{...row.getRowProps({
				onClick: (e) => {
					if (onRowClick && !hasSomeParentTheClasses(e.target, ["CRTS", "ACTIONS"])) onRowClick(row);
				},
			})}
			style={rowDynamicStyle && rowDynamicStyle(row)}
		>
			{row.cells.map((cell, index) => (
				<TCell cell={cell} key={index} />
			))}
		</tr>
	);
}

export default TRow;
