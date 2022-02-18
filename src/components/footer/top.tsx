import { FooterTop, FooterTopCategory, FooterLink } from "@dataesr/react-dsfr";
import { FooterTopSectionProps } from "./type";

export const Top = (props: FooterTopSectionProps): JSX.Element => (
  <FooterTop>
    {props.links.map((item, index) => (
      <FooterTopCategory key={`${index}-${item.title}`} title={item.title}>
        {item.links.map((link, index) => (
          <FooterLink key={`${index}-${link.title}`} href={link.href}>
            {link.title}
          </FooterLink>
        ))}
      </FooterTopCategory>
    ))}
  </FooterTop>
);
