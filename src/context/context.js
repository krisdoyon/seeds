import React, { useContext } from "react";

const appContext = React.createContext();

const AppProvider = ({ children }) => {
  return <appContext.Provider value={{}}>{children}</appContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(appContext);
};

export { AppProvider, useGlobalContext };
