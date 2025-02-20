import { useState } from "react";
import { signIn } from "../../lib/auth/auth"; // Ensure correct path
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, Loader } from "lucide-react"
import Logo from "../images/squadLogo.png"
import Image from "next/image";

interface LoginComponent {
  className?: string
  handleLogin: () => void;
}

export default function LoginForm({
  handleLogin,
  className,
  ...props
}: LoginComponent) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility state
  };

  const handleSubmitSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await signIn(form.email, form.password);
      if (response?.success) {
        setMessage("Sign-in successful!");
      } else {
        setMessage("Sign-in successful!");
      }
    } catch (err: any) {
      console.error("Sign-in error:", err.message);
      setMessage("Sign-in failed: " + err.message);
    }
    setIsLoggingIn(false);
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card className="overflow-hidden">
            <CardContent className="grid p-0">
              <form className="p-6 md:p-8 w-full" onSubmit={handleSubmitSignIn}>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <Image src={Logo} alt="logo" width={200} height={200} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={form.password}
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
                  <Button type="submit" className="w-full">
                    {isLoggingIn ? <> <Loader className="animate-spin" /> Logging in </> : "Login" }
                  </Button>
                  {message && (
                    message == "Sign-in successful!" ?  
                    <p className="mt-3 text-center text-green-500">{message}</p>
                    : 
                    <p className="mt-3 text-center text-red-500">{message}</p>
                  )}
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <Button variant="outline" className="w-full">
                      Google
                    </Button>
                    <Button variant="outline" className="w-full">
                      Facebook
                    </Button>
                    <Button variant="outline" className="w-full">
                      Apple
                    </Button>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <span onClick={handleLogin} className="underline hover:cursor-pointer hover:text-primary">
                      Sign up
                    </span>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
