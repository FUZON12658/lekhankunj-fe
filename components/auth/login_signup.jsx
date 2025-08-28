"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {Button as CommonButton} from "@/components/common/button"

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Schemas
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const signupSchema = z
    .object({
      firstName: z
        .string()
        .min(1, "First name is required")
        .min(2, "Must be at least 2 characters"),
      middleName: z.string().optional(),
      lastName: z
        .string()
        .min(1, "Last name is required")
        .min(2, "Must be at least 2 characters"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    alert(`${isLogin ? "Login" : "Registration"} successful!`);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    form.reset();
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className=" flex items-center justify-center my-10 px-4">
      <div
        className={`w-full ${
          isLogin ? "max-w-lg" : "max-w-2xl"
        } transition-all duration-300`}
      >
        <div
          className={`bg-white shadow-lg ${
            isLogin ? "p-8" : "p-6"
          } rounded-sm`}
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-header-3 font-recoleta font-bold text-gray-900 mb-1">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-gray-600 text-sm">
              {isLogin ? "Sign in to your account" : "Fill in the details below"}
            </p>
          </div>

          {/* Google Button */}
          <Button
            onClick={() => alert("Redirecting to Google authentication...")}
            variant="outline"
            className="w-full flex items-center justify-center gap-3 mb-5 h-11 rounded-sm border-gray-300 hover:bg-gray-50"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="w-5 h-5"
            />
            <span className="font-medium">Continue with Google</span>
          </Button>

          {/* Divider */}
          <div className="flex items-center mb-5">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-3 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Signup Name Row */}
              {!isLogin && (
                <div className="grid grid-cols-3 gap-3">
                  {["firstName", "middleName", "lastName"].map((name, idx) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-medium text-gray-700">
                            {idx === 0
                              ? "First"
                              : idx === 1
                              ? "Middle"
                              : "Last"}
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <Input
                                {...field}
                                className="pl-8 h-11 text-sm rounded-sm focus:ring-1 focus:ring-green-500 focus:border-green-500"
                                placeholder={
                                  idx === 0
                                    ? "John"
                                    : idx === 1
                                    ? "(Optional)"
                                    : "Doe"
                                }
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-gray-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          {...field}
                          type="email"
                          className="pl-8 h-11 text-sm rounded-sm focus:ring-1 focus:ring-green-500 focus:border-green-500"
                          placeholder="you@example.com"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium text-gray-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="pl-8 pr-10 h-11 text-sm rounded-sm focus:ring-1 focus:ring-green-500 focus:border-green-500"
                          placeholder="Enter your password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              {/* Confirm Password (Signup only) */}
              {!isLogin && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium text-gray-700">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            {...field}
                            type={showConfirmPassword ? "text" : "password"}
                            className="pl-8 pr-10 h-11 text-sm rounded-sm focus:ring-1 focus:ring-green-500 focus:border-green-500"
                            placeholder="Confirm password"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              )}

              {/* Forgot Password */}
              {isLogin && (
                <div className="text-right -mt-1">
                  <button
                    type="button"
                    className="text-xs text-green-600 hover:text-green-700 font-medium"
                    onClick={() => alert("Forgot password clicked")}
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full btn btn-fill-info-green hover:from-green-700 hover:to-blue-700 text-white font-semibold h-11 rounded-sm transition-all duration-200"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </Form>

          {/* Toggle Mode */}
          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                onClick={toggleMode}
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
              
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-3">
          <p className="text-gray-500 text-xs">
            By continuing, you agree to our{" "}
            <button className="text-green-600 hover:text-green-700 underline">
              Terms of Service
            </button>{" "}
            and{" "}
            <button className="text-green-600 hover:text-green-700 underline">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
