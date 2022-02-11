import { FooterBottom, FooterCopy, FooterLink } from "@dataesr/react-dsfr";
import { FooterBottomSectionProps } from "./type";

export const Bottom = (props: FooterBottomSectionProps): JSX.Element => (
  <FooterBottom>
    {props.links.map((link, index) => (
      <FooterLink key={`${index}-${link.title}`} href={link.href}>
        {link.title}
      </FooterLink>
    ))}
    <FooterCopy>{props.copyright}</FooterCopy>
  </FooterBottom>
);
