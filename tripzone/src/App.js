import "./App.scss";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import NotFoundPage from "./screens/NotFoundPage";
import LoginPage from "./screens/LoginPage";
import HomePage from "./screens/HomePage/HomePage";
import CheckoutPage from "./screens/CheckoutPage";
import React, { useState } from "react";

export const UserContext = React.createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home-page" element={<HomePage />} />
            <Route path="/checkout-page" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
