import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice ";
import { useNavigate } from "react-router-dom";

import Button from "../../components/Button";
import Input from "../../components/Input";
import ErrorTag from "../../components/ErrorTag";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(login({ username, password }));
    if (result.type === "auth/login/fulfilled") {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#131313] flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-8 rounded-xl w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-white mb-10">Admin Login</h1>

        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="filled"
          text={status === "loading" ? "Logging in..." : "Login"}
          submit
          fullWidth
          disabled={status === "loading"}
        />
        <ErrorTag type="small" severity="error" error={error} />
      </form>
    </div>
  );
};
export default Login;
