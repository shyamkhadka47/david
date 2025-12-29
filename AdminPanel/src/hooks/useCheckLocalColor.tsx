import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the context value type
interface ColorModeContextType {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
}

// Initialize the context with a proper type or undefined
const ColorModeContext = createContext<ColorModeContextType | undefined>(
  undefined,
);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Check localStorage for the 'color-theme' value
  const storedColor = localStorage.getItem('color-theme');

  // Always default to 'light' if there's no value in localStorage
  const [color, setColor] = useState<string>(storedColor || 'light');

  // Set 'color-theme' in localStorage whenever 'color' changes
  useEffect(() => {
    localStorage.setItem('color-theme', 'light');
  }, []); // This runs once when the app starts (on mount)

  return (
    <ColorModeContext.Provider value={{ color, setColor }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export const useCheckLocalColor = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error(
      'useCheckLocalColor must be used within a ColorModeProvider',
    );
  }
  return context;
};
