import React, { createContext, useContext, useState } from 'react';

interface EditContextProps {
    editSelected: boolean;
    editData: () => void;
    resetEditData: () => void;
  }
  
  const EditContext = createContext<EditContextProps | undefined>(undefined);
  
  export const useEditContext = () => {
    const context = useContext(EditContext);
    if (!context) {
      throw new Error("useEditContext must be used within an AppProvider");
    }
    return context;
  };
  
  interface AppProviderProps {
    children: React.ReactNode;
  }
  
  export const EditProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [editSelected, setEditSelected] = useState(false);
  
    const editData = () => {
      setEditSelected(true);
    };
  
    const resetEditData = () => {
      setEditSelected(false);
    };
  
    const contextValue: EditContextProps = {
      editSelected,
      editData,
      resetEditData,
    };
  
    return (
      <EditContext.Provider value={contextValue}>
        {children}
      </EditContext.Provider>
    );
  };