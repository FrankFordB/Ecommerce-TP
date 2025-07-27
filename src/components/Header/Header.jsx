import { Link, useNavigate } from "react-router-dom"
import "./Header.css"
import { useAuth } from "../../context/AuthContext"
import { auth } from "../../config/firebase"
import { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [modalOpciones, setModalOpciones] = useState(false)
    const [modalLogout, setModalLogout] = useState(false)
    
    const handleLogOut = () => {
        logout();
        navigate("/");
    };
const handleCerrarModal = (e) => {
    if (e.target.classList.contains("modalOpcionesMaster")) {
            setModalOpciones(false);
        }
}
 const handleModalLogout = () => {
        setModalLogout(true)
    
            
         return 
 }
const formatName = (name) => {
    return name.split('@')[0];
};

    const handleModalOpciones = () => {
        
         if (modalOpciones === false) {
            setModalOpciones(true)
            } else {setModalOpciones(false)}
         return 
    }
    return (
        <header>
            <nav>
                <div>
                    <div>
                    <Link to="/"> <img className="imagenLogo" src="src\Img\logo\Sin título45.png" alt="mercado pulgas" />
                    </Link>
                    </div>
                </div>
                <div>
                    
                </div>
                <div>
                <div className="modalOpcionesMaster">
                    
                    <button onClick={handleModalOpciones} >☰</button>
                 
                    <div  className={`modalOpciones ${modalOpciones ? "show" : "hide"}`} onClick={handleCerrarModal} >
                    <ul> 
                        <div className="loginFotoMenu">
                        {user ? (<>
                        <div style={{width: '20%', display:"flex", alignContent:"center", justifyContent:"center"}}>
                        <img src="src\Img\mercadopulga.jpg" alt="" />
                        </div>
                        <div style={{width: '30%', display:"flex", alignContent:"end", justifyContent:"end"}}><p>Hola, {formatName(user.email)}</p></div></>) : (<>
                        <div></div><div></div> </>) }
                        <div >
                         <button onClick={handleModalOpciones} > ☰</button> 
                         </div></div>

                         <div style={{display:"flex", flexDirection:"row"}}>
                        {user ? ( 
                            <>
                                <li> 
                                    <Link title="Inicio" to="/">
                                       <div> <i className="fa-solid fa-house-chimney"></i></div><span>Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link title="Productos" to="/productos">
                                       <div> <i className="fa-solid fa-money-bill"> </i></div><span> Productos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link title="Admin" to="/admin">
                                        <div> <i class='fas fa-clipboard-list'></i></div><span> Adminitrador</span>
                                    </Link>
                                </li>  
                                 <li>
                                <button className="botonesNav" onClick={handleModalLogout}>
                                   <div> <i className="fa-solid fa-right-to-bracket"></i>
                                    </div>  <span>Salir  </span></button></li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link  title="Inicio" to="/">
                                      <div>  <i className="fa-solid fa-house-chimney"></i></div><span>Home</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link title="Productos" to="/productos"><div>
                                       <i class='fas fa-store-alt-slash'></i></div><span> Productos</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link title="Registrate" to="/registro"><div>
                                        <i className="fa-solid fa-registered"></i></div><span>Registrate</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link title="Login" to="/login"> <div>
                                        <i className="fa-solid fa-right-to-bracket"></i></div><span> Logueate</span>
                                    </Link>
                                </li>
                            </>
                        )}</div>
                    </ul></div></div>
                    {user && <p>Hola, {formatName(user.email)}</p>}
                </div>
                <div className="modal" tabIndex="-1">
{modalLogout && (
    <div className="modal show" tabIndex="-1" style={{ display: "block" }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">¿Está seguro que desea salir?</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setModalLogout(false)}
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    <p>Confirme si desea cerrar sesión.</p>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => setModalLogout(false)}
                    >
                        No
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleLogOut}
                    >
                        Sí
                    </button>
                </div>
            </div>
        </div>
    </div>
)} </div>


            </nav>
        </header>
    );
};

export default Header;