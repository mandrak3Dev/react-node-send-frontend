import React, { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import authContext from "../context/auth/authContext";

const Index = () => {
  // Definir Context
  const AuthContext = useContext(authContext);
  const { usuarioAutenticado } = AuthContext;
  // Extraer usuario autenticado del storage
  useEffect(() => {
    usuarioAutenticado();
  }, []);
  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  );
};

export default Index;
