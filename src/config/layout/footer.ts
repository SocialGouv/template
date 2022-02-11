import {
  FooterBodySectionProps,
  FooterBottomSectionProps,
  FooterPartnerSectionProps,
  FooterTopSectionProps,
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
      isMain: true,
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
  copyright: "© République Française 2022",
};
