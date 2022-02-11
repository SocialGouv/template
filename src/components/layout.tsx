import { Footer, Header } from "@components";
import {
  footerBodySectionProps,
  footerBottomSectionProps,
  footerPartnerSectionProps,
  footerTopSectionProps,
  headerBodyProps,
  headerNavProps,
} from "@config";
import { Container } from "@dataesr/react-dsfr";

type Props = {
  children: React.ReactNode;
};

const Index = (props: Props): JSX.Element => {
  return (
    <>
      <Header bodySection={headerBodyProps} navSection={headerNavProps} />
      <Container>{props.children}</Container>
      <Footer
        topSection={footerTopSectionProps}
        bodySection={footerBodySectionProps}
        partnerSection={footerPartnerSectionProps}
        bottomSection={footerBottomSectionProps}
      />
    </>
  );
};

export default Index;
