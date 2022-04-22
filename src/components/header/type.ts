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
  linkHref: string;
  linkName: string;
  closeButtonLabel: string;
  items: Array<NavItem>;
};

export type HeaderProps = {
  mainTitle: string;
  splitTitleLength?: number;
  image?: Image;
  serviceTitle: string;
  serviceDescription: string;
  bodyItems?: Array<Omit<Link, "name">>;
  switchProps?: SwitchProps;
  closeButtonLabel?: string;
  navItems: Array<RegularNavProps | MegaNavProps>;
  skipLinksProps?: SkipLinksProps;
  authHeader?: () => JSX.Element;
};

export type SwitchProps = {
  label: string;
};

export type SkipLinksProps = {
  items: Array<Omit<Link, "name">>;
};
