type Link = {
  title: string;
  href: string;
  name: string;
};

type ItemLink = {
  title: string;
  href: string;
  current?: boolean;
};

type NavItem = ItemLink & { links: Array<Link> };

type Image = {
  alt: string;
  src: string;
  height: string;
  width: string;
};

type RegularNavProps = {
  title: string;
  href?: string;
  items?: Array<ItemLink>;
};

export type MegaNavProps = {
  title: string;
  description: string;
  headingLevel: string;
  linkHref: string;
  linkName: string;
  closeButtonLabel: string;
  items: Array<NavItem>;
};

export type HeaderNavProps = {
  items: Array<RegularNavProps | MegaNavProps>;
};

export type HeaderBodyProps = {
  mainTitle: string;
  splitTitleLength?: number;
  image?: Image;
  serviceTitle: string;
  serviceDescription: string;
  items?: Array<Omit<Link, "name">>;
  switchProps?: SwitchProps;
};

export type HeaderProps = {
  navSection?: HeaderNavProps;
  bodySection: HeaderBodyProps;
};

export type SwitchProps = {
  label: string;
};
