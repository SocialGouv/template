import Link from "next/link";

export type TileProps = {
  title: string;
  description: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
};

export const Tile = (props: TileProps): JSX.Element => {
  return (
    <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-3">
      <div className="fr-card fr-enlarge-link fr-pt-3w">
        <div className="fr-card__body">
          <h2 className="fr-card__title">
            <Link href={props.href}>
              <a className="fr-card__link" href={props.href}>
                {props.title}
              </a>
            </Link>
          </h2>
          <p className="fr-card__desc">{props.description}</p>
        </div>
        <div className="fr-card__img">
          <img src={props.image.src} alt={props.image.alt} />
        </div>
      </div>
    </div>
  );
};
