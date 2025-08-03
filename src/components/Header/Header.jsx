import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [modalOpciones, setModalOpciones] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);

  const handleLogOut = () => {
    logout();
    navigate("/");
    setModalLogout(false);
  };

  const handleCerrarModal = (e) => {
    if (e.target.classList.contains("modalOpcionesMaster")) {
      setModalOpciones(false);
    }
  };

  const handleModalLogout = () => {
    setModalLogout(true);
  };

  const handleModalOpciones = () => {
    setModalOpciones(!modalOpciones);
  };

  return (
    <header>
      <nav>
        <div>
          <div>
            <NavLink to="/">
              <img
                className="imagenLogo"
                src="../src/Img/logo/Sin título4.png"
                alt="mercado pulgas"
              />
            </NavLink>
          </div>
        </div>
        <div className="navNuevo">
          {user ? (
            <>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <div>
                  <span>Home</span>
                </div>
              </NavLink>

              <NavLink
                to="/productos"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <div>
                  <span>Productos</span>
                </div>
              </NavLink>

              <NavLink
                to="/admin"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <div>
                  <span>Administrador</span>
                </div>
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <div>
                  <span>Home</span>
                </div>
              </NavLink>

              <NavLink
                to="/productos"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <div>
                  <span>Productos</span>
                </div>
              </NavLink>

              <NavLink
                to="/registro"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <div>
                  <span>Registrate</span>
                </div>
              </NavLink>

              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <div>
                  <span>Iniciar sesion</span>
                </div>
              </NavLink>
            </>
          )}
        </div>
        <div>
          <div className="modalOpcionesMaster">
            <button onClick={handleModalOpciones}>☰</button>
          </div>
          <div className="saludoP">
            {user && <p>Hola, {user.email.split("@")[0]}</p>}
          </div>
        </div>
      </nav>
      <div
        className={`modalOpciones ${modalOpciones ? "show" : "hide"}`}
        onClick={handleCerrarModal}
      >
        
          <div className="loginFotoMenu">
            {user ? (
              <>
                <div className="loginFotoMenuDiv1">
                  <div  style={{width:"20%", alignContent:"center",display:"flex", justifyContent:"center"}}>
                    
                    <img style={{color:"white", fontSize:"18px", textTransform:"capitalize"}} src="../src/Img/mercadopulga.jpg" alt="" />
                  </div>
                  <div style={{width:"55%"}}>
                    <p  style={{color:"black",fontWeight:"bold", fontSize:"18px", textTransform:"capitalize", width:"100%"}}>Hola, {user.email.split("@")[0]}</p>
                  </div>
                  <div style={{width:"25%", display:"flex", justifyContent:"center"}}>
                    <button className="botonesNav" style={{width:"55%"}} onClick={handleModalOpciones}> ☰</button>
                  </div>
                </div>

                <div className="loginFotoMenuDiv2">
                  
                  <button className="botonesNav" onClick={handleModalLogout}>
                    
                       <div> <i className="fa-solid fa-right-to-bracket"></i> <span> Salir</span></div>
                    
                  </button>
                  
                </div>
              </>
            ) : (
              <>
              
                <div  style={{display:"flex", justifyContent:"end", alignContent:"end",width:"80%"}}>
                    <button onClick={handleModalOpciones}> ☰</button>
                  </div>
                  
              </>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          ></div>
        
      </div>
      {modalLogout && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">¿Cerrar sesión?</h5>
                <button
                  type="button"
                  className="btn-close" onClick={() => setModalLogout(false)}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <p>¿Estás seguro que deseas cerrar sesión?</p>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary promo"
                  onClick={() => setModalLogout(false)}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="btnbtn-danger"
                  onClick={handleLogOut}
                  style={{ width: "15vh" }}
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
