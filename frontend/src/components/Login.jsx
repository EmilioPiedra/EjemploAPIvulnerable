import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../services/api";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRecuperarContrasena = (e) => {
    e.preventDefault();
    navigate("/recuperar-contrasena");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginAPI(usuario, password);
      login(data.token);
      // Obtener el rango del usuario
      const rango = data.user?._userInfo?.rango;
      // Redirigir según el rango
      if (rango === "admin") {
      navigate("/admin-dashboard");
      } else if (rango === "user") {
      navigate("/dashboard");
      } 
    } catch (err) {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form className="login-form-container" onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <p>Ingresa tus credenciales para acceder al sistema</p> 
      <input  
        type="text"
        placeholder="Usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>

      <a
        href="#"
        onClick={handleRecuperarContrasena}
        className="login-form-link"
      >
        ¿Olvidaste tu contraseña??
      </a>

      {error && <p className="login-form-error">{error}</p>}
    </form>
  );
};

export default Login;
