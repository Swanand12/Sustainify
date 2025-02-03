import { useState, createContext, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
   const [auth, setAuth] = useState({
      user: null,
      token: "",
   });

   useEffect(() => {
      const parseData = JSON.parse(localStorage.getItem("auth"));

      try {
         if (parseData) {
            setAuth({
               user: parseData.user,
               token: parseData.token,
            });
         }
      } catch (error) {
         console.log(error);
      }
   }, []);

   return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
