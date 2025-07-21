import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/auth"); // If no token, go back to login
  }, []);

  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
      <p>You are logged in.</p>
    </div>
  );
}