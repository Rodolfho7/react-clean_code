import { AccessDeniedError } from "../../domain/Error/access-denied-error";
import { useLogout } from "./use-logout";

type CallBackType = (error: Error) => void;

export const useErrorHandler = (callback: CallBackType): CallBackType => {
  const logout =  useLogout();
  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      logout();
    } else {
      callback(error);
    }
  }
}
