type Link = {
  title: string;
  href: string;
};

type LinksWithCategory = {
  title: string;
  links: Array<Link>;
};

type Image = {
  alt: string;
  src: string;
};

type Logo = Image & {
  isMain?: boolean;
  href: string;
};

export type FooterPartnerSectionProps = {
  title: string;
  logos: Array<Logo>;
};

export type FooterBottomSectionProps = {
  links: Array<Link>;
  version: string;
  repositoryUrl: string;
  commitHash: string;
};

export type FooterTopSectionProps = {
  links: Array<LinksWithCategory>;
};

export type FooterBodySectionProps = {
  links?: Array<Link>;
  image?: Image;
  ministryName: string;
  description: string;
};

export type FooterProps = {
  topSection?: FooterTopSectionProps;
  bodySection?: FooterBodySectionProps;
  partnerSection?: FooterPartnerSectionProps;
  bottomSection?: FooterBottomSectionProps;
};
