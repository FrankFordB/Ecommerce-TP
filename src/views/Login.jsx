import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import "../style/Login.css";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handleContrasena = (e) => setContrasena(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !contrasena) {
      setError("Debes completar todos los campos.");
      return;
    }

    try {
      await login(email, contrasena);
      setMessage("Logueado con éxito.");
      setTimeout(() => setMessage("Redirigiendo al home..."), 1000);
      setTimeout(() => navigate("/"), 2000);
      setEmail('');
      setContrasena('');
    } catch (error) {
      setError("Tu contraseña o email son incorrectos.");
    }
  };

  return (
    <Layout>
      <section className="login-section">
        <form onSubmit={handleSubmit} className="login-form-section">
          <h2>Iniciar Sesión</h2>

          <label htmlFor="email">E-Mail</label>
          <input
            name="email"
            onChange={handleEmail}
            value={email}
            id="email"
            placeholder="Pepito@hotmail.com"
            type="email"
          />

          <label htmlFor="password">Contraseña</label>
          <input
            name="password"
            onChange={handleContrasena}
            value={contrasena}
            placeholder="****************"
            id="password"
            type="password"
          />

          <p style={{ color: "green", fontSize: "16px" }}>{message}</p>
          <p style={{ color: "red", fontSize: "16px" }}>{error}</p>

          <button type="submit">Iniciar Sesión</button>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
