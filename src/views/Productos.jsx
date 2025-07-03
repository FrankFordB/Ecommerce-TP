import { useState } from "react";
import Layout from "../components/Layout/Layout";
import "../style/Productos.css";

const Productos = () => {
  const productos = 
      [
  {
    "nombre": "Fjallraven Backpack, Laptops",
    "precio": 109950,
    "precio_final": 87960,
    "descuento": "20% OFF",
    "puntuacion": "★★★★✰",
    "descripcion": "Tu mochila perfecta para el uso diario y caminatas por el bosque. Guarda tu laptop (hasta 15 pulgadas).",
    "categoria": "ropa de hombre",
    "imagen": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
  },
  {
    "nombre": "Camiseta Slim Fit Premium para Hombre",
    "precio": 22300,
    "precio_final": 17840,
    "descuento": "20% OFF",
    "puntuacion": "★★★★✰",
    "descripcion": "Estilo ajustado, tela ligera y transpirable, ideal para uso casual o fanáticos del béisbol.",
    "categoria": "ropa de hombre",
    "imagen": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg"
  },
  {
    "nombre": "Chaqueta de Algodón para Hombre",
    "precio": 55990,
    "precio_final": 44790,
    "descuento": "20% OFF",
    "puntuacion": "★★★★★",
    "descripcion": "Perfecta para primavera, otoño e invierno. Ideal para trabajo, senderismo y viajes.",
    "categoria": "ropa de hombre",
    "imagen": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
  },
  {
    "nombre": "Camisa Slim Fit Casual para Hombre",
    "precio": 15990,
    "precio_final": 11990,
    "descuento": "25% OFF",
    "puntuacion": "★★✰✰✰",
    "descripcion": "El color puede variar ligeramente entre la pantalla y el producto real.",
    "categoria": "ropa de hombre",
    "imagen": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
  },
  {
    "nombre": "Pulsera John Hardy Dragón de Oro y Plata",
    "precio": 695000,
    "precio_final": 555600,
    "descuento": "20% OFF",
    "puntuacion": "★★★★✰",
    "descripcion": "Inspirada en el dragón mitológico Naga. Atrae amor o protección, según cómo se use.",
    "categoria": "joyería",
    "imagen": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
  },
  {
    "nombre": "Anillo de Oro Sólido Micropavé",
    "precio": 168000,
    "precio_final": 134400,
    "descuento": "20% OFF",
    "puntuacion": "★★★★✰",
    "descripcion": "Garantía de satisfacción. Devoluciones o cambios en 30 días. Diseñado en EE.UU.",
    "categoria": "joyería",
    "imagen": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg"
  },
  {
    "nombre": "Anillo de Oro Blanco",
    "precio": 9990,
    "precio_final": 7990,
    "descuento": "20% OFF",
    "puntuacion": "★★★✰✰",
    "descripcion": "Anillo clásico de compromiso, regalo para aniversarios, bodas o San Valentín.",
    "categoria": "joyería",
    "imagen": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg"
  },
  {
    "nombre": "Túneles Doble Acampanados Acero Inoxidable Oro Rosa",
    "precio": 10990,
    "precio_final": 8790,
    "descuento": "20% OFF",
    "puntuacion": "★★✰✰✰",
    "descripcion": "Pendientes tipo túnel de acero inoxidable 316L bañados en oro rosa.",
    "categoria": "joyería",
    "imagen": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg"
  },
  {
    "nombre": "Disco Duro Externo WD 2TB USB 3.0",
    "precio": 64000,
    "precio_final": 51200,
    "descuento": "20% OFF",
    "puntuacion": "★★★✰✰",
    "descripcion": "Compatible con USB 3.0 y 2.0, mejora el rendimiento del PC, NTFS para Windows.",
    "categoria": "electrónica",
    "imagen": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
  },
  {
    "nombre": "SanDisk SSD PLUS 1TB Interno SATA III",
    "precio": 109000,
    "precio_final": 87200,
    "descuento": "20% OFF",
    "puntuacion": "★★★✰✰",
    "descripcion": "Velocidades de lectura/escritura de hasta 535MB/s. Ideal para cargas de trabajo comunes.",
    "categoria": "electrónica",
    "imagen": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
  },
  {
    "nombre": "SSD Silicon Power 256GB A55 SLC",
    "precio": 109000,
    "precio_final": 87200,
    "descuento": "20% OFF",
    "puntuacion": "★★★★★",
    "descripcion": "SSD delgado con tecnología SLC Cache para alto rendimiento y durabilidad.",
    "categoria": "electrónica",
    "imagen": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg"
  },
  {
    "nombre": "Disco Duro 4TB Gaming para PS4 WD",
    "precio": 114000,
    "precio_final": 91200,
    "descuento": "20% OFF",
    "puntuacion": "★★★★★",
    "descripcion": "Aumenta tu experiencia de juego con diseño portátil y capacidad extendida.",
    "categoria": "electrónica",
    "imagen": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg"
  },
  {
    "nombre": "Monitor Acer 21.5\" IPS Full HD",
    "precio": 599000,
    "precio_final": 479200,
    "descuento": "20% OFF",
    "puntuacion": "★★★✰✰",
    "descripcion": "Pantalla IPS ultra delgada con tecnología Radeon FreeSync y ángulo de visión amplio.",
    "categoria": "electrónica",
    "imagen": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg"
  },
  {
    "nombre": "Monitor Gaming Curvo Samsung 49\" QLED",
    "precio": 999990,
    "precio_final": 799990,
    "descuento": "20% OFF",
    "puntuacion": "★★✰✰✰",
    "descripcion": "Pantalla ultra ancha 32:9 con 144Hz, HDR y tiempo de respuesta de 1ms.",
    "categoria": "electrónica",
    "imagen": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
  },
  {
    "nombre": "Chaqueta de Invierno 3-en-1 para Mujer",
    "precio": 56990,
    "precio_final": 45590,
    "descuento": "20% OFF",
    "puntuacion": "★★★✰✰",
    "descripcion": "Chaqueta con forro desmontable, capucha ajustable y múltiples bolsillos con cierre.",
    "categoria": "ropa de mujer",
    "imagen": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
  },
  {
    "nombre": "Chaqueta de Cuero Sintético con Capucha para Mujer",
    "precio": 29950,
    "precio_final": 23960,
    "descuento": "20% OFF",
    "puntuacion": "★★★✰✰",
    "descripcion": "Estilo biker con capucha desmontable, costuras decorativas y dos bolsillos frontales.",
    "categoria": "ropa de mujer",
    "imagen": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg"
  },
  {
    "nombre": "Impermeable Cortaviento para Mujer",
    "precio": 39990,
    "precio_final": 31990,
    "descuento": "20% OFF",
    "puntuacion": "★★★★✰",
    "descripcion": "Chaqueta ligera con capucha ajustable y bolsillos laterales, ideal para viajes.",
    "categoria": "ropa de mujer",
    "imagen": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg"
  },
  {
    "nombre": "Blusa de Cuello Barco Manga Corta para Mujer",
    "precio": 9850,
    "precio_final": 7880,
    "descuento": "20% OFF",
    "puntuacion": "★★★★★",
    "descripcion": "Tela elástica y ligera, con costuras dobles y diseño cómodo.",
    "categoria": "ropa de mujer",
    "imagen": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg"
  },
  {
    "nombre": "Camiseta Deportiva de Manga Corta para Mujer",
    "precio": 7950,
    "precio_final": 6360,
    "descuento": "20% OFF",
    "puntuacion": "★★★★✰",
    "descripcion": "Tejido que absorbe la humedad, ajuste cómodo y diseño femenino.",
    "categoria": "ropa de mujer",
    "imagen": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg"
  },
  {
    "nombre": "Camiseta Casual de Algodón para Mujer",
    "precio": 12990,
    "precio_final": 10390,
    "descuento": "20% OFF",
    "puntuacion": "★★★✰✰",
    "descripcion": "Camiseta de algodón con cuello en V, ideal para uso diario o de oficina.",
    "categoria": "ropa de mujer",
    "imagen": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg"
  }
]
const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };



  return (
     <Layout>
      <section>
        <div className="MainProductos">
          <h2 id="inviernoProductos">LLEGA EL INVIERNO Y LOS PRECIOS SE CONGELAN </h2>
          <div className="productoLista">
            {productos.map((producto, index) => (
              <label className="modalProducto" key={index}>
                <div className="productosMaster">
                  <div>
                    <img
                      className="productoImagen"
                      src={producto.imagen}
                      alt={producto.nombre}
                    />
                    <div className="productosBoton">
                      <button
                        onClick={() => abrirModal(producto)}
                        className="productosBotonComprar"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                  <div className="productoInfo">
                    <h3>{producto.nombre}</h3>
                    <h3>{producto.puntuacion}</h3>
                    <p>{producto.descripcion}</p>
                    <div className="precioMaster">
                      <div className="precioDescuento">
                        <p
                          style={{
                            fontSize: "20px",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          {producto.descuento}
                        </p>
                      </div>
                      <div>
                        <h4 className="precioAntes">
                          Antes ${producto.precio}
                        </h4>
                        <h4 className="precioDespues">
                          Ahora ${producto.precio_final}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </label>
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
