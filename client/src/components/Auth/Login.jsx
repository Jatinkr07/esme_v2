import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center py-20 bg-gray-50">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg p-6 bg-white rounded-lg shadow-sm"
      >
        <h2 className="mb-6 text-2xl font-[500] font-narin text-center">
          Login
        </h2>

        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-[500] font-narin text-gray-700"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4F2EA]"
            id="email"
            type="email"
            placeholder="Enter email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block mb-2 text-sm font-[500] font-narin text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F4F2EA]"
            id="password"
            type="password"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
          <div className="mt-2 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-gray-950 font-narin hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 font-narin font-[500] tracking-wide py-2 text-black transition duration-300 border hover:text-[#F4F2EA] hover:bg-black border-[#F4F2EA] bg-[#F4F2EA] rounded-lg"
          >
            Submit
          </button>
        </div>
        <div className="mt-4 text-start font-narin">
          <p className="text-sm text-gray-600">
            Create your account?{" "}
            <Link
              to="/register"
              className="text-gray-950 font-[600] font-narin hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
