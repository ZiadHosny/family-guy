"use client";
import React from "react";
import { authenticateUser, registerUser } from "./code";

const BiometricAuth: React.FC = () => {
  const handleRegister = async () => {
    // Call registerUser function
    await registerUser();
  };

  const handleLogin = async () => {
    // Call authenticateUser function
    await authenticateUser();
  };

  return (
    <div>
      <button className="w-6 text-blue-700 bg-red-500" onClick={handleRegister}>
        Register Biometric
      </button>
      <button onClick={handleLogin}>Login with Biometric</button>
    </div>
  );
};

export default BiometricAuth;
