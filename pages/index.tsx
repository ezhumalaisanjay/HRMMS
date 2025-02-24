import { useState } from "react";
import LoginForm from "./login/signin";
import Signup from "./login/signup";
import { ThemeProvider } from "@/components/ui/theme-provider";

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const isLoginTrue = () => {
    setIsLogin(true);
  }

  const isLoginFalse = () => {
    setIsLogin(false);
  }

  return (
    <>
      <ThemeProvider>
        <div className="flex w-full justify-center">
          {isLogin ? 
          <LoginForm handleLogin={isLoginFalse}/>
          :
          <Signup handleLogin={isLoginTrue}/>
          }
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
