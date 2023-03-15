//import { keyframes } from "emotion";
import React from "react";
import LoadingOverlay from "react-loading-overlay";
import ErrorMessage from "../inputs/alert/ErrorMessage";
import Loading from "../loading/Loading";

export default function CustomLoadingOverlay({ err, loading, customeErrorMessage, children, ...props }) {
	// 	var spin = keyframes`
	//     0% {   background-color: #0000;
	// 	}
	//     50% {   background-color: #fff0;
	// 	}
	// 	100% {   background-color: #0000;
	// 	}
	// `;

	const overlayStyle = {
		color: "#fff",
		background: "#f5f8faaa", //"rgb(255, 255, 255, 0.5)",
		filter: "drop-shadow(0px 0px 18px  #f5f8fa)",
		//	animation: `${spin} 2s linear infinite`,
	};
	return (
		<>
			{err && <ErrorMessage message={customeErrorMessage} />}
			<LoadingOverlay
				styles={{
					overlay: (base) => ({
						...base,
						...overlayStyle,
					}),
				}}
				active={loading}
				spinner={<Loading />}
			>
				{children}
			</LoadingOverlay>
		</>
	);
}
