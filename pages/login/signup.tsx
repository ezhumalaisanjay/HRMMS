import { ChangeEvent, FormEvent, useState } from 'react';
import { signUp, confirmSignUp } from '../../lib/auth/auth'; // Import the functions from auth.js
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeClosed, Loader } from 'lucide-react';
import Image from 'next/image';
import Logo from "../images/squadLogo.png"

interface LoginComponent {
  handleLogin: () => void;
}

export default function Signup({ handleLogin } : LoginComponent) {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [message, setMessage] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupCompleted, setIsSignupCompleted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility state
  };

  const handleSubmitSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmed(true);
    try {
      const user = await signUp(form.email, form.password, form.name);
      setMessage('Sign-up successful! Please check your email for the confirmation code.');
      setIsSignupCompleted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Sign-up error:', err.message);
        setMessage('Sign-up failed: ' + err.message);
      } else {
        console.error('Sign-up error: An unknown error occurred');
        setMessage('Sign-up failed: An unknown error occurred');
      }
    }
    setIsConfirmed(false);
  };

  const handleConfirmSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmed(true);
    try {
      await confirmSignUp(form.email, confirmationCode);
      setMessage('Account confirmed successfully! You can now sign in.');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage('Confirmation failed: ' + err.message);
      } else {
        setMessage('Confirmation failed: An unknown error occurred.');
      }
    }
    setIsConfirmed(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="flex flex-col items-center text-center mb-4">
          <Image src={Logo} alt="logo" width={200} height={200} />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">{isSignupCompleted ? 'Confirm Sign-Up' : 'Sign Up'}</h2>

        {!isSignupCompleted ? (
          <>
            <form onSubmit={handleSubmitSignUp}>
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
                <Label>Password</Label>
                <div className='relative'>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <Eye className="size-5" /> : <EyeClosed className="size-5"/>}
                  </span>
                </div>
              </div>
              <Button type="submit" className="w-full mt-4">
                {isConfirmed ? <> <Loader className="animate-spin" /> Signing up </> : "Sigup" }
              </Button>
            </form>
          </>
        ) : (
          <form onSubmit={handleConfirmSignUp}>
            <div className="grid gap-2">
              <Input
                type="text"
                name="confirmationCode"
                placeholder="Enter Confirmation Code"
                onChange={(e) => setConfirmationCode(e.target.value)}
                required
              />
              <Button type="submit" className="w-full text-white p-2 rounded">
                {isConfirmed ? <> <Loader className="animate-spin" /> Confirming Signup </> : "Confirm Signup" }
              </Button>
            </div>
          </form>
        )}

        {message && <p className="mt-3 text-center">{message}</p>}

        {!isSignupCompleted && (
          <div className="mt-4 text-sm text-center">
            Already have an account? <span onClick={handleLogin} className="text-black underline hover:cursor-pointer">Sign In</span>
          </div>
        )}
      </div>
    </div>
  );
}
