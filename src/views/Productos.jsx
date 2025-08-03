import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../style/Productos.css";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Productos = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState();
  const { user } = useAuth();

  // BOTÓN DE DELETE -----------------------------------
  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "productos", id));
      setProductos(productos.filter((p) => p.id !== id));
    } catch (error) {
      setError("No se pudo eliminar el producto");
    }
  };

  // FETCHING PRODUCTOS ---------------------------------------
  const fetchingProduct = async () => {
    try {
      const productosRef = collection(db, "productos");
      const snapShot = await getDocs(productosRef);
      const docs = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(docs);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchingProduct();
  }, []);

  // MODAL FELICITACIONES COMPRA ---------------------
  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  useEffect(() => {
    const manejarEscape = (event) => {
      if (event.key === "Escape") {
        cerrarModal();
      }
    };

    if (modalAbierto) {
      document.addEventListener("keydown", manejarEscape);
    }

    return () => {
      document.removeEventListener("keydown", manejarEscape);
    };
  }, [modalAbierto]);

  return (
    <Layout>
      <section>
        <div className="MainProductos">
          <h2 id="inviernoProductos">
            LLEGAMOS HASTA EL ÚLTIMO RINCÓN DE TU PAÍS{" "}
          </h2>
          <div className="productoLista1">
            {productos.map((producto) => (
              <div className="productoCardMaster" key={producto.id}>
                <div
                  className="productoCard"
                  onClick={() => abrirModal(producto)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="productoImagenContainer1">
                    <img
                      className="productoImagen"
                      src={
                        producto.imagenURL ||
                        "https://static.vecteezy.com/system/resources/previews/001/631/580/non_2x/add-photo-icon-with-camera-vector.jpg"
                      }
                      alt={producto.nombre}
                    />
                  </div>
                  <div className="productoDescripcion">
                    <h3>{producto.nombre}</h3>
                    <p
                      style={{
                        color: "rgba(0, 0, 0, 0.51)",
                        borderBottom: "1px solid rgba(0, 0, 0, 0.17)",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      {producto.sku}
                    </p>
                    <p>{producto.descripcion}</p>
                  </div>
                  <div className="productoPrecio">
                    <div className="PrecioAntesDespuesMaster">
                      {Number(producto.descuento) !== 0 && (
                        <h4 className="precioAntes1">
                          Antes $
                          {producto.price?.toLocaleString("es-AR") || "N/A"}
                        </h4>
                      )}
                      <h4 className="precioDespues">
                        {Number(producto.descuento) !== 0 && <>Ahora</>} $
                        {(
                          parseInt(producto.price) -
                          (parseInt(producto.descuento) *
                            parseInt(producto.price)) /
                            100
                        )?.toLocaleString("es-AR")}
                      </h4>
                    </div>
                  </div>
                  <div className="productoBoton">
                    {Number(producto.descuento) !== 0 && (
                      <div className="productoDescuento">
                        <p className="productoDescuentotag">
                          {`${producto.descuento}% OFF`}
                        </p>
                      </div>
                    )}
                    <div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirModal(producto);
                        }}
                        className="productoBotonComprar"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
                {user && (
                  <div className="botoneseditar">
                    <Link
                      className="botonEditar"
                      to={`/editar-producto/${producto.id}`}
                    >
                      Editar
                    </Link>
                    <button
                      className="botonEditar"
                      onClick={() => handleDeleteProduct(producto.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}

            
            {user && (<Link to="/admin" className="productoCard nuevoProductoCard">
              <div className="productoCardMaster">
                <div>
                  
                    <div className="nuevoProductoContenido">
                      <h3>+ Crear Nuevo Producto</h3>
                    </div>
                  
                </div>
              </div></Link>
            )}

            {modalAbierto && productoSeleccionado && (
              <div className="modalProductos" id="modalProductos">
                <div className="modalProductosMain">
                  <h2>FELICITACIONES POR SU COMPRA</h2>
                  <p>
                    Compraste: <strong>{productoSeleccionado.nombre}</strong>
                  </p>
                  <p>Su producto será enviado en la brevedad,</p>
                  <p>Te llegará un correo.</p>
                  <p className="resaltado">¡Muchas Gracias!</p>
                  <button onClick={cerrarModal}>Cerrar</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Productos;
