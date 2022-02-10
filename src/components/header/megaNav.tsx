import { MegaNavItem, MegaNavSubItem, Link } from "@dataesr/react-dsfr";
import { MegaNavProps } from "./type";

export const MegaNav = (props: MegaNavProps): JSX.Element => (
  <MegaNavItem
    title={props.title}
    description={props.description}
    as={props.headingLevel}
    closeButtonLabel={props.closeButtonLabel}
    linkLabel={props.linkName}
    link={props.linkHref}
  >
    {props.items.map((item, index) => (
      <MegaNavSubItem
        key={`${index}-${item.title}`}
        title={item.title}
        link={item.href}
        current={item.current}
      >
        {item.links.map((link, index) => (
          <Link
            key={`${index}-${link.title}`}
            title={link.title}
            href={link.href}
          >
            {link.name}
          </Link>
        ))}
      </MegaNavSubItem>
    ))}
  </MegaNavItem>
);
