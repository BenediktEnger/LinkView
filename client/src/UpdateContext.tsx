import React, { createContext, useContext, useState } from 'react';

interface UpdateContextProps {
    dataUpdated: boolean;
    updateData: () => void;
    resetDataUpdated: () => void;
  }
  
  export const UpdateContext = createContext<UpdateContextProps | undefined>(undefined);
  
  export const useUpdateContext = () => {
    const context = useContext(UpdateContext);
    if (!context) {
      throw new Error("useUpdateContext must be used within an AppProvider");
    }
    return context;
  };
  
  interface AppProviderProps {
    children: React.ReactNode;
  }
  
  export const UpdateProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [dataUpdated, setDataUpdated] = useState(false);
  
    const updateData = () => {
      setDataUpdated(true);
    };
  
    const resetDataUpdated = () => {
      setDataUpdated(false);
    };
  
    const contextValue: UpdateContextProps = {
      dataUpdated,
      updateData,
      resetDataUpdated,
    };
  
    return (
      <UpdateContext.Provider value={contextValue}>
        {children}
      </UpdateContext.Provider>
    );
  };