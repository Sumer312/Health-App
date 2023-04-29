import { create } from "zustand";
import { persist } from "zustand/middleware";

export enum authEnum {
  USER = "user",
  GUEST = "guest",
}

interface authType {
  role: authEnum;
  ID: string | null;
  token: string | null;
  changeRoleToGuest: () => void;
  changeRoleToUser: (token: string, id: string) => void;
}

const useAuthStore = create<authType>()(
  persist(
    (set) => ({
      role: authEnum.GUEST,
      token: null,
      ID: null,
      changeRoleToUser: (token: string, id: string) =>
        set(() => ({
          role: authEnum.USER,
          ID: id,
          token: token,
        })),
      changeRoleToGuest: () =>
        set(() => ({
          role: authEnum.GUEST,
        })),
    }),
    {
      name: "authStore",
    }
  )
);

export default useAuthStore;
