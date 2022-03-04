export type HeadProps = {
  title: string;
  textLead: string | React.ReactNode | React.ReactNode[];
  description: string;
  image: {
    src: string;
    alt: string;
  };
};

export const Head = (props: HeadProps): JSX.Element => {
  return (
    <>
      <div className="fr-col-12 fr-col-md-6">
        <h1>
          {props.title}
          <span className="fr-text--lead d-block fr-mt-3w">
            {props.textLead}
          </span>
        </h1>
        <p className="fr-mt-10w">{props.description}</p>
      </div>
      <div className="fr-col-12 fr-col-offset-md-1 fr-col-md-4">
        <img className="fr-mt-2w" src={props.image.src} alt={props.image.alt} />
      </div>
    </>
  );
};
