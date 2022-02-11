import { Footer } from "@dataesr/react-dsfr";
import { Body } from "./body";
import { Bottom } from "./bottom";
import { Partners } from "./partner";
import { Top } from "./top";
import { FooterProps } from "./type";

const Index = (props: FooterProps): JSX.Element => (
  <Footer>
    {props.topSection && <Top {...props.topSection} />}
    {props.bodySection && <Body {...props.bodySection} />}
    {props.partnerSection && <Partners {...props.partnerSection} />}
    {props.bottomSection && <Bottom {...props.bottomSection} />}
  </Footer>
);

export default Index;
