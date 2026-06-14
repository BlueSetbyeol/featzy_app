import { createContext, useState } from "react";
import { AuthUser } from "../types/authTypes";

const AuthContext = createContext<LoginProps>({ setUser: () => {} });

interface UserProps {
  user: AuthUser;
  token: string;
}

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<UserProps | undefined>>;
  user?: UserProps;
}

export const LoginProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserProps>();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
