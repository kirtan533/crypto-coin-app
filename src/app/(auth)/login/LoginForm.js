"use client";

import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/services/auth";
import toast from "react-hot-toast";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get("from");

  const handleLogin = async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("Login successful 🎉");

      reset();
      router.replace(from || "/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDemoLogin = async () => {
    try {
      await login("demo@gmail.com", "123456");
      toast.success("Demo login successful 🚀");
      reset();
      router.replace(from || "/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-gray-900 p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4 text-white">Login</h2>

        {/* Email */}
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format",
            },
          })}
          placeholder="Email"
          className="w-full p-2 mb-3 border border-gray-600 bg-gray-700 rounded-lg text-white"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>
        )}

        {/* Password */}
        <input
          {...register("password", {
            required: "Password required",
            minLength: {
              value: 6,
              message: "Min 6 characters",
            },
          })}
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border border-gray-600 rounded-lg bg-gray-700 text-white"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        {/* Button */}
        <button
          disabled={isSubmitting}
          className="w-full bg-white text-black hover:opacity-80 transition cursor-pointer  py-2 rounded-lg  disabled:opacity-50"
          type="submit"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
        <p
          className="mt-3 text-sm text-center cursor-pointer text-blue-500"
          onClick={() => router.push("/signup")}
        >
          New user? Signup
        </p>
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full mt-3 border py-2 rounded-lg  transition font-medium text-white cursor-pointer hover:opacity-80"
        >
          Login as Demo User
        </button>
        <p className="text-[.8rem] text-gray-500 mt-2 text-center font-semibold">
          Use demo account for quick access
        </p>
      </form>
    </div>
  );
}
