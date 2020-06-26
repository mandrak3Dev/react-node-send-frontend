import React, { useReducer } from "react";
import authContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTRO_EXITOSO,
  REGISTRO_ERROR,
  LIMPIAR_ALERTA,
  USUARIOAUTENTICADO,
} from "../../types/index";
import clienteAxios from "../../config/axios";

const AuthState = ({ children }) => {
  // State inicial
  const initialState = {
    token: "",
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
      console.log(respuesta);
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
  // Usuario autenticado
  const usuarioAutenticado = (nombre) => {
    dispatch({
      type: USUARIOAUTENTICADO,
      payload: nombre,
    });
  };

  return (
    <authContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        registrarUsuario,
        usuarioAutenticado,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthState;
