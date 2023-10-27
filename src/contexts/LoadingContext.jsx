/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <LoadingContext.Provider value={{ loading, setLoading, error, setError }}>
      {children}
    </LoadingContext.Provider>
  );
}
