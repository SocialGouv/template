import { HeaderNav, NavItem, NavSubItem } from "@dataesr/react-dsfr";
import { MegaNav } from "./megaNav";
import { NavProps } from "./type";

export const Nav = (props: NavProps): JSX.Element => (
  <HeaderNav>
    {props.items.map((item, index) => {
      if ("headingLevel" in item) {
        return <MegaNav key={`${index}-${item.title}`} {...item} />;
      } else if ("items" in item) {
        return (
          <NavItem key={`${index}-${item.title}`} title={item.title}>
            {item.items?.map((subItem, index) => (
              <NavSubItem
                key={`${index}-${subItem.title}`}
                title={subItem.title}
                link={subItem.href}
                current={subItem.current}
              />
            ))}
          </NavItem>
        );
      } else {
        return (
          <NavItem
            key={`${index}-${item.title}`}
            title={item.title}
            link={item.href}
          />
        );
      }
    })}
  </HeaderNav>
);
