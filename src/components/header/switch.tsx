import { SwitchTheme, ToolItem } from "@dataesr/react-dsfr";
import { useState } from "react";

export const SwitchThemeMode = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ToolItem onClick={() => setIsOpen(!isOpen)}>
        <span aria-controls="fr-theme-modal" data-fr-opened={isOpen}>
          Paramètres d&apos;affichage
        </span>
      </ToolItem>
      <SwitchTheme isOpen={isOpen} setIsOpen={() => setIsOpen(!isOpen)} />
    </>
  );
};
