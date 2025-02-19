import { useState } from 'react';
import { signIn } from './auth'; // Import the signIn function from auth.js
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/router';  // Import useRouter

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();  // Initialize useRouter

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    try {
      // Ensure the signIn function works as expected
      const response = await signIn(form.email, form.password);  // Call the signIn function
      if (response?.success) {
        setMessage('Sign-in successful!');
        setIsAuthenticated(true);
        router.push('/hr/dashboard');  // Redirect to the dashboard on success
      } else {
        setMessage('Sign-in failed: Invalid credentials');
      }
    } catch (err) {
      console.error('Sign-in error:', err.message);
      setMessage('Sign-in failed: ' + err.message);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmitSignIn}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your Acme Inc account
                </p>
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
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              {message && <p className="mt-3 text-center">{message}</p>}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              {/* Social login buttons */}
              <div className="grid grid-cols-3 gap-4">
                <Button variant="outline" className="w-full">
                  {/* Apple icon */}
                </Button>
                <Button variant="outline" className="w-full">
                  {/* Google icon */}
                </Button>
                <Button variant="outline" className="w-full">
                  {/* Meta icon */}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
