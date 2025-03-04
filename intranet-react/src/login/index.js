import { useState } from "react";
import logo from "../assets/logocasino.png";
import "./index.css";
import { useMutation, useQueryClient } from "react-query";
import { login } from "./services";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ setAuthState }) {
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate } = useMutation(login, {
    onSuccess: ({ data }) => {
      setLoginError(false);
      setLoginErrorMessage("");
      setAuthState(true);
      navigate("/directorio");
    },
    onError: ({ error }) => {
      setLoginError(true);
      setLoginErrorMessage(error.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries("create");
    },
  });

  function handleSubmit(evt) {
    /*
        Previene el comportamiento default de los
        formularios el cual recarga el sitio
      */
    evt.preventDefault();
    // Aquïż½ puedes usar values para enviar la informaciïż½n
    mutate(loginState);
  }
  function handleChange(evt) {
    /*
        evt.target es el elemento que ejecuto el evento
        name identifica el input y value describe el valor actual
      */
    const { target } = evt;
    const { name, value } = target;
    /*
        Este snippet:
        1. Clona el estado actual
        2. Reemplaza solo el valor del
           input que ejecutará el evento
      */
    const newLoginState = {
      ...loginState,
      [name]: value,
    };
    // Sincroniza el estado de nuevo
    setLoginState(newLoginState);
  }
  return (
    <Container fluid>
      <Row>
        <Col lg={10} className="columna-izquierda">
          <Row className="align-items-end h-35">
            <Col>
              <img
                className="logotipo-superior"
                src={logo}
                alt="logotipo"
              ></img>
            </Col>
            <Col className="d-flex justify-content-end r-padding-0 alinearLoginYFlecha">
              <Row>
                <p className="recuadro-marron-login ">Login</p>
              </Row>
            </Col>
          </Row>
          <Row className="align-items-center h-65">
            <p className="bienvenidos">Bienvenid@s</p>
          </Row>
        </Col>

        <Col lg={2} className="columna-derecha">
          <form onSubmit={handleSubmit}>
            <Row className="alinearLoginYFlecha">
              <Button type="submit" className="triangulo"></Button>
            </Row>

            <Row>
              <Col xs={12}>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <label className="estiloTextosCasillas" htmlFor="email">
                  Usuario
                </label>
              </Col>
              <Col xs={12}>
                <input
                  className="recuadros-textos"
                  id="email"
                  name="email"
                  type="email"
                  value={loginState.email}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <br />
                <br />

                <label className="estiloTextosCasillas" htmlFor="password">
                  Contrase�a
                </label>
              </Col>
              <Col xs={12}>
                <input
                  className="recuadros-textos"
                  id="password"
                  name="password"
                  type="password"
                  value={loginState.password}
                  onChange={handleChange}
                />
              </Col>
            </Row>
            {loginError ? (
              <div>
                <p className="login-error-msg">{loginErrorMessage}</p>
              </div>
            ) : null}
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
