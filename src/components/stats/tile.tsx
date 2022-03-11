export type StatsTileProps = {
  title: string;
  stats: string | number;
  description?: string | React.ReactNode;
};

export const StatsTile = (props: StatsTileProps): JSX.Element => {
  return (
    <div className="fr-col-12 fr-col-md-3">
      <div className="fr-card fr-centered fr-card--no-arrow">
        <div className="fr-card__body">
          <strong className="fr-display-xs">{props.stats}</strong>
          <h2 className="fr-card__title fr-mb-4w">{props.title}</h2>
          {props.description && (
            <div className="fr-card__desc">
              <p>{props.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
