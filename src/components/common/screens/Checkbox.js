import React, { useRef, forwardRef } from "react";
// eslint-disable-next-line no-unused-vars
export default forwardRef(function CheckBox({ indeterminate, title, ...params }, ref) {
	const defaultRef = useRef();
	const resolvedRef = ref || defaultRef;
	return (
		<input
			type="checkbox"
			ref={resolvedRef}
			{...params}
			title={title === "Toggle Row Selected" ? "تغییر انتخاب ردیف" : "تغییر انتخاب همه ردیف"}
			className="form-checkbox text-teal-500 px-2 py-2 hover:bg-gray-200"
		/>
	);
	// <input type="checkbox" className="form-checkbox h-5 w-5 text-gray-600" checked />;
});
