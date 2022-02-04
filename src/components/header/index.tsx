import { Header } from "@dataesr/react-dsfr";
import { Body } from "./body";
import { Nav } from "./nav";
import { HeaderProps } from "./type";

const Index = (props: HeaderProps): JSX.Element => (
  <Header>
    {props.bodySection && <Body {...props.bodySection} />}
    {props.navSection && <Nav {...props.navSection} />}
  </Header>
);

export default Index;
