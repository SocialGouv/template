import { SwitchProps } from "./type";

export const isSwitch = (
  obj: { title: string; href: string } | SwitchProps
): obj is SwitchProps => "isSwitch" in obj;
