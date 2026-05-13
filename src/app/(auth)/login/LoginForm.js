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

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm"
      >
        <h2 className="text-xl font-bold mb-4">Login</h2>

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
          className="w-full p-2 mb-3 border rounded-lg"
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
          className="w-full p-2 mb-4 border rounded-lg"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
        )}

        {/* Button */}
        <button
          disabled={isSubmitting}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
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
      </form>
    </div>
  );
}
