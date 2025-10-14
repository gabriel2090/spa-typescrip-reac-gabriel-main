import { style } from "../../styles/Style";

interface botonProps {
    fondo: number;
    contenido: string;
}
/**
 * 
 * @file boton.tsx
 * @description Componente de botón reutilizable con diferentes estilos de fondo.
 * @param {botonProps} props - Propiedades del componente.
 * @param {number} props.fondo - Índice para seleccionar el estilo de fondo (0, 1, 2).
 * @param {string} props.contenido - Texto que se mostrará dentro del botón.
 * @return {JSX.Element} Componente de botón estilizado.
 * @example
 *  <boton contenido="Click Me" fondo={0} />
 */

const Boton = ({ contenido, fondo }: botonProps) => {
    const fondos = [style.boton.fondo1, style.boton.fondo2, style.boton.fondo3];
    const fondoseleccionado = fondos[fondo];
    return (
        <button className={fondoseleccionado}>
            {contenido}
        </button>
    ); 
}

export default Boton;