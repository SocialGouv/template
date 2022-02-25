import { combine } from "zustand/middleware";
import create from "zustand";

export const useHeaderStore = create(
  combine({ isSwitchModeOpen: false }, set => ({
    onSwitchMode: () =>
      set(state => ({ isSwitchModeOpen: !state.isSwitchModeOpen })),
  }))
);
