import { useState } from "react";
import { toast } from "react-toastify";
import { baseUrl, postRequest } from "../utils/services";
import { useAuth } from "../providers/auth.provider";

function Login() {
  const { setUser } = useAuth();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await postRequest(
      `${baseUrl}/users/login`,
      JSON.stringify(values)
    );
    if (!res.error) {
      toast.success("login successfully");
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-2/5 p-3 mx-auto mt-4 space-y-3 bg-orange-100 rounded-md"
    >
      <h2>Login</h2>
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
      />

      <button
        type="submit"
        className="px-4 py-2 font-semibold text-white bg-amber-700"
      >
        Login
      </button>
    </form>
  );
}

export default Login;
