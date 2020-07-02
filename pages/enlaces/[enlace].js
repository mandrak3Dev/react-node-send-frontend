import React, { useState, useContext } from "react";
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import appContext from "../../context/app/appContext";
import Alerta from "../../components/Alerta";

export async function getServerSideProps({ params }) {
  const { enlace } = params;
  const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
  
  return {
    props: {
      enlace: resultado.data,
    },
  };
}

export async function getServerSidePaths() {
  const enlaces = await clienteAxios("/api/enlaces");

  return {
    paths: enlaces.data.map((enlace) => ({
      params: { enlace: enlace.url },
    })),
    fallback: false,
  };
}

export default ({ enlace }) => {
  // Context app
  const AppContext = useContext(appContext);
  const { mostrarAlerta, mensaje_archivo } = AppContext;

  const [tienePassword, guardarTienePassword] = useState(enlace.password);
  const [password, guardarPassword] = useState("");

  const verificarPassword = async (e) => {
    e.preventDefault();
    const data = { password };
    try {
      const resultado = await clienteAxios.post(
        `/api/enlaces/${enlace.enlace}`,
        data
      );
      
      guardarTienePassword(resultado.data.password);
    } catch (error) {
      mostrarAlerta(error.response.data.msg);
    }
  };

  return (
    <Layout>
      {tienePassword ? (
        <>
          <p className="text-center mb-2">
            Este enlace esta protegido con un password, ingresalo a continuacion
          </p>
          {mensaje_archivo && <Alerta {...mensaje_archivo} />}
          <div className="flex justify-center mt-5">
            <div className="max-w-lg w-full">
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verificarPassword(e)}
              >
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => guardarPassword(e.target.value)}
                    id="password"
                    placeholder="Password"
                    type="password"
                    className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white font-bold uppercase"
                  value="Validar"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo:{" "}
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
              download
              className="bg-red-500 text-center px-10 py-3 rounded uppercase font-bold text-white cursor-pointer"
            >
              Aqui
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
