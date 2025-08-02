import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLoginFormLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    setErrorMessage(""); 

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v0.1/guest/login", loginData);

      const token = response.data.payload.token;
      const userId = response.data.payload.id;
      const username = response.data.payload.username;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);

      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Error during login. Please check your inputs.";
      console.error(message, error);
      setErrorMessage(message);
    }
  }, [email, password, navigate]); 

  return {
    email, setEmail,
    password, setPassword,
    errorMessage,
    handleSubmit,
  };
};
