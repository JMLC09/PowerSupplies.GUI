import React, { ReactNode, useState } from "react";
import { toast } from "sonner";
import { AuthenticationModel } from "../models/Authentication/AuthenticationModel";
import { User } from "../models/Authentication/User";
import { createAuthorizedRequest } from "../axios";
import dayjs from "dayjs";

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = React.createContext(new AuthenticationModel());

function AuthContextProvider(props: AuthContextProviderProps): JSX.Element {
  let session: { user: User; created: string } | null = null;
  try {
    const sessionData = window.localStorage.getItem("session");

    if (sessionData !== null) {
      session = JSON.parse(sessionData);

      if (
        session !== null &&
        dayjs(session.created).add(0.9, "day").isBefore(dayjs())
      ) {
        session = null;
      }
    }
  } catch {}

  const [user, setUser] = useState<User>(new User());

  const login = async (username: string, password: string): Promise<void> => {
    const credentials = {
      usuario: username,
      password: password,
    };
    const makeRequest = createAuthorizedRequest();

    const loginFunction = async (): Promise<User> => {
      return new Promise((resolve) => {
        setTimeout(async () => {
          const respuesta = await makeRequest
            .post("/Users/Login", credentials)
            .then((res) => {
              return res.data;
            });
          resolve(respuesta);
        }, 1000);
      });
    };
    const callFunction = loginFunction();
    toast.promise<User>(callFunction, {
      loading: "Iniciando sesión...",
      success: (data) => {
        setUser(data);
        window.localStorage.setItem(
          "session",
          JSON.stringify({
            user: data,
            created: new Date(),
          })
        );
        return `Bienvenid@ ${data.name}`;
      },
      error: (err) => {
        setUser({
          name: "",
          username: "",
          token: null,
          roles: [""],
        });
        return err.message;
      },
    });
  };

  const logout = (): Promise<void> => {
    const logOutFunction = async (): Promise<void> => {
      return new Promise((resolve) => {
        setTimeout(() => {
          localStorage.clear();
          location.reload();
          resolve();
        }, 1500);
      });
    };

    const callFunction = logOutFunction();

    return toast.promise<void>(callFunction, {
      loading: "Cerrando sesión...",
      success: (() => "Hasta luego!") as any,
      error: (() => undefined) as any,
    }) as unknown as Promise<void>;
  };

  const values = new AuthenticationModel(!!user.token, login, logout, user);

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
