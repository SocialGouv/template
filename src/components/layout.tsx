import { Footer, Header } from "@components";
import { Container } from "@dataesr/react-dsfr";

type Props = {
  children: React.ReactNode;
};

const Index = (props: Props): JSX.Element => {
  return (
    <>
      <Header
        bodySection={{
          mainTitle: "République Française",
          splitTitleLength: 10,
          image: {
            src: "https://dummyimage.com/100x80/000/fff.png&text=logo+4",
            alt: "Logo",
          },
          serviceTitle: "Template",
          serviceDescription: "Template description",
          items: [{ href: "/", title: "Accueil" }],
        }}
        navSection={{
          items: [
            {
              title: "Titre 1",
              items: [
                {
                  title: "Lien A",
                  href: "/",
                  current: true,
                },
                {
                  title: "Lien B",
                  href: "/",
                },
              ],
            },
            {
              title: "Titre 2",
              href: "/",
            },
            {
              title: "Titre 3",
              description: "mega nav",
              headingLevel: "h5",
              linkHref: "/",
              linkName: "Link",
              closeButtonLabel: "Fermer",
              href: "/",
              items: [
                {
                  title: "Accueil",
                  href: "/",
                  current: true,
                  links: [
                    {
                      title: "Accueil",
                      href: "/",
                      name: "name",
                    },
                    {
                      title: "Yo",
                      href: "/",
                      name: "name 2",
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
      <Container>{props.children}</Container>
      <Footer
        topSection={{
          links: [
            {
              title: "Liens utiles",
              links: [
                {
                  title: "Lien utile 1",
                  href: "/",
                },
                {
                  title: "Lien utile 2",
                  href: "/",
                },
              ],
            },
          ],
        }}
        bodySection={{
          links: [
            {
              title: "Lien utile 1",
              href: "/",
            },
            {
              title: "Lien utile 2",
              href: "/",
            },
          ],
          image: {
            alt: "",
            src: "https://dummyimage.com/100x80/000/fff.png&text=logo+4",
          },
          ministryName: "Ministère des affaires sociaux",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Uenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        }}
        partnerSection={{
          title: "Partenaires",
          logos: [
            {
              isMain: true,
              href: "/",
              alt: "",
              src: "https://dummyimage.com/100x80/000/fff.png&text=logo+1",
            },
            {
              href: "/",
              alt: "",
              src: "https://dummyimage.com/100x80/000/fff.png&text=logo+1",
            },
            {
              href: "/",
              alt: "",
              src: "https://dummyimage.com/100x80/000/fff.png&text=logo+1",
            },
          ],
        }}
        bottomSection={{
          links: [
            {
              title: "Lien utile 1",
              href: "/",
            },
            {
              title: "Lien utile 2",
              href: "/",
            },
          ],
          copyright: "© République Française 2022",
        }}
      />
    </>
  );
};

export default Index;
