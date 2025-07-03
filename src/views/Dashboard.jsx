import Layout from "../components/Layout/Layout";
import { use, useState } from "react";
import "../style/Dashboard.css";

const Dashboard = () => {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [id, setId] = useState(Number(21));
  const [error, setError] = useState("");


  const handleNombre = (e) => {
    setNombre(e.target.value);
  }
  const handleprecio = (e) => {
    setPrecio (Number(e.target.value));
  }
  const handleDescripcion = (e) => {
    setDescripcion(e.target.value);
  }
const handleId = (e) => {
  setId (e.target.value);
}

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !precio || !descripcion) {
      setError("Debe completar todos los campos");
      return;
    }
    const nuevoProducto = {nombre, precio, id, descripcion}
console.log ("Nombre del producto: "+ nuevoProducto);
    const sumaid = () => {
  setId(Number(id) + 1);
};
    setId (sumaid);
    setNombre ("");
    setPrecio ("");
    setDescripcion ("");
    setError("")
}
 
  return (
    <Layout>
      <section className="Dashboard-section">
        <form onSubmit={handleSubmit} className="Dashboard-form-section">
          <h2>Panel de Administrador</h2>
          <label htmlFor="id">Id</label>
          <input readOnly
            type="number"
              name="id"
              id="id"
              onChange={handleId}
              value={id }
              placeholder="{id}"
          />
          <label htmlFor="nombre">Nombre del Producto</label>
          <input
            type="text"
              name="nombre"
              id="nombre"
              onChange={handleNombre}
              value={nombre}
              placeholder="Nombre del producto"
          />

          <label htmlFor="precio">Precio</label>
          <input name="precio" 
          placeholder="$2000" 
          id="precio" 
          type="number"
          onChange={handleprecio}
          value={precio} />

          <label htmlFor="precio">Descripcion</label>
          <input
            name="precio"
            placeholder="Hecho de cuero sintetico"
            id="precio"
            type="text"
            onChange={handleDescripcion}
            value={descripcion}
          />
{error && <p style={{color: "red", fontSize: "20px"}}>  {error}</p>}
          <button type="submit" >Agregar Producto</button>
         
        </form>
      </section>
    </Layout>
  );
};

export default Dashboard;
