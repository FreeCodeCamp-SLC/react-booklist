import { createContext } from "react";
import { loadAuthToken } from "./utils/local-storage";

const authToken = loadAuthToken();
// Will be using this to automatically load returning users in if a valid JWT Token is found in local storage. Back end needs work first though. Need to be able to log a user in w/ just the JWT Token.
export const AuthContext = createContext(null);
