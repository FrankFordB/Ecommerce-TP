import { useState } from "react";
import Layout from "../components/Layout/Layout";
import "../style/Login.css";
const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error , setError] = useState();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleSubit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Debes llenar todos los campos")
      return;};
const usuarioKey = {password, email}
    console.log ("Su usuario es: " + usuarioKey);

      setEmail("");
      setPassword("");
      setError("");
      }
  return (
    <Layout>
      <section className="login-section">
        <form onSubmit={handleSubit} className="login-form-section">
          <h2>Iniciar Sesión</h2>
          <label htmlFor="email">E-Mail</label>
          <input
            name="email"
            id="email"
            onChange={handleEmail}
            value={email}
            placeholder="Pepito@hotmail.com"
            type="email"
          />

          <label htmlFor="pasword">Contrasena</label>
          <input
            name="password"
            onChange={handlePassword}
            value={password}
            placeholder="****************"
            id="password"
            type="password"
          /> <p style={{color: "red", fontSize: "20px"}}>{error } </p>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
