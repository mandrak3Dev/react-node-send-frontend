import React, { useReducer } from "react";
import appContext from "./appContext";
import appReducer from "./appReducer";
import {
  SUBIR_ARCHIVO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  MOSTRAR_ALERTA,
  LIMPIAR_ALERTA,
} from "../../types/index";
import clienteAxios from "../../config/axios";

const AppState = ({ children }) => {
  // State inicial
  const initialState = {
    mensaje_archivo: "",
    nombre: "",
    nombre_original: "",
    cargando: false,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };
  // Definir el reducer
  const [state, dispatch] = useReducer(appReducer, initialState);
  // Muestra alerta
  const mostrarAlerta = (msg) => {
    dispatch({
      type: MOSTRAR_ALERTA,
      payload: msg,
    });

    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
      });
    }, 3000);
  };
  // Subir archivos al servidor
  const subirArchivos = async (formData, nombreArchivo) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });
    try {
      const resultado = await clienteAxios.post("/api/archivos", formData);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: resultado.data.archivo,
          nombre_original: nombreArchivo,
        },
      });
    } catch (error) {
      dispatch({
        type: SUBIR_ARCHIVO_ERROR,
        payload: error.response.data.msg,
      });
    }
    const resultado = await clienteAxios.post("/api/archivos", formData);
  };
  // Crear enlace
  const crearEnlace = async () => {
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };
    try {
      const resultado = await clienteAxios.post("/api/enlaces", data);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: resultado.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <appContext.Provider
      value={{
        mensaje_archivo: state.mensaje_archivo,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivos,
        crearEnlace,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppState;
