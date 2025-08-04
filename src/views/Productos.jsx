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
  const [modalEliminarProd, setModalEliminarProd] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null); // Estado para el producto a eliminar

  // BOTÓN DE DELETE -----------------------------------
  const handleDeleteProduct = async () => {
    if (!productoAEliminar) return;

    try {
      await deleteDoc(doc(db, "productos", productoAEliminar));
      setProductos(productos.filter((p) => p.id !== productoAEliminar));
      setModalEliminarProd(false); // Cierra el modal después de eliminar
      setProductoAEliminar(null); // Limpia el estado del producto a eliminar
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

  const abrirModalEliminar = (id) => {
    setProductoAEliminar(id); // Establece el producto a eliminar
    setModalEliminarProd(true); // Abre el modal de confirmación
  };

  const cerrarModalEliminar = () => {
    setModalEliminarProd(false); // Cierra el modal de confirmación
    setProductoAEliminar(null); // Limpia el estado del producto a eliminar
  };

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
                      onClick={() => abrirModalEliminar(producto.id)} // Abre el modal de confirmación
                    >
                      Eliminar
                    </button>
                  </div>
                )}
              </div>
            ))}

            {user && (
              <Link to="/admin" className="productoCard nuevoProductoCard">
                <div className="productoCardMaster">
                  <div>
                    <div className="nuevoProductoContenido">
                      <h3>+ Crear Nuevo Producto</h3>
                    </div>
                  </div>
                </div>
              </Link>
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

            {modalEliminarProd && (
              <div className="modal d-block" tabIndex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Eliminar Producto</h5>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={cerrarModalEliminar}
                        aria-label="Close"
                      ></button>
                    </div>

                    <div className="modal-body">
                      <p>¿Estás seguro que deseas eliminar este producto?</p>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary promo"
                        onClick={cerrarModalEliminar}
                      >
                        No
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDeleteProduct}
                        style={{ width: "15vh" }}
                      >
                        Sí
                      </button>
                    </div>
                  </div>
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
