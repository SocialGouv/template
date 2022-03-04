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

const Index = (props: HeaderProps): JSX.Element => (
  <Header>
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
      <Tool {...props.closeButtonLabel}>
        <ToolItemGroup>
          {props.bodyItems?.map((item, index) => (
            <ToolItem key={`${index}-${item.title}`} link={item.href}>
              {item.title}
            </ToolItem>
          ))}
          {props.switchProps && <SwitchThemeMode {...props.switchProps} />}
        </ToolItemGroup>
      </Tool>
    </HeaderBody>
    <HeaderNav>
      {props.navItems.map((item, index) => {
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
  </Header>
);

export default Index;
