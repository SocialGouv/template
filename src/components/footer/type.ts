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

export type PartnerSectionProps = {
  title: string;
  logos: Array<Logo>;
};

export type BottomSectionProps = {
  links: Array<Link>;
  copyright: string;
};

export type TopSectionProps = {
  links: Array<LinksWithCategory>;
};

export type BodySectionProps = {
  links?: Array<Link>;
  image?: Image;
  ministryName: string;
  description: string;
};

export type FooterProps = {
  topSection?: TopSectionProps;
  bodySection?: BodySectionProps;
  partnerSection?: PartnerSectionProps;
  bottomSection?: BottomSectionProps;
};
