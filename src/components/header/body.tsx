import {
  ToolItem,
  Logo,
  HeaderBody,
  Service,
  HeaderOperator,
  ToolItemGroup,
  Tool,
} from "@dataesr/react-dsfr";
import { SwitchThemeMode } from "./switch";
import { HeaderBodyProps } from "./type";

export const Body = (props: HeaderBodyProps): JSX.Element => (
  <HeaderBody>
    <Logo splitCharacter={props.splitTitleLength ?? 10}>{props.mainTitle}</Logo>
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
        {props.items?.map((item, index) => (
          <ToolItem key={`${index}-${item.title}`} link={item.href}>
            {item.title}
          </ToolItem>
        ))}
        {props.switchProps && <SwitchThemeMode {...props.switchProps} />}
      </ToolItemGroup>
    </Tool>
  </HeaderBody>
);
