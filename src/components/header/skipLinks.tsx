import { SkiplinkItem, Skiplinks } from "@dataesr/react-dsfr";

import { SkipLinksProps } from "./type";

export const SkipLinks = (props: SkipLinksProps): JSX.Element => {
  return (
    <Skiplinks>
      {props.items.map((item, index) => (
        <SkiplinkItem key={`${index}-${item.title}`} href={item.href}>
          {item.title}
        </SkiplinkItem>
      ))}
    </Skiplinks>
  );
};
