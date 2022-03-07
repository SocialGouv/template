import {
  FooterBodySectionProps,
  FooterBottomSectionProps,
  FooterPartnerSectionProps,
  FooterTopSectionProps,
  HeaderProps,
} from "@components";

const links = [
  {
    title: "Lien utile 1",
    href: "/",
  },
  {
    title: "Lien utile 2",
    href: "/",
  },
];

export const headerProps: HeaderProps = {
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
  bodyItems: [
    { href: "/", title: "Lien A" },
    { href: "/", title: "Lien B" },
  ],
  switchProps: {
    label: "Paramètre d'affichage",
  },
  skipLinksProps: {
    items: links,
  },
  navItems: [
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
  closeButtonLabel: "Fermer",
};

export const footerTopSection: FooterTopSectionProps = {
  links: [
    {
      title: "Liens utiles I",
      links,
    },
    {
      title: "Liens utiles II",
      links,
    },
    {
      title: "Liens utiles III",
      links,
    },
    {
      title: "Liens utiles IV",
      links,
    },
    {
      title: "Liens utiles V",
      links,
    },
  ],
};

export const footerBodySection: FooterBodySectionProps = {
  links,
  image: {
    alt: "",
    src: "https://dummyimage.com/100x80/000/fff.png&text=logo+1",
  },
  ministryName: "Ministère des affaires sociales",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Uenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

export const footerPartnerSection: FooterPartnerSectionProps = {
  title: "Partenaires",
  logos: [
    {
      href: "/",
      alt: "",
      src: "https://dummyimage.com/100x80/000/fff.png&text=logo+1",
    },
    {
      href: "/",
      alt: "",
      src: "https://dummyimage.com/100x80/000/fff.png&text=logo+2",
    },
    {
      href: "/",
      alt: "",
      src: "https://dummyimage.com/100x80/000/fff.png&text=logo+3",
    },
  ],
};

export const footerBottomSection: FooterBottomSectionProps = {
  links,
  version: process.env.NEXT_PUBLIC_APP_VERSION ?? "X.X.X",
  repositoryUrl: process.env.NEXT_PUBLIC_APP_REPOSITORY_URL ?? "",
  commitHash: process.env.NEXT_PUBLIC_APP_VERSION_COMMIT ?? "master",
};
