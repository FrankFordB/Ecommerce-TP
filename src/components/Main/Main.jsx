import { Link } from "react-router-dom";
import "./Main.css";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = () => {
  const [productos, setProductos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [error, setError] = useState();
  const { user } = useAuth();

  const fetchProductos = async () => {
    try {
      const productosRef = collection(db, "productos");
      const snapshot = await getDocs(productosRef);
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(docs);
    } catch (error) {
      setError("No hay productos");
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  return (
    <main>
      <section>
        <div className="MainHome">
          <div className="mainHomeOferta1">
            <h4>OFERTA LIMITADA 🔥</h4>
            <h3>COMPRA AL MEJOR PRECIO</h3>
            <p>
              Tralalero Tralala, descuento del 99% a tan solo $500.000 ¿te lo vas
              a perder?
            </p>
            <button className="botonOferta1">Comprar Ahora</button>
          </div>
        </div>
      </section>

      <section>
        <div className="MainProductos1" id="inviernoProductos">
            <div className="MainProductos1">
            <h2>LLEGA EL INVIERNO Y LOS PRECIOS SE CONGELAN</h2>

          {user && (
            <h3>
              Aquí verás los productos que están en oferta con un 20% o más de
              descuento
              <br />
              ⬇⬇
            </h3>
            
          )}
          </div>
          {productos.length === 0 && <h2>NO HAY PRODUCTOS</h2>}
          <div className="productoLista1">
         
            {productos.map((producto) => (
              <>
                {producto.descuento >= 20 && (
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
                )}
              </>
            ))}

            {modalAbierto && productoSeleccionado && (
              <div className="modalProducto1">
                <div className="modalProductoContenido1">
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

          <Link to="/productos">
            <button className="botonVerMas1">
              Ver Más <br /> ⬇
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Main;