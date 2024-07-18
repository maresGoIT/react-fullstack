import React, { useMemo, createContext } from 'react';
function ProviderComponent({ children }) {
  // Define the state or data you want to share
  const sharedData = 'This is some shared data';
  // Memoize the context provider
  const contextValue = useMemo(() => sharedData, [sharedData]);
  
  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
}