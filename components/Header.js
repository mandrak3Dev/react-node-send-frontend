import React, { useContext, useEffect } from "react";
import Link from "next/link";
import authContext from "../context/auth/authContext";

const Header = () => {
  // Definir Context
  const AuthContext = useContext(authContext);
  const { usuario, usuarioAutenticado, cerrarSesion } = AuthContext;
  // Extraer usuario autenticado del storage
  useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between">
      <Link href="/">
        <img className="w-64 mb-8 md:mb-0" src="logo.svg" alt="" />
      </Link>
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
