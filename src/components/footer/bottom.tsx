import { FooterBottom, FooterCopy, FooterLink } from "@dataesr/react-dsfr";
import { FooterBottomSectionProps } from "./type";

export const Bottom = (props: FooterBottomSectionProps): JSX.Element => (
  <FooterBottom>
    {props.links.map((link, index) => (
      <FooterLink key={`${index}-${link.title}`} href={link.href}>
        {link.title}
      </FooterLink>
    ))}
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
  </FooterBottom>
);
