import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/userContext"; // ✅ Add this

export const useLoginFormLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useUser(); // ✅ Access login() from context

  const handleSubmit = useCallback(async () => {
    setErrorMessage("");

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/login", loginData);

      const token = response.data.payload.token;
      const userId = response.data.payload.id;
      const username = response.data.payload.username;

      if (!token) {
        throw new Error("No token returned from server.");
      }

      login({
        id: userId,
        username: username,
        token: token,
        role: "user", // adjust this if your API returns the role
      });

      navigate("/"); // ✅ Redirect after login
    } catch (error) {
      const message = error.response?.data?.message || "Error during login. Please check your inputs.";
      console.error(message, error);
      setErrorMessage(message);
    }
  }, [email, password, navigate, login]);

  return {
    email, setEmail,
    password, setPassword,
    errorMessage,
    handleSubmit,
  };
};