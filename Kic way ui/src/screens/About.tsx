import React from "react";
import { AuthForm } from "../components/auth/AuthForm";

export const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#006839] text-white p-4">
        <h1 className="text-2xl font-bold text-center">KIC Way</h1>
      </header>

      <main>
        <AuthForm />
      </main>

      <footer className="bg-[#006839] text-white p-4 text-center mt-8">
        <p>© 2023 KIC Way. All rights reserved.</p>
      </footer>
    </div>
  );
};
