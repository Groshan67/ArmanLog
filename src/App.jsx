import React from 'react';
import Layout from "./components/shared/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthContextProvider } from "./components/shared/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import PartyLogs from "./pages/PartyLogs";
import Jobs from "./pages/Jobs";
import PatientBillSnapshot from "./pages/PatientBillSnapshot";

// const App = () => {
//   return (
//     <>
//       <AuthContextProvider>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Home />}></Route>
//             <Route
//               path="/login"
//               element={
//                 <ProtectedRoute accessBy="non-authenticated">
//                   <Login />
//                 </ProtectedRoute>
//               }
//             ></Route>
//             <Route path="/jobs" element={<Jobs />}></Route>
//             <Route path="/patientBillSnapshot" element={<PatientBillSnapshot />}></Route>
//             <Route
//               path="/partylogs"
//               element={
//                 <ProtectedRoute accessBy="authenticated">
//                   <PartyLogs />
//                 </ProtectedRoute>
//               }
//             ></Route>
//           </Routes>
//         </Layout>
//       </AuthContextProvider>
//     </>
//   );
// };

// export default App;











//class App extends Component {
  function App()  {
  
    return (
      
      <AuthContextProvider>
      <Layout>
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
            <Route path="/jobs" element={<Jobs />}></Route>
            <Route path="/patientBillSnapshot" element={<PatientBillSnapshot />}></Route>
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
      
    );
  
}

export default App;