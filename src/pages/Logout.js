import { useContext, useEffect, useState } from "react";

import styled from "styled-components";
import AuthContext from "../components/shared/AuthContext";
import Login from "./Login";

const Logins = styled.div`
height: '100vh',
min-height : '100vh'
`;
const Logout = () => {
  const { logout } = useContext(AuthContext);
  const [ setMyTime] = useState(new Date());

  useEffect(() => {
    logout();
    var timerID = setInterval(() => tick(), 1000);

    return () => {
      <Logins>
        <Login />
      </Logins>;
      clearInterval(timerID);
    };
  });

  function tick() {
    setMyTime(new Date());
  }
};

export default Logout;
