import { useState } from "react";
import Layout from "../components/Layout/Layout";
import "../style/Dashboard.css";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useEffect } from "react";

const Dashboard = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenURL, setImagenURL] = useState(""); // Nueva imagen opcional
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [descuento,setDescuento] = useState("");
  const productosRef = collection(db, "productos");


  const createProduct = async (productData) => {
    const timestamp = Date.now();
    try {
      const productRef = await addDoc(productosRef, {
        ...productData,
        createdAt: timestamp,
        updatedAt: timestamp,
      });
      return productRef;
    } catch (error) {
      console.error("No se pudo agregar el producto:", error);
      throw error;
    }
  };




  const handleDescuento = (e) => {
    setDescuento(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación
    if (!nombre || !precio || !descripcion) {
      setError("Debe completar todos los campos obligatorios.");
      setMensaje("");
      return;
    }

    const newProduct = {
      nombre,
      price: parseFloat(precio),
      descripcion,
      descuento,
      imagenURL: imagenURL || "", 
    };

    try {
      await createProduct(newProduct);
      setMensaje("✅ Producto agregado correctamente.");
      setError("");
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setImagenURL("");
      setDescuento("")
    } catch (error) {
      setError("❌ Error al agregar el producto.");
      setMensaje("");
    }
  };

  return (
    <Layout>
      <section className="Dashboard-section">
        <form onSubmit={handleSubmit} className="Dashboard-form-section">
          <h2>Panel de Administrador</h2>

          <label htmlFor="nombre">Nombre del Producto</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
            maxLength={36}
          />
          <p style={{color:"white", textAlign:"end"}}>{nombre.length }/36 </p>

          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="$2000"
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea style={{width: "90%", height:"10dvh", textTransform:"capitalize", fontSize:"16px"}}
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            maxLength={100}
            
            placeholder="Hecho de cuero sintético"
          />
          <p style={{color:"white", textAlign:"end"}}>{descripcion.length}/100</p>

          <label htmlFor="imagenURL">Imagen URL (opcional)</label>
          <input
            type="text"
            id="imagenURL"
            value={imagenURL}
            onChange={(e) => setImagenURL(e.target.value)}
            placeholder="https://..."
          />
          <label htmlFor="categoria">Descuento:</label>
<select id="categoria" className="selectDescuento" value={descuento} onChange={handleDescuento}>
  <option value="">-- Selecciona un descuento --</option>
  <option value="0">Sin Descuento</option>
  <option value="5">5%</option>
  <option value="10">10%</option>
  <option value="15">15%</option>
  <option value="20">20%</option>
  <option value="25">25%</option>
  <option value="30">30%</option>
</select>

          {error && <p style={{ color: "red", fontSize: "16px" }}>{error}</p>}
          {mensaje && <p style={{ color: "green", fontSize: "16px" }}>{mensaje}</p>}

          <button type="submit">Agregar Producto</button>
        </form>
      </section>
    </Layout>
  );
};

export default Dashboard;
