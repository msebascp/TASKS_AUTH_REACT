import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth();
  const onSubmit = handleSubmit(async (values) => {
    signUp(values);
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  return (
    <div className="h-[calc(100vh-70px)] flex items-center">
      <div className="bg-zinc-800 max-w-lg p-10 rounded-md mx-auto flex flex-col gap-y-3 h-fit">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white rounded-md" key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} className="flex flex-col gap-y-3">
          <label htmlFor="username">
            Username
            <input
              type="text"
              id="username"
              {...register("username", { required: true })}
              autoComplete="username"
              className="w-full bg-zinc-700 text-white py-1 px-2 rounded-md"
            />
            {errors.username && (
              <p className="text-red-500">Username is required</p>
            )}
          </label>
          <label htmlFor="email">
            Email
            <input
              type="email"
              id="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-700 text-white py-1 px-2 rounded-md"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              id="password"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full bg-zinc-700 text-white py-1 px-2 rounded-md"
            />
            {errors.password && errors.password.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters
              </p>
            )}
          </label>
          <button
            type="submit"
            className="bg-sky-600 w-fit px-3 py-1 rounded-md self-center"
          >
            Register
          </button>
        </form>
        <p>
          Already have an account?
          <Link to="/login" className="underline text-sky-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
