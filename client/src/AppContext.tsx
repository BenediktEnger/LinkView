import React, { createContext, useContext, useState } from 'react';

interface AppContextProps {
    dataUpdated: boolean;
    updateData: () => void;
    resetDataUpdated: () => void;
  }
  
  const AppContext = createContext<AppContextProps | undefined>(undefined);
  
  export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
  };
  
  interface AppProviderProps {
    children: React.ReactNode;
  }
  
  export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [dataUpdated, setDataUpdated] = useState(false);
  
    const updateData = () => {
      setDataUpdated(true);
    };
  
    const resetDataUpdated = () => {
      setDataUpdated(false);
    };
  
    const contextValue: AppContextProps = {
      dataUpdated,
      updateData,
      resetDataUpdated,
    };
  
    return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
    );
  };