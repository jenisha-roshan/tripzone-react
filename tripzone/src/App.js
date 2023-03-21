import "./App.scss";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import NotFoundPage from "./screens/NotFoundPage";
import LoginPage from "./screens/LoginPage";
import HomePage from "./screens/HomePage/HomePage";
import CheckoutPage from "./screens/CheckoutPage";

function App() {
  return (
    <div className="App">
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/checkout-page" element={<CheckoutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
