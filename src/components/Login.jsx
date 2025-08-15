import React from "react";

export const Login = () => {
  const handleLogin = () => {
    window.open("http://localhost:3000/login", "_blank", "noopener,noreferrer");
  };

  return (
      <a onClick={handleLogin} href="#">Student-Corner</a>
  );
};
