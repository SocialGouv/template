import { HeaderBodyProps, HeaderNavProps } from "@components";

export const headerBody: HeaderBodyProps = {
  mainTitle: "République Française",
  splitTitleLength: 10,
  image: {
    src: "/assets/marianne.jpeg",
    alt: "Logo",
    height: "80px",
    width: "80px",
  },
  serviceTitle: "La fabrique numérique des Ministères Sociaux",
  serviceDescription:
    "L'incubateur des services numériques du pôle ministériel",
  items: [
    { href: "/", title: "Lien A" },
    { href: "/", title: "Lien B" },
    {
      label: "Paramètre d'affichage",
      isSwitch: true,
    },
  ],
};

export const headerNav: HeaderNavProps = {
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
      description: "Navigation",
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
              title: "Name 1",
              href: "/",
              name: "Name 1",
            },
            {
              title: "Name 2",
              href: "/",
              name: "Name 2",
            },
          ],
        },
      ],
    },
  ],
};
