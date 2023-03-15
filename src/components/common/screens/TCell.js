import React from "react";

function TCell({ cell }) {
	return (
		!cell.column?.hidden && (
			<td
				{...cell.getCellProps()}
				style={{
					textAlign: cell.column.align || "",
					borderTop: 1,
				}}
				className={`border-dashed border-t border-gray-200 text-gray-700 px-3 py-4 ${
					cell.column.className || ""
				}`}
			>
				{cell.render("Cell", {})}
			</td>
		)
	);
}

export default React.memo(TCell);