import { useState } from "react";
import Layout from "../components/Layout/Layout";
import "../style/Dashboard.css";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

const Dashboard = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenURL, setImagenURL] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [descuento, setDescuento] = useState("");
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [color, setColor] = useState("");
  const [talla, setTalla] = useState("");
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

  const handlePrecioChange = (e) => {
    const valor = e.target.value;
    const valorNumerico = valor.replace(/\./g, ""); // Elimina los puntos
    setPrecio(valorNumerico);
  };

  const formatearPrecio = (numero) => {
    if (!numero) return "";
    return Number(numero).toLocaleString("es-AR"); // Formatear con puntos
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !precio || !descripcion || !tipo || !categoria || !color || !talla) {
      setError("Debe completar todos los campos obligatorios.");
      setMensaje("");
      return;
    }

    // Generar el SKU automático
    const sku = `${tipo}-${categoria}-${color}-${talla}-${Date.now()}`;

    const newProduct = {
      nombre,
      price: parseFloat(precio),
      descripcion,
      descuento,
      imagenURL: imagenURL || "",
      tipo,
      categoria,
      color,
      talla,
      sku, // Agregar el SKU generado
    };

    try {
      await createProduct(newProduct);
      setMensaje("✅ Producto agregado correctamente.");
      setError("");
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setImagenURL("");
      setDescuento("");
      setTipo("");
      setCategoria("");
      setColor("");
      setTalla("");
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
          <p style={{ color: "white", textAlign: "end" }}>{nombre.length}/36</p>

          <label htmlFor="precio">Precio</label>
          <input
            type="text"
            id="precio"
            value={formatearPrecio(precio)}
            onChange={handlePrecioChange}
            placeholder="$2.000"
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            style={{
              width: "90%",
              height: "10dvh",
              textTransform: "capitalize",
              fontSize: "16px",
            }}
            type="text"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            maxLength={100}
            placeholder="Hecho de cuero sintético"
          />
          <p style={{ color: "white", textAlign: "end" }}>{descripcion.length}/100</p>

          <label htmlFor="imagenURL">Imagen URL (opcional)</label>
          <input
            type="text"
            id="imagenURL"
            value={imagenURL}
            onChange={(e) => setImagenURL(e.target.value)}
            placeholder="https://..."
          />
          <a
            target="_blank"
            style={{ color: "white", textAlign: "end" }}
            href="https://www.pexels.com/es-es/"
          >
            Imagenes de alta calidad gratis
          </a>
            <div style={{display:"flex",width:"90%", justifyContent:"space-between"}}>
          <label htmlFor="tipo">Tipo:</label>
          <select className="dashboarSelect1"
            id="tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="">-- Selecciona un tipo --</option>
            <option value="ELEC">Electrónica</option>
            <option value="ROPA">Ropa</option>
            <option value="HOGAR">Hogar</option>
            <option value="DEPORTE">Deporte</option>
            <option value="JUGUETES">Juguetes</option>
            <option value="LIBROS">Libros</option>
          </select>
</div>
<div style={{display:"flex",width:"90%", justifyContent:"space-between" }}>
          <div>
          <label htmlFor="categoria">Categoría:</label>
          </div>
            <div>
          <select className="dashboarSelect1"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">-- Selecciona una categoría --</option>
            <option value="MOVIL">Móviles</option>
            <option value="TV">Televisores</option>
            <option value="COCINA">Cocina</option>
            <option value="DEPORTES">Deportes</option>
            <option value="LIBROS">Libros</option>
            <option value="JUGUETES">Juguetes</option>
          </select>
          </div>
</div>
<div style={{display:"flex",width:"90%", justifyContent:"space-between" }}>
          <label htmlFor="color">Color:</label>
          <select className="dashboarSelect1"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="">-- Selecciona un color --</option>
            <option value="ROJO">Rojo</option>
            <option value="AZUL">Azul</option>
            <option value="VERDE">Verde</option>
            <option value="NEGRO">Negro</option>
            <option value="BLANCO">Blanco</option>
          </select>
          </div>
            <div style={{display:"flex",width:"90%", justifyContent:"space-between" }}>
          <label htmlFor="talla">Talla:</label>
          <select className="dashboarSelect1"
            id="talla"
            value={talla}
            onChange={(e) => setTalla(e.target.value)}
          >
            <option value="">-- Selecciona una talla --</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <div style={{display:"flex",width:"90%", justifyContent:"space-between" }}> 
          <label htmlFor="descuento">Descuento:</label>
          <select className="dashboarSelect1"
            id="descuento"
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
        </div>
          {error && <p style={{ color: "red", fontSize: "16px" }}>{error}</p>}
          {mensaje && <p style={{ color: "green", fontSize: "16px" }}>{mensaje}</p>}

          <button type="submit">Agregar Producto</button>
        </form>
      </section>
    </Layout>
  );
};

export default Dashboard;