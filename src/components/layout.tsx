import { Footer, Header } from "@components";
import {
  footerBodySection,
  footerBottomSection,
  footerPartnerSection,
  footerTopSection,
  headerBody,
  headerNav,
} from "@config";
import { Container } from "@dataesr/react-dsfr";

type Props = {
  children: React.ReactNode;
};

const Index = (props: Props): JSX.Element => {
  return (
    <>
      <Header bodySection={headerBody} navSection={headerNav} />
      <Container>{props.children}</Container>
      <Footer
        topSection={footerTopSection}
        bodySection={footerBodySection}
        partnerSection={footerPartnerSection}
        bottomSection={footerBottomSection}
      />
    </>
  );
};

export default Index;
