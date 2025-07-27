import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import Layout from "../components/Layout/Layout";
import "../style/EditarProductos.css";

const EditarProductos = () => {
  const [nombre, setNombre] = useState("");
  const [price, setPrice] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descuento, setDescuento] = useState("");
  const [imagenURL, setImagenURL] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setNombre(data.nombre);
        setPrice(data.price);
        setDescripcion(data.descripcion);
        setDescuento(data.descuento || "");
        setImagenURL(data.imagenURL || "");
      }
    } catch (error) {
      setError("Error al cargar el producto");
    }
  };
 useEffect(() => {
    if (timer === null) return;

    if (timer === 0) {
      navigate("/productos");
      return;
    }

    const timerOut = setTimeout(() => {
      setTimer(timer - 1);
    }, 1000);

    return () => clearTimeout(timerOut);
  }, [timer]);


  useEffect(() => {
    fetchProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!nombre || !price || !descripcion) {
      setError("Debe completar todos los campos obligatorios.");
      setMensaje("");
      return;
    }

    try {
      const docRef = doc(db, "productos", id);
      await updateDoc(docRef, {
        nombre,
        price,
        descripcion,
        imagenURL,
        descuento,
        updatedAt: Date.now(),
      });
      setTimer(5);
      setMensaje("✅ Producto actualizado correctamente.");
      setError("");
      
    } catch (error) {
      setError("❌ Error al actualizar el producto.");
      setMensaje("");
    }
  };
 
  return (
    <Layout>
      <section className="EditarProductos-section">
        <form onSubmit={handleSubmit} className="EditarProductos-form-section">
          <h2>Panel de Edición de Productos</h2>

          <label htmlFor="nombre">ID | SKU</label>
          <input
            type="text"
            id="nombre"
            value={id}
            disabled
            placeholder="Nombre del producto"
            maxLength={36}
          />

          <label htmlFor="nombre">Nombre del Producto {timer}</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
            maxLength={36}
          />
          <p style={{ color: "white", textAlign: "end" }}>{nombre.length}/36</p>

          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="$2000"
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            style={{
              width: "90%",
              height: "10dvh",
              textTransform: "capitalize",
              fontSize: "16px",
            }}
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            maxLength={100}
            placeholder="Hecho de cuero sintético"
          />
          <p style={{ color: "white", textAlign: "end" }}>
            {descripcion.length}/100
          </p>

          <label htmlFor="imagenURL">Imagen URL (opcional)</label>
          <input
            type="text"
            id="imagenURL"
            value={imagenURL}
            onChange={(e) => setImagenURL(e.target.value)}
            placeholder="https://..."
          />
<a target="_blank" style={{color:"white", textAlign:"end"}} href="https://www.pexels.com/es-es/">Imagenes de alta calidad gratis</a>
          <label htmlFor="categoria">Descuento:</label>
          <select
            id="categoria"
            className="selectDescuento"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
          >
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
          {mensaje && (
            <p style={{ color: "green", fontSize: "16px" }}>{mensaje}</p>
          )}
          {timer !== null && (
            <>
             <p style={{ color: "white", fontSize: "16px" }}> Redirigiendo en {timer} segundos {timer !== 1 } a productos
             </p> <Link style={{ color: "blue", fontSize: "16px" }} to={"/productos"}>Redireccionar ahora</Link>
            </>
          )}
          <button type="submit">Actualizar Producto</button>
        </form>
      </section>
    </Layout>
  );
};

export default EditarProductos;
