import React, { useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import { useRouter } from "next/router";

const Header = () => {
  // Routing
  const router = useRouter();
  // Definir Context
  const AuthContext = useContext(authContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;
  const AppContext = useContext(appContext);
  const { limpiarState } = AppContext;
  // Extraer usuario autenticado del storage
  useEffect(() => {
    usuarioAutenticado();
  }, []);

  const redirect = () => {
    router.push("/");
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <img
        className="w-64 mb-8 md:mb-0 cursor-pointer"
        src="/logo.svg"
        alt=""
        onClick={() => redirect()}
      />
      <div>
        {usuario ? (
          <div className="flex items-center">
            <p className="mr-2">Hola {usuario.nombre}</p>
            <button
              onClick={() => cerrarSesion()}
              className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
              type="button"
            >
              Cerrar Sesion
            </button>
          </div>
        ) : (
          <>
            <Link href="/login">
              <a className="bg-red-500 px-5 py-3 mr-2 rounded-lg text-white font-bold uppercase">
                Iniciar Sesion
              </a>
            </Link>
            <Link href="/crearcuenta">
              <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">
                Crear Cuenta
              </a>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
