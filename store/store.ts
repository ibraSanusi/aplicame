import { create } from "zustand";
import { ApplicationData } from "@/lib";

type ApplicationStore = {
  applications: ApplicationData[];
  addApplication: (app: ApplicationData) => void;
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
