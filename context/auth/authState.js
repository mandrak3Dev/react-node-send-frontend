import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LOGIN_EXITOSO,
  LOGIN_ERROR,
  LIMPIAR_ALERTA,
  USUARIOAUTENTICADO,
  CERRAR_SESION
} from "../../types/index";
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
  // State inicial
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    autenticado: null,
    usuario: null,
    mensaje: null,
  };
  // Definir el reducer
  const [state, dispatch] = useReducer(authReducer, initialState);
  // Registrar nuevos usuarios
  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("api/usuarios", datos);
      dispatch({
        type: REGISTRO_EXITOSO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      dispatch({
        type: REGISTRO_ERROR,
        payload: error.response.data.msg,
      });
    }
    // Limpia la alerta despues de 3 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };
  // Autenticar usuario
  const iniciarSesion = async (data) => {
    try {
      const respuesta = await clienteAxios.post("api/auth", data);
      dispatch({
        type: LOGIN_EXITOSO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
    // Limpia la alerta despues de 3 segundos
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };

  // Usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const respuesta = await clienteAxios("api/auth");
      dispatch({
        type: USUARIOAUTENTICADO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.response.data.msg,
      });
    }
  };
  // Cerrar sesion
  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION
    });
  }

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
