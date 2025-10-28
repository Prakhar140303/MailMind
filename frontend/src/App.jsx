import { BrowserRouter , Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/DashBoard.jsx";
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from "react";
import { fetchSession } from "./store/authSlice.js";
import ProtectedRoute from "./utils/ProtectedRoutes.jsx"; 
import Header from "./components/Header.jsx";

function App() {
  const dispatch = useDispatch();
  const { loading , isAuthenticated} = useSelector((state) => state.auth);
  useEffect(()=>{
    dispatch(fetchSession());
  },[dispatch]);
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-500 text-lg">
        Checking session...
      </div>
    );
  }
  return (
    <BrowserRouter>
      {/* <Header/> */}
        <Routes>
          <Route path="/" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
             </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
