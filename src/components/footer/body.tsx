import {
  FooterBody,
  Logo,
  FooterBodyItem,
  Link,
  FooterOperator,
} from "@dataesr/react-dsfr";
import { BodySectionProps } from "./type";

export const Body = (props: BodySectionProps): JSX.Element => (
  <FooterBody description={props.description}>
    <Logo>{props.ministryName}</Logo>
    {props.image && (
      <FooterOperator>
        <img src={props.image.src} alt={props.image.alt} />
      </FooterOperator>
    )}
    {props.links?.map((link, index) => (
      <FooterBodyItem key={`${index}-${link.title}`}>
        <Link href={link.href}>{link.title}</Link>
      </FooterBodyItem>
    ))}
  </FooterBody>
);
