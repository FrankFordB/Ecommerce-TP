import { Link } from "react-router"
import "./Header.css"
const Header = () => {
    return (
        <header>
            <nav>
                <div><Link  to="/"> <i className="fa-solid fa-crown icono-crown"></i></Link></div>
                <div ><h1>Mercado Pulgas</h1>
                <p>Tu mejór elección</p></div>
                <div>
            <ul>
                <li><Link title="Inicio"  to="/"> <i class="fa-solid fa-house-chimney"></i></Link></li>
                <li><Link title="Productos"  to="/productos"> <i class="fa-solid fa-money-bill"></i></Link></li>
                <li> <Link title="Admin"  to="/admin"><i class="fa-solid fa-user-tie"></i></Link> </li>
                <li> <Link title="Registrate"  to="/registro"><i class="fa-solid fa-registered"></i></Link> </li>
                <li> <Link title="Login"  to="/login"><i class="fa-solid fa-right-to-bracket"></i></Link> </li>
            </ul>
            </div>
            </nav>
        </header>
    )
}

export default Header 