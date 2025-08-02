import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../style/Productos.css";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { Await } from "react-router-dom";
import { Link } from "react-router-dom";
import 'animate.css'
import { useAuth } from "../context/AuthContext";

const Productos = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState();
  
  const {user} = useAuth()
  
  //BOTON DE DELETE -----------------------------------
  const handleDeleteProduct = async (id) => {
    try { 
      await deleteDoc (doc(db, "productos", id))
      setProductos(productos.filter(p=>p.id!==id))
    } catch (error) {
      setError("no se pudo hacer nada")
      
    }
  }
  //BOTON DE DELETE -----------------------------------


  // -- FETCHING PRODUCTOS---------------------------------------
  const fetchingProduct = async () => {
    try {
      const productosRef = collection(db, "productos");
      const snapShot = await getDocs(productosRef); // ✅ getDocs, no getDoc
      const docs = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProductos(docs);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchingProduct();
  }, []);
  // -- FETCHING PRODUCTOS---------------------------------------

  // -- MODAL FELICITACIONES COMPRA---------------------
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
// -- MODAL FELICITACIONES COMPRA---------------------
  

  return (
    <Layout>
      <section>
        <div className="MainProductos1">
          <h2 id="inviernoProductos">
            LLEGAMOS HASTA EL ULTIMO RINCON DE TU PAIS{" "}
          </h2>
          <div className="productoLista animate__animated">
            {productos.map((producto) => (
              <>
                <div>
                  <label
                    className="modalProducto"
                    key={producto.id}
                    onClick={() => abrirModal(producto)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="productosMaster animate__slideOutUp">
                      <div>
                        <img
                          className="productoImagen animate__fadeOut"
                          src={
                            producto.imagenURL ||
                            "https://static.vecteezy.com/system/resources/previews/001/631/580/non_2x/add-photo-icon-with-camera-vector.jpg"
                          }
                          alt={producto.nombre}
                        />
                      </div>
                      <div className="descripcionDelProductoBlock">
                        <h3>{producto.nombre}</h3>
                        <p>{producto.sku}</p>
                        <p
                          style={{
                            fontSize: "16px",
                            color: "black",
                            textAlign: "center",
                          }}
                        >
                          {producto.descripcion}
                        </p>
                      </div>
                      <div className="precioMaster">
                        {Number(producto.descuento) !== 0 && (
                          <>
                            {" "}
                            <div className="precioDescuento">
                              <p
                                style={{
                                  fontSize: "20px",
                                  color: "white",
                                  textAlign: "center",
                                }}
                              >
                                {`${producto.descuento}% OFF`}
                              </p>
                            </div>
                          </>
                        )}

                        <div>
                          {Number(producto.descuento) !== 0 && (
                            <>
                              <h4 className="precioAntes">
                                Antes ${producto.price?.toLocaleString("es-ES") || "N/A"}
                              </h4>
                            </>
                          )}
                          <h4 className="precioDespues">
                            {Number(producto.descuento) !== 0 && (
                              <>
                                <h4>Ahora</h4>
                              </>
                            )}{" "}
                            $
                            {(
                              parseInt(producto.price) -
                              (parseInt(producto.descuento) *
                                parseInt(producto.price)) /
                                100
                            )?.toLocaleString("es-AR")}
                          </h4>
                        </div>
                      </div>
                      <div className="productosBoton">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            abrirModal(producto);
                          }}
                          className="productosBotonComprar"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </label>
                 {user &&
                  <div className="botoneseditar">
                    <Link className="botonEditar" to={`/editar-producto/${producto.id}`}>Editar</Link>
                    <button  onClick={()=> handleDeleteProduct(producto.id)}>Eliminar</button>
                  </div>}
                </div>
              </>
            ))}
            {modalAbierto && productoSeleccionado && (
              <div className="modalProductos" id="modalProductos">
                <div className="modalProductosMain">
                  <h2>FELICITACIONES POR SU COMPRA</h2>
                  <p>
                    Compraste: <strong>{productoSeleccionado.nombre}</strong>
                  </p>
                  <p>Su producto será enviado en la brevedad,</p>
                  <p>Te llegara un correo.</p>
                  <p className="resaltado">¡Muchas Gracias!</p>
                  <button  onClick={cerrarModal}>Cerrar</button>
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
