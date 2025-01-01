import { useState } from "react";
import { RegisterInfo } from "../models/auth.model";

function Register() {
  const [value, setValue] = useState<RegisterInfo>({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-2/5 bg-orange-100 mx-auto mt-4 p-3 rounded-md flex flex-col space-y-3"
    >
      <h2>Register</h2>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setValue({ ...value, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="email"
        onChange={(e) => setValue({ ...value, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setValue({ ...value, password: e.target.value })}
      />

      <button
        type="submit"
        className="bg-amber-700 text-white font-semibold py-2 px-4"
      >
        Register
      </button>
    </form>
  );
}

export default Register;
