// src/pages/AdminUpload.js
import React from "react";
import { uploadProducts } from "../../uploadProducts";

const AdminUpload = () => {
  const handleClick = () => {
    uploadProducts();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Cargar productos de prueba</h2>
      <button onClick={handleClick}>Subir productos a Firebase</button>
    </div>
  );
};

export default AdminUpload;
