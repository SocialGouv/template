import {
  SwitchTheme,
  //@ts-ignore
  ToolItem,
} from "@dataesr/react-dsfr";
import { useState } from "react";
import { SwitchProps } from "./type";

export const SwitchThemeMode = (props: SwitchProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ToolItem onClick={() => setIsOpen(!isOpen)}>
        <span
          className="fr-fi-theme-fill fr-link--icon-left"
          aria-controls="fr-theme-modal"
          data-fr-opened={isOpen}
        >
          {props.label}
        </span>
      </ToolItem>
      <SwitchTheme isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
    </>
  );
};
