import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-bold text-center">Register</h2>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="username"
          >
            Username
          </label>
          <input
            {...register("username", { required: "Username is required" })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            id="username"
            type="text"
            placeholder="Enter username"
          />
          {errors.username && (
            <p className="mt-1 text-xs text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            className="block mb-2 text-sm font-bold text-gray-700"
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
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            id="password"
            type="password"
            placeholder="Enter password"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 text-white transition duration-300 bg-teal-600 rounded-lg hover:bg-teal-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
