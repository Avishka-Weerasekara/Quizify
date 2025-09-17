import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    console.log("Signup:", { name, email, password });
    // TODO: call backend API for signup
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border p-3 rounded-lg"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Sign Up
        </button>
      </form>

      {/* Login link */}
      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}