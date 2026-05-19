import React from "react";
import logo from "../../assets/images/logo-biblioteca2.png";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#F5F0EA" }}>
      {/* Lado esquerdo — logo */}
      <div
        className="hidden md:flex w-1/2 flex-col items-center justify-center p-8"
        style={{ backgroundColor: "#EDE8E0" }}
      >
        <img
          src={logo}
          alt="biblioteca"
          className="w-full max-w-sm object-contain"
        />
      </div>

      {/* Lado direito — formulário */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
