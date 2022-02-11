import { Footer, Header } from "@components";

import { Container } from "@dataesr/react-dsfr";
import { FooterProps } from "./footer/type";
import { HeaderProps } from "./header/type";

type Props = {
  children: React.ReactNode;
  headerProps: HeaderProps;
  footerProps: FooterProps;
};

const Index = (props: Props): JSX.Element => {
  return (
    <>
      <Header {...props.headerProps} />
      <Container>{props.children}</Container>
      <Footer {...props.footerProps} />
    </>
  );
};

export default Index;
