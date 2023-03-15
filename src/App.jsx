import React from "react";
import Layout from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import { AuthContextProvider } from "./components/shared/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import PartyLogs from "./pages/PartyLogs";
import Test from "./pages/Test";

import PatientBillSnapshot from "./pages/PatientBillSnapshot";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <Layout >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/login"
              element={
                <ProtectedRoute accessBy="non-authenticated">
                  <Login />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/logout" element={<Logout />}></Route>
            <Route
              path="/patientBillSnapshot"
              element={<PatientBillSnapshot />}
            ></Route>
         
            <Route
              path="/partylogs"
              element={
                <ProtectedRoute accessBy="authenticated">
                  <PartyLogs />
                </ProtectedRoute>
              }
            ></Route>
          </Routes>
        </Layout>
      </AuthContextProvider>
    </>
  );
};

export default App;
