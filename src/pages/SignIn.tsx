import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setSession } from '../services/session.service';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SignInFormData) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (data.email === "test@example.com" && data.password === "password") {
      const dummyToken = "dummy-auth-token";
      const dummyUserName = "Test User";
      setSession(dummyToken, {email : data.email, name : dummyUserName});
      toast.success("Sign in successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-10 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">Sign in to your account</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
              <input
                id="email-address"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Email address"
                {...register('email', { required: "Email is required" })}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                placeholder="Password"
                {...register('password', { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message as string}</p>}
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
            disabled={loading}
          >
            {loading ? (
              <ScaleLoader color={"#fff"} height={20} />
            ) : (
              'Sign in'
            )}
          </button>
        </form>
        <div className="text-sm text-center">
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 transition">Don't have an account? Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn; 