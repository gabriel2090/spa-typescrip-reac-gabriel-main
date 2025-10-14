import { style } from "../../styles/Style";
const Footer = () => {
    return (<nav className={style.footer.nav}>
        <div className={style.footer.div}>
            <footer className={style.footer.footer}>
                <p className={style.footer.p}>
                    © 2025 | Sitio informativo sobre Gustavo Petro, presidente de la República de Colombia.
                    Esta página no representa una entidad oficial del gobierno colombiano. Toda la información tiene fines educativos y de divulgación pública.
                </p>
            </footer>
        </div>
    </nav>);
}

export default Footer;
