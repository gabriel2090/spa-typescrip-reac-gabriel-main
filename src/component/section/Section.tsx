import logo from '../../assets/Petro-Joven-1.jpg';
import { style } from '../../styles/Style';
const Section = () => {
    return (
        <nav className={style.section.nav}>
            <div className={style.section.div}>
                <h1 className={style.section.h1}>QUIEN ES PETRO</h1>
                <h2 className={style.section.h2}>Gustavo Francisco Petro Urrego </h2>
                <p className={style.section.p}>
                    <p>
                        Desde temprana edad, vivió en Zipaquirá (Cundinamarca), donde fue
                        personero y después concejal.[6] En su juventud militó en el
                        Movimiento 19 de Abril (M-19), una guerrilla urbana partícipe del
                        conflicto armado interno de Colombia entre 1974 y 1990 bajo el alias
                        de Aureliano,[7][8][8] la cual, tras su desmovilización en 1990,
                        se transformó en la Alianza Democrática M-19, la segunda fuerza
                        política más importante en la Asamblea Constituyente de 1991. Bajo
                        sus siglas, fue electo para ser miembro de la Cámara de
                        Representantes en las elecciones legislativas de 1991.[9] Fue
                        senador de la república por el Polo Democrático Alternativo (PDA),
                        cargo al que accedió en las elecciones legislativas de 2006.[10][11]
                        En el 2009, renunció a su cargo para aspirar a la presidencia de
                        Colombia, en las elecciones presidenciales de 2010, en
                        representación del mismo partido. Tras su salida del Polo
                        Democrático, fundó el Movimiento Progresistas (posteriormente
                        Colombia Humana) con el que llegó a la alcaldía de Bogotá para el
                        periodo 2012 a 2015.[12] En 2020, la Corte IDH emitió un fallo en
                        contra del Estado colombiano por haber destituido de su alcaldía en
                        Bogotá a través de decisión de la Procuraduría General de la Nación
                        [13] en el 2013.[14] En 2018 fue candidato para la presidencia de
                        Colombia por segunda vez: en dichas elecciones ocupó el segundo
                        lugar, permitiéndole ser senador, gracias a la ley de estatuto de
                        oposición, que otorga un escaño a la segunda votación presidencial
                        más alta.[15] En 2021 fue uno de los fundadores de la coalición
                        Pacto Histórico, compuesta por diversos partidos y movimientos
                        sociales. En la consulta interpartidista por el Pacto Histórico
                        celebrada en marzo de 2022, fue electo como el candidato
                        presidencial de la coalición. En las elecciones presidenciales de
                        2022, obtuvo la mayor votación con más de ocho millones y medio de
                        votos y el 40 % total de la votación, dándole el derecho de pasar a
                        la segunda vuelta electoral.[16] Gustavo Petro triunfó en segunda
                        vuelta electoral con más de once millones de votos y el 50.44 % de
                        la votación, frente al 47.31 % de su rival Rodolfo Hernández Suárez.
                        Petro también se convirtió en el candidato presidencial con mayor
                        número de votos obtenidos en la historia de Colombia,[17] y varios
                        analistas políticos lo consideran como el primer presidente de
                        izquierda del país.[18]
                    </p>
                </p>
                <img src={logo} alt="logo" className={style.section.img} />
            </div>
        </nav>
    );
};

export default Section;
