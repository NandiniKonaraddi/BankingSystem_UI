
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './views/actions/store';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
<Provider store={store}>
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="/auth/*" element={<AuthLayout />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
      </Routes>
    <ToastContainer autoClose={3000} />
  </BrowserRouter>
  </Provider>
);
