import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../Context/userContext";


export const useRegisterFormLogic = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useUser();


  const handleSubmit = useCallback(async () => {
    setErrorMessage(""); 
  
    const registrationData = {
      name: username,
      email: email,
      password: password,
      mobile: phoneNumber,
      role: 0 // normal user
    };
  
    try {
      const response = await axios.post("http://localhost:8000/api/register", registrationData);
  
      const token = response.data.payload.token;
      const userID = response.data.payload.id;
      const registeredUsername = response.data.payload.name;
  
      console.log("Registration successful!", response.data);
  
      if (!token) {
        throw new Error("No token returned from server.");
      }
  
      login({
        id: userID,
        username: registeredUsername,
        token: token,
        role: "user"
      });
  
      navigate("/Dashboard");
    } catch (error) {
      const message = error.response?.data?.message || "Error during registration. Please check your inputs.";
      console.error(message, error);
      setErrorMessage(message);
    }
  }, [email, password, username, phoneNumber, navigate, login]);

  return {
    email, setEmail,
    password, setPassword,
    username, setUsername,
    phoneNumber, setPhoneNumber, 
    errorMessage,
    handleSubmit
  };
};