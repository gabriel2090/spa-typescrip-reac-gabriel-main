import navbar from "../../component/nav/navbar";
import { style } from '../../styles/Style';
import Header from "../../component/header/header";
import Section from "../../component/section/Section";
import Footer from "../../component/FOOTER/footer";
const home = () => {
    return (
        <main className={style.home.main}>
            <nav>{navbar()}</nav>
            <header>{Header()}</header>
            <section>{Section()}</section>
            <footer>{Footer()}</footer>
        </main>
    );
}

export default home;