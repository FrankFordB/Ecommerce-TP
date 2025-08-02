import { use, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../style/Register.css";
import { auth, db } from "../config/firebase"; // Importa Firestore
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore"; // Importa funciones de Firestore

const Register = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confContra, setConfContra] = useState("");
  const [error, setError] = useState("");
  const [menssage, setMenssage] = useState("");
  const { register } = useAuth();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const handleNombre = (e) => setNombre(e.target.value);
  const handleApellido = (e) => setApellido(e.target.value);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleContrasena = (e) => {
    setContrasena(e.target.value);
  };
  const handleConfContra = (e) => {
    setConfContra(e.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMenssage("");

    if (!nombre || !apellido || !email || !contrasena || !confContra) {
      setError("Debes completar todos los campos.");
      return;
    }

    if (contrasena !== confContra) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Registra al usuario con Firebase Authentication
      const userCredential = await register(email, contrasena);
      const user = userCredential.user;

      // Guarda los datos adicionales en Firestore
      await setDoc(doc(db, "users", user.uid), {
        nombre,
        apellido,
        email,
        createdAt: new Date(),
      });

      setMenssage("Registrado con éxito.");
      setTimeout(() => {
        setMenssage("Redirigiendo al home...");
      }, 1000);
      setTimeout(() => {
        navigate("/");
      }, 2500);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      setError("No pudimos registrar al usuario, inténtelo de nuevo.");
    }

    setNombre("");
    setApellido("");
    setEmail("");
    setContrasena("");
    setConfContra("");
  };

  return (
    <Layout>
      <section className="register-section">
        <form onSubmit={handleSubmit} className="register-form-section">
          <h2>Registrate</h2>
          <label htmlFor="nombre">Nombre</label>
          <input
            name="nombre"
            onChange={handleNombre}
            value={nombre}
            id="nombre"
            placeholder="Pepe"
            type="text"
          />

          <label htmlFor="apellido">Apellido</label>
          <input
            name="apellido"
            onChange={handleApellido}
            value={apellido}
            placeholder="Honguito"
            id="apellido"
            type="text"
          />
          <label htmlFor="email">E-Mail</label>
          <input
            name="email"
            onChange={handleEmail}
            value={email}
            id="email"
            placeholder="Pepito@hotmail.com"
            type="email"
          />

          <label htmlFor="pasword">Contrasena</label>
          <input
            name="password"
            onChange={handleContrasena}
            value={contrasena}
            placeholder="****************"
            id="password"
            type="password"
          />
          <label htmlFor="rePasword">Repita su Contrasena</label>
          <input
            name="rePassword"
            onChange={handleConfContra}
            value={confContra}
            placeholder="****************"
            id="rePassword"
            type="password"
          />
          <p style={{ color: "white" }}>{menssage}</p>
          <p style={{ color: "white", fontWeight: "600" }}>{error}</p>
          <button type="submit">Registrarse</button>
        </form>
      </section>
    </Layout>
  );
};

export default Register;