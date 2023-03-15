import React from "react";

export default function ErrorMessage({ message, ...props }) {
	return (
		<div className="text-center">
			<p className="text-red-600 mx-auto font-semibold text-center my-6 rounded-lg  p-3 border-2   border-current	inline-block">
				{message ? message : "خطا در فراخوانی اطلاعات"}
			</p>
		</div>
	);
}