import {
  FooterBody,
  Logo,
  FooterBodyItem,
  Link,
  FooterOperator,
} from "@dataesr/react-dsfr";
import { FooterBodySectionProps } from "./type";
import Image from "next/image";

export const Body = (props: FooterBodySectionProps): JSX.Element => (
  <FooterBody description={props.description}>
    <Logo>{props.ministryName}</Logo>
    {props.image && (
      <FooterOperator>
        <Image src={props.image.src} alt={props.image.alt} />
      </FooterOperator>
    )}
    {props.links?.map((link, index) => (
      <FooterBodyItem key={`${index}-${link.title}`}>
        <Link href={link.href}>{link.title}</Link>
      </FooterBodyItem>
    ))}
  </FooterBody>
);
