import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { RegisterInfo } from "../models/auth.model";
import { baseUrl, postRequest } from "../utils/services";
import { useAuth } from "../providers/auth.provider";

function Register() {
  const { setUser } = useAuth();

  const [value, setValue] = useState<RegisterInfo>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await postRequest(
      `${baseUrl}/users/register`,
      JSON.stringify(value)
    );
    if (res.status) {
      toast.success("register successfully");
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-2/5 p-3 mx-auto mt-4 space-y-3 bg-orange-100 rounded-md"
    >
      <h2>Register</h2>
      <input
        type="text"
        name="name"
        placeholder="name"
        onChange={handleChange}
      />
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
        Register
      </button>
    </form>
  );
}

export default Register;
