import React from "react";
import TRow from "./TRow";
import Empty from "./Empty";

function TBody(props) {
	const { getTableBodyProps, prepareRow, page, visibleColumns } = props;

	return (
		<tbody {...getTableBodyProps()}>
			{page.map((row, index) => {
				prepareRow(row);
				const rowProps = {
					row,
					key: index,
					onRowClick: props.onRowClick,
					rowDynamicStyle: props.rowDynamicStyle,
					selectable: props.selectable,
				};
				return <TRow key={row.id} {...rowProps} />;
			})}

			{!page.length && <Empty colSpan={visibleColumns.length} />}
		</tbody>
	);
}

export default TBody;
