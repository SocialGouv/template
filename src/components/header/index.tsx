import {
  HeaderNav,
  NavItem,
  NavSubItem,
  Header,
  Logo,
  ToolItem,
  HeaderBody,
  Service,
  HeaderOperator,
  ToolItemGroup,
  Tool,
} from "@dataesr/react-dsfr";
import { MegaNav } from "./megaNav";
import { HeaderProps } from "./type";
import { SwitchThemeMode } from "./switch";
import { SkipLinks } from "./skipLinks";
import Link from "next/link";

const Index = (props: HeaderProps): JSX.Element => (
  <Header>
    {props.skipLinksProps && <SkipLinks {...props.skipLinksProps} />}
    <HeaderBody>
      <Logo
        splitCharacter={props.splitTitleLength ?? 10}
        asLink={
          <Link href="/" className="fr-nav__link" legacyBehavior={false}></Link>
        }
        href="/"
      >
        {props.mainTitle}
      </Logo>

      {props.image && (
        <HeaderOperator>
          <img
            src={props.image.src}
            alt={props.image.alt}
            style={{ height: props.image.height, width: props.image.width }}
          />
        </HeaderOperator>
      )}
      <Service
        title={props.serviceTitle}
        description={props.serviceDescription}
      />
      <Tool>
        <ToolItemGroup>
          {props.authHeader?.()}
          {props.bodyItems?.map((item, index) => (
            <ToolItem
              key={`${index}-${item.title}`}
              link={item.href}
              asLink={
                <Link
                  href={item.href}
                  className="fr-nav__link"
                  legacyBehavior={false}
                >
                  <a href={item.href}>{item.title}</a>
                </Link>
              }
            >
              {item.title}
            </ToolItem>
          ))}
          {props.switchProps && <SwitchThemeMode {...props.switchProps} />}
        </ToolItemGroup>
      </Tool>
    </HeaderBody>
    <HeaderNav>
      {props.navItems.map((item, index) => {
        if ("linkName" in item) {
          return <MegaNav key={`${index}-${item.title}`} {...item} />;
        } else if ("items" in item) {
          return (
            <NavItem key={`${index}-${item.title}`} title={item.title}>
              {item.items
                ?.filter((i) => i.href)
                .map((subItem, index) => (
                  <NavSubItem
                    key={`${index}-${item.title}`}
                    title={subItem.title}
                    link={subItem.href}
                    current={subItem.current}
                    asLink={
                      <Link
                        href={subItem.href}
                        className="fr-nav__link"
                        legacyBehavior={false}
                      >
                        <a href={subItem.href}>{subItem.title}</a>
                      </Link>
                    }
                  />
                ))}
            </NavItem>
          );
        } else if (item.href) {
          return (
            <NavItem
              key={`${index}-${item.title}`}
              asLink={
                <Link
                  href={item.href}
                  className="fr-nav__link"
                  legacyBehavior={false}
                >
                  <a href={item.href}>{item.title}</a>
                </Link>
              }
              title={item.title}
              link={item.href}
            />
          );
        }
      })}
    </HeaderNav>
  </Header>
);

export default Index;
