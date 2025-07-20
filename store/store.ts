import { create } from "zustand";
import type { Application } from "@prisma/client";

type ApplicationStore = {
  applications: Application[];
  addApplication: (app: Application) => void;
  setApplication: (app: Application) => void;
  clearApplications: () => void;
  removeApplication: (id: number) => void;
};

export const useApplicationStore = create<ApplicationStore>((set) => ({
  applications: [],
  addApplication: (app) =>
    set((state) => ({
      applications: [...state.applications, app],
    })),
  setApplication: (app) =>
    set((state) => ({
      applications: [
        ...state.applications.filter(
          (application) => application.id !== app.id,
        ),
        app,
      ],
    })),
  clearApplications: () => set({ applications: [] }),
  removeApplication: (id) =>
    set((state) => ({
      applications: state.applications.filter((app) => app.id !== id),
    })),
}));
