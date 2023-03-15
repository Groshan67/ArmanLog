import React from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const Loading = () => {

  return (
    <div>
      <ClipLoader
        className="flex items-center"
        css={override}
        size={50}
        color={"#5415a5"}
        loading
      />
    </div>
  );
};

export default Loading;