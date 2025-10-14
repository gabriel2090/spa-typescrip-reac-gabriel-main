import { style } from "../../styles/Style";
import logo from '../../assets/Presidente_Gustavo_Petro_Urrego.jpg'

const Header = () => {
    return (
        <nav className={style.header.nav2}>
            <img src={logo} alt="" className={style.header.logo} />
            <div className={style.header.div}>
                <h1 className={style.header.h1}>
                    PAGINA SOBRE GUSTAVO PETRO
                </h1>
                <h2 className={style.header.h2}>
                    Presidente de colombia
                </h2>
            </div>
        </nav>
    );
}

export default Header;