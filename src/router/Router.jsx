import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../views/Home";
import Dashboard from "../views/Dashboard";
import Register from "../views/Register";
import Login from "../views/Login";
import Productos from "../views/Productos";
import EditarProductos from "../views/EditarProductos";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editar-producto/:id" element={<EditarProductos />} />
        </Routes>
    </BrowserRouter>
  );
};

export { Router };