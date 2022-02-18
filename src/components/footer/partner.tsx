import {
  FooterPartners,
  FooterPartnersTitle,
  FooterPartnersLogo,
} from "@dataesr/react-dsfr";
import { FooterPartnerSectionProps } from "./type";

export const Partners = (props: FooterPartnerSectionProps): JSX.Element => (
  <FooterPartners>
    <FooterPartnersTitle>{props.title}</FooterPartnersTitle>
    {props.logos?.map((logo, index) => (
      <FooterPartnersLogo
        key={`${index}-${logo.src}`}
        isMain={logo.isMain}
        href={logo.href}
        imageSrc={logo.src}
        imageAlt={logo.alt}
      />
    ))}
  </FooterPartners>
);
