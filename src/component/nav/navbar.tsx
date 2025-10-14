import { Link } from 'react-router-dom';
import { style } from '../../styles/Style';
import Boton from '../BOTON/BOTON';
import logo from '../../assets/image 147.png'

const Navbar = () => {
    return (
        <nav className={style.navbar.nav}>
            <Link to="/"><img src={logo} alt="logo" className={style.navbar.logo} /></Link>

            <div className={style.navbar.links}>
                <Link to="/documentacion" className={style.navbar.linkItem}>Doc</Link>
                <Link to="/personajes" className={style.navbar.linkItem}>Personajes</Link>
                <Link to="/armas" className={style.navbar.linkItem}>Armas</Link>
                <Link to="/login-register/login">
                    <Boton contenido="login" fondo={0}/>
                </Link>
                <Link to="/login-register/register">
                    <Boton contenido="register" fondo={0}/>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
