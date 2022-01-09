import React from "react-bootstrap";
import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";

function DesplegableRRHH() {
  const [dropdown, setDropdown] = useState(false);
  const abrirCerrarDropDown = () => {
    setDropdown(!dropdown);
  };

  /**
   * creamos un array con los items que queremos que aparezcan en el desplegable
   */

  const departamentoRRHH = [
    {
      nombre: "Gestión de empleados",
      url: "/empleados",
    },
    {
      nombre: "Lista empleados",
      url: "/empleados",
    },
    {
      nombre: "Calendario festivos",
      url: "/calendario",
    },
  ];
  /**
   * ejecutamos la función map sobre el array itemsDropdown
   *
   * la función map ejecuta una función por cada elemento del array y devuelve un nuevo array con el resultado de la función ejecutada por cada elemento
   * en la función que ejecutamos por cada elemento del array, le pasamos como parámetro el elemento del array y el índice del elemento
   * podemos realizar todas las operaciones que queramos dentro de la función del map.
   *
   * en este caso la función devuelve una etiqueta <DropdownItem> (que es un elemento JSX) con el texto del elemento del array
   *
   * el resultado final es un array con las etiquetas <DropdownItem> con los elementos que queremos mostrar
   */
  const itemsDropdownReact = departamentoRRHH.map(function (item, index) {
    return (
      <DropdownItem key={index}>
        <Link className="links" to={item.url}>
          {item.nombre}
        </Link>
      </DropdownItem>
    );
  });

  return (
    <div>
      <Dropdown isOpen={dropdown} toggle={abrirCerrarDropDown}>
        <DropdownToggle className="boton-toggle">
          Recursos humanos
        </DropdownToggle>
        {/* dentro del <DropDownMenu> indicamos que queremos pintar el array de elementos JSX que hemos creado anteriormente */}
        <DropdownMenu>{itemsDropdownReact}</DropdownMenu>
      </Dropdown>
    </div>
  );
}
export default DesplegableRRHH;
