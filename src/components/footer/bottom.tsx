import {
  FooterBottom,
  FooterCopy,
  FooterLink,
  SwitchTheme,
} from "@dataesr/react-dsfr";
import { useState } from "react";
import { FooterBottomSectionProps } from "./type";

export const Bottom = (props: FooterBottomSectionProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FooterBottom>
      {props.links.map((link, index) => (
        <FooterLink key={`${index}-${link.title}`} href={link.href}>
          {link.title}
        </FooterLink>
      ))}
      {props.hasSwitchMode && (
        <FooterLink onClick={() => setIsOpen(true)} href="/">
          <span aria-controls="fr-theme-modal" data-fr-opened={isOpen}>
            Paramètres d’affichage
          </span>
        </FooterLink>
      )}
      <FooterCopy>
        <p>
          Sauf mention contraire, tous les contenus de ce site sont sous{" "}
          <a
            href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
            rel="noreferrer"
            target="_blank"
          >
            licence etalab-2.0
          </a>
        </p>
        <p>
          Version {props.version} (
          <a
            target="_blank"
            href={`${props.repositoryUrl}/tree/${props.commitHash}`}
            rel="noreferrer"
          >
            {props.commitHash.substring(0, 8)}
          </a>
          )
        </p>
      </FooterCopy>
      {props.hasSwitchMode && (
        <SwitchTheme isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </FooterBottom>
  );
};
