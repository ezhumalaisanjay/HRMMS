"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = {
  color: string;
  radius: string;
  mode: "light" | "dark";
};

type ThemeProviderProps = {
  children: React.ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialTheme: Theme = {
  color: "zinc",
  radius: "0.5",
  mode: "light",
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const colors = {
  zinc: {
    light: {
      primary: "240 5.9% 10%",
      primaryForeground: "0 0% 98%",
    },
    dark: {
      primary: "0 0% 98%",
      primaryForeground: "240 5.9% 10%",
    },
  },
  red: {
    light: {
      primary: "0 84.2% 60.2%",
      primaryForeground: "0 0% 98%",
    },
    dark: {
      primary: "0 84.2% 60.2%",
      primaryForeground: "0 0% 98%",
    },
  },
  // ... other colors ...
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        try {
          return JSON.parse(savedTheme);
        } catch (error) {
          console.error("Failed to parse saved theme:", error);
          localStorage.removeItem("theme"); // Remove invalid theme from localStorage
        }
      }
    }
    return initialTheme;
  });

  useEffect(() => {
    // Update CSS variables when theme changes
    const root = document.documentElement;
    const colorValues =
      colors[theme.color as keyof typeof colors]?.[theme.mode] ||
      colors.zinc[theme.mode];

    if (colorValues) {
      root.style.setProperty("--primary", colorValues.primary);
      root.style.setProperty(
        "--primary-foreground",
        colorValues.primaryForeground
      );
    }
    root.style.setProperty("--radius", `${theme.radius}rem`);

    if (theme.mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    // Save theme to localStorage
    try {
      localStorage.setItem("theme", JSON.stringify(theme));
    } catch (error) {
      console.error("Failed to save theme to localStorage:", error);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
