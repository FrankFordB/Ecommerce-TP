import { Link } from "react-router-dom";
import "./Main.css";
import { useState } from "react";
const productos = [
  {
    nombre: "Campera Deportiva Hombre",
    precio: 24999,
    puntuacion: "★★★★✰",
    precio_final: 20000,
    descuento: "20% OFF",
    descripcion:
      "Campera impermeable con cierre y capucha desmontable, ideal para el invierno.",
    imagen: "src/Img/Productos/Producto1.jpg",
  },
  {
    nombre: "Zapatillas Running Mujer",
    precio: 18999,
    puntuacion: "★★★★★",
    precio_final: 13299,
    descuento: "30% OFF",
    descripcion:
      "Zapatillas livianas con suela de gel, perfectas para correr largas distancias.",
    imagen: "src/Img/Productos/Producto2.webp",
  },
  {
    nombre: "Smartphone X10 Pro",
    precio: 215000,
    puntuacion: "★★★★✰",
    precio_final: 193500,
    descuento: "10% OFF",
    descripcion:
      "Celular con pantalla AMOLED de 6.7 pulgadas, 128GB y cámara triple de 50MP.",
    imagen: "src/Img/Productos/Producto3.jfif",
  },
  {
    nombre: "Notebook Bangho Gamer",
    precio: 520000,
    puntuacion: "★★★★★",
    precio_final: 442000,
    descuento: "15% OFF",
    descripcion:
      "Notebook con procesador Intel core 7, placa RTX 4060 y SSD de 1TB.",
    imagen: "src/Img/Productos/Producto4.jpg",
  },
  {
    nombre: "Auriculares Bluetooth Pro",
    precio: 35999,
    puntuacion: "★★★★✰",
    precio_final: 27000,
    descuento: "25% OFF",
    descripcion:
      "Auriculares inalámbricos con cancelación de ruido y hasta 40 horas de batería.",
    imagen: "src/Img/Productos/Producto5.jpg",
  },
  {
    nombre: "Remera Oversize Estampada",
    precio: 7999,
    puntuacion: "★★★✰✰",
    precio_final: 4799,
    descuento: "40% OFF",
    descripcion:
      "Remera de algodón con diseño artístico, disponible en varios colores.",
    imagen: "src/Img/Productos/Producto6.webp",
  },
  {
    nombre: "Mochila Antirrobo USB",
    precio: 14999,
    puntuacion: "★★★★✰",
    precio_final: 9749,
    descuento: "35% OFF",
    descripcion:
      "Mochila resistente al agua con puerto USB incorporado y bolsillos ocultos.",
    imagen: "src/Img/Productos/Producto7.webp",
  },
  {
    nombre: "Smartwatch FitLife",
    precio: 23999,
    puntuacion: "★★★★✰",
    precio_final: 19200,
    descuento: "20% OFF",
    descripcion:
      "Reloj inteligente con monitoreo de salud, GPS y resistencia al agua.",
    imagen: "src/Img/Productos/Producto8.jpg",
  },
  {
    nombre: "Pantalón Jogger Hombre",
    precio: 11250.0,
    puntuacion: "★★★✰✰",
    precio_final: 5625,
    descuento: "50% OFF",
    descripcion:
      "Pantalón jogger de algodón con bolsillos laterales y ajuste elástico.",
    imagen: "src/Img/Productos/Producto9.jpg",
  },
  {
    nombre: "Lámpara LED Escritorio",
    precio: 6999.0,
    puntuacion: "★★★★✰",
    precio_final: 4899,
    descuento: "30% OFF",
    descripcion:
      "Lámpara con brazo flexible, luz regulable y puerto de carga USB.",
    imagen: "src/Img/Productos/Producto10.jpg",
  },
];

const Main = () => {
  const focusInviernoProducto = () => {
  document
    .getElementById("inviernoProductos")
    .scrollIntoView({ behavior: "smooth" });
};
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
    <main>
      <section>
        <div className="MainHome">
          <div className="MainHomeTitulo">
            <h1>Los mejores precios del mercado</h1>
          </div>
          <div className="mainHomeOferta">
            <h4> OFERTA LIMITADA 🔥 </h4>
            <h2>COMPRA AL MEJOR PRECIO</h2>
            <p>
              Tralalero Tralala, descuento del 99% a tan solo $500.000 ¿te lo
              vas a perder?
            </p>
            <button>Comprar Ahora</button>
          </div>
        </div>
      </section>

      <section>
        <div className="MainProductos">
          <h2>LLEGA EL INVIERNO Y LOS PRECIOS SE CONGELAN </h2>
          <div className="productoLista">
            {productos.map((producto, index) => (
  <label
    className="modalProducto"
    key={index}
    onClick={() => abrirModal(producto)}
    style={{ cursor: "pointer" }}
  >
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
          </div>{" "}
          <Link to="/productos" onClick={focusInviernoProducto}>
            {" "}
            <button className="botonVerMas">
              {" "}
              Ver Más <br></br> ⬇
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Main;
