import {
  HeaderNav,
  NavItem,
  NavSubItem,
  Header,
  ToolItem,
  Logo,
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

const Index = (props: HeaderProps): JSX.Element => (
  <Header>
    {props.skipLinksProps && <SkipLinks {...props.skipLinksProps} />}
    <HeaderBody>
      <Logo splitCharacter={props.splitTitleLength ?? 10}>
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
          {props.bodyItems?.map((item, index) => (
            <ToolItem key={`${index}-${item.title}`} link={item.href}>
              {item.title}
            </ToolItem>
          ))}
          <ToolItem>
            <SwitchThemeMode />
          </ToolItem>
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
  </Header>
);

export default Index;
