import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useRegisterFormLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    setErrorMessage(""); 

    const registrationData = {
      username: username,
      email: email,
      password: password,
      phoneNumber: phoneNumber, 
    };

    try {
      const response = await axios.post("http://localhost:8000/api/v0.1/guest/register", registrationData);

      const token = response.data.payload.token;
      const userID = response.data.payload.id;
      const registeredUsername = response.data.payload.username; 

      console.log("Registration successful!", response.data);

      if (!token) {
        throw new Error("No token returned from server.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userID);
      localStorage.setItem("username", registeredUsername); 

      navigate("/Dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Error during registration. Please check your inputs.";
      console.error(message, error);
      setErrorMessage(message);
    }
  }, [email, password, username, phoneNumber, navigate]); 

  return {
    email, setEmail,
    password, setPassword,
    username, setUsername,
    phoneNumber, setPhoneNumber, 
    errorMessage,
    handleSubmit
  };
};