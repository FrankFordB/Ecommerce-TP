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
  const [tipo, setTipo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [color, setColor] = useState("");
  const [talla, setTalla] = useState("");
  const [sku, setSku] = useState(""); 
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
        setTipo(data.tipo || "");
        setCategoria(data.categoria || "");
        setColor(data.color || "");
        setTalla(data.talla || "");
        setSku(data.sku || ""); 
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

    if (!nombre || !price || !descripcion || !tipo || !categoria || !color || !talla) {
      setError("Debe completar todos los campos obligatorios.");
      setMensaje("");
      return;
    }

    const updatedSku = `${tipo}-${categoria}-${color}-${talla}`;

    try {
      const docRef = doc(db, "productos", id);
      await updateDoc(docRef, {
        nombre,
        price,
        descripcion,
        imagenURL,
        descuento,
        tipo,
        categoria,
        color,
        talla,
        sku: updatedSku, 
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

          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            value={sku}
            disabled 
            placeholder="SKU del producto"
            maxLength={50}
          />

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

          <label htmlFor="tipo">Tipo:</label>
          <select
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

          <label htmlFor="categoria">Categoría:</label>
          <select
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

          <label htmlFor="color">Color:</label>
          <select
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

          <label htmlFor="talla">Talla:</label>
          <select
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

          <label htmlFor="descuento">Descuento:</label>
          <select
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

          {error && <p style={{ color: "red", fontSize: "16px" }}>{error}</p>}
          {mensaje && (
            <p style={{ color: "green", fontSize: "16px" }}>{mensaje}</p>
          )}
          {timer !== null && (
            <>
              <p style={{ color: "white", fontSize: "16px" }}>
                Redirigiendo en {timer} segundos
              </p>
              <Link
                style={{ color: "blue", fontSize: "16px" }}
                to={"/productos"}
              >
                Redireccionar ahora
              </Link>
            </>
          )}
          <button type="submit">Actualizar Producto</button>
        </form>
      </section>
    </Layout>
  );
};

export default EditarProductos;