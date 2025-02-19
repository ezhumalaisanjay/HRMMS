import { useState } from 'react';
import { signUp, confirmSignUp } from './auth'; // Import the functions from auth.js

export default function Signup() {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSignupCompleted, setIsSignupCompleted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      const user = await signUp(form.email, form.password, form.name);
      setMessage('Sign-up successful! Please check your email for the confirmation code.');
      setIsSignupCompleted(true);
    } catch (err) {
      console.error('Sign-up error:', err.message);
      setMessage('Sign-up failed: ' + err.message);
    }
  };

  const handleConfirmSignUp = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp(form.email, confirmationCode);
      setIsConfirmed(true);
      setMessage('Account confirmed successfully! You can now sign in.');
    } catch (err) {
      setMessage('Confirmation failed: ' + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{isSignupCompleted ? 'Confirm Sign-Up' : 'Sign Up'}</h2>

        {!isSignupCompleted ? (
          <form onSubmit={handleSubmitSignUp}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
              className="w-full p-2 mb-3 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
              className="w-full p-2 mb-3 border border-gray-300 rounded"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
              className="w-full p-2 mb-3 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleConfirmSignUp}>
            <input
              type="text"
              name="confirmationCode"
              placeholder="Enter Confirmation Code"
              onChange={(e) => setConfirmationCode(e.target.value)}
              required
              className="w-full p-2 mb-3 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Confirm Sign-Up
            </button>
          </form>
        )}

        {message && <p className="mt-3 text-center">{message}</p>}

        {!isSignupCompleted && (
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <a href="/signin" className="text-blue-500">Sign In</a>
          </p>
        )}
      </div>
    </div>
  );
}
