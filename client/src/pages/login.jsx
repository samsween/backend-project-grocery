import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../utils/services";




export const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await authService.login(loginData);
    if (user.error) {
      alert(user.error.message);
    } else {
      navigate("/admin/products");
    }
  };


  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-300">
      {/* Glassy style */}
      <form onSubmit={handleSubmit} className="w-1/2 space-y-10 border-b border-l p-24 bg-white bg-opacity-30">
        <h1 className="text-3xl font-bold text-indigo-500 border-b border-indigo-500 w-fit">Login</h1>
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
  )
};
