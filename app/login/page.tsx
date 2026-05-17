"use client";

import { useState } from "react";

import { supabase } from "../supabase";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  // LOGIN
  const login = async () => {

    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {

      alert(error.message);

    } else {

      alert("Login Success");

      window.location.href = "/";
    }
  };

  // SIGN UP
  const signup = async () => {

    const { error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) {

      alert(error.message);

    } else {

      alert(
        "Account Created Successfully"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-[#1e293b] p-10 rounded-2xl w-full max-w-md">

        <h1 className="text-4xl font-bold mb-8 text-center">

          BuildIQ Login

        </h1>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full bg-[#0f172a] p-4 rounded-xl mb-4 outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full bg-[#0f172a] p-4 rounded-xl mb-6 outline-none"
        />

        {/* BUTTONS */}
        <div className="grid grid-cols-2 gap-4">

          <button
            onClick={login}
            className="bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl font-semibold"
          >
            Login
          </button>

          <button
            onClick={signup}
            className="bg-green-500 hover:bg-green-400 text-black py-3 rounded-xl font-semibold"
          >
            Sign Up
          </button>

        </div>

      </div>

    </div>
  );
}