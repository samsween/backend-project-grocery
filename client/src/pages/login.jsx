import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authService } from "../utils/services";
import { useAuth } from "../providers/authProvider";

export const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useAuth();
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    authService.login(loginData).then((data) => {
      console.log(data.success);
      if (data.error) {
        setError(data.error.message);
      } else if (data.success) {
        user.setUser(data.user);
        navigate("/admin/products", { replace: true });
      }
    });
  };

  if (user.user) return <Navigate to="/admin/products" />;
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-300">
      {/* Glassy style */}
      <form
        onSubmit={handleSubmit}
        className="w-1/2 space-y-10 border-b border-l p-24 bg-white bg-opacity-30"
      >
        <h1 className="text-3xl font-bold text-indigo-500 border-b border-indigo-500 w-fit">
          Login
        </h1>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full p-2 border-b  bg-transparent placeholder:text-black"
        />
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border-b  bg-transparent placeholder:text-black"
        />
        <p className="text-sm text-red-500">{error}</p>
        <div className="space-y-16">
          <button
            type="submit"
            className="w-full p-2 bg-indigo-500 text-white rounded"
          >
            Login
          </button>
          <Link to="/register" className="text-indigo-500 text-center">
            Don't have an account? Apply here.
          </Link>
        </div>
      </form>
    </div>
  );
};
