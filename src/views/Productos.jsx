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
          <div className="productoLista1">
         
            {productos.map((producto) => (
              <>
                
                  <div className="productoCardMaster">
                    <div
                      className="productoCard1"
                      key={producto.id}
                      onClick={() => abrirModal(producto)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="productoImagenContainer1">
                        <img
                          className="productoImagen1"
                          src={
                            producto.imagenURL ||
                            "https://static.vecteezy.com/system/resources/previews/001/631/580/non_2x/add-photo-icon-with-camera-vector.jpg"
                          }
                          alt={producto.nombre}
                        />
                      </div>
                      <div className="productoDescripcion1">
                        <h3>{producto.nombre}</h3>
                        <p style={{
                            borderBottom:"1px solid rgba(0, 0, 0, 0.17)",
                            width:"100%", textAlign:"center"
                          }}>{producto.sku}</p>
                        <p
                          
                        >
                          {producto.descripcion}
                        </p>
                      </div>
                      <div className="productoPrecio1">
                       

                        <div className="PrecioAntesDespuesMaster">
                          {Number(producto.descuento) !== 0 && (
                            <h4 className="precioAntes1">
                              Antes $
                              {producto.price?.toLocaleString("es-AR") || "N/A"}
                            </h4>
                          )}
                          <h4 className="precioDespues1">
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
                      
                      
                      <div className="productoBoton1">
                         {Number(producto.descuento) !== 0 && (
                          <div className="productoDescuento1">
                            <p
                              className="productoDescuentotag"
                            >
                              {`${producto.descuento}% OFF`}
                            </p>
                          </div>
                        )} <div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            abrirModal(producto);
                          }}
                          className="productoBotonComprar1"
                        >
                          Comprar
                        </button></div> 
                      </div>
                    
                    </div>
                    {user &&
                  <div className="botoneseditar1">
                    <Link className="botonEditar2" to={`/editar-producto/${producto.id}`}>Editar</Link>
                    <button className="botonEditar2" onClick={()=> handleDeleteProduct(producto.id)}>Eliminar</button>
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
