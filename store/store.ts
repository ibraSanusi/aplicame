import { create } from "zustand";
import { type Application } from "@prisma/client";

type ApplicationStore = {
  applications: Application[];
  addApplication: (app: Application) => void;
  clearApplications: () => void;
};

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: [],
  addApplication: (app) =>
    set((state) => ({
      applications: [...state.applications, app],
    })),
  clearApplications: () => set({ applications: [] }),
}));
