import { Link } from "react-router-dom";
import "./Main.css";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
  const [productos, setProductos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [error, setError] = useState();
  const {user} = useAuth()

  const fetchProductos = async () => {
    try {
      const productosRef = collection(db, "productos");
      const snapshot = await getDocs(productosRef);
      const docs = snapshot.docs.map((doc) => ({id: doc.id,...doc.data(),
      }));
      setProductos(docs);
    } catch (error) {
      setError("No hay productos")
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
        
          
          </div>

      </section>
<div className="mainHomeOferta">
            <h4> OFERTA LIMITADA 🔥 </h4>
            <h2>COMPRA AL MEJOR PRECIO</h2>
            <p>
              Tralalero Tralala, descuento del 99% a tan solo $500.000 ¿te lo vas a perder?
            </p>
            <button>Comprar Ahora</button>
          </div>
      <section>
        <div className="MainProductos" id="inviernoProductos">
          <h2>LLEGA EL INVIERNO Y LOS PRECIOS SE CONGELAN</h2>

          {user && <h3> Aqui veras los productos que estan en oferta con un 20% o mas de descuento<br />
                        ⬇⬇</h3>}
          {productos.length === 0 && <h2> NO HAY PRODUCTOS</h2>}
          <div className="productoLista">
            {productos.map((producto) => ( <>
              {producto.descuento >= 20 && <>
              <label
                className="modalProducto"
                key={producto.id}
                onClick={() => abrirModal(producto)}
                style={{ cursor: "pointer" }}
              >
                <div className="productosMaster">
                  <div>
                    <img
                      className="productoImagen"
                      src={producto.imagenURL || "https://static.vecteezy.com/system/resources/previews/001/631/580/non_2x/add-photo-icon-with-camera-vector.jpg"}
                      alt={producto.nombre}
                    />
                    
                  </div>
                <div className="descripcionDelProductoBlock"> 
                  
                    <h3>{producto.nombre}</h3>
                      
                    
                    <p style={{
                          fontSize: "16px",
                          color: "black",
                          textAlign: "center"
                        }}>{producto.descripcion}</p></div>
                    <div className="precioMaster">
                     {Number(producto.descuento) !== 0 && <> <div className="precioDescuento">
                        <p style={{
                          fontSize: "20px",
                          color: "white",
                          textAlign: "center"
                        }}>
                          {`${producto.descuento}% OFF`}
</p>
                      </div></>}
                      
                      <div>
                        {Number(producto.descuento) !== 0 && <>
                        <h4 className="precioAntes">
                          Antes ${producto.price?.toLocaleString("es-AR") || "N/A"}
                        </h4></>}
                        <h4 className="precioDespues">
                          {Number(producto.descuento) !== 0 && <><h4>Ahora</h4></>} ${ (parseInt(producto.price) - ((parseInt(producto.descuento) * parseInt( producto.price))/ 100))?.toLocaleString("es-AR")  } 
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
                
              </label></>}</>
            ))}
            

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

          <Link to="/productos">
            <button className="botonVerMas">
              Ver Más <br /> ⬇
            </button>
          </Link>
          
        </div>
      </section>
    </main>
  );
};

export default Main;
