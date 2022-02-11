import {
  FooterBodySectionProps,
  FooterBottomSectionProps,
  FooterPartnerSectionProps,
  FooterTopSectionProps,
} from "@components";

export const footerTopSectionProps: FooterTopSectionProps = {
  links: [
    {
      title: "Liens utiles I",
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
    {
      title: "Liens utiles II",
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
    {
      title: "Liens utiles III",
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
    {
      title: "Liens utiles IV",
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
    {
      title: "Liens utiles V",
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
};

export const footerBodySectionProps: FooterBodySectionProps = {
  links: [
    {
      title: "Lien utile 3",
      href: "/",
    },
    {
      title: "Lien utile 4",
      href: "/",
    },
  ],
  image: {
    alt: "",
    src: "https://dummyimage.com/100x80/000/fff.png&text=logo+1",
  },
  ministryName: "Ministère des affaires sociales",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Uenim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
};

export const footerPartnerSectionProps: FooterPartnerSectionProps = {
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

export const footerBottomSectionProps: FooterBottomSectionProps = {
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
};
