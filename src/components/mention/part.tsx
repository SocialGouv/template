export type MentionPartProps = {
  title: string;
  description: string;
  children?: React.ReactNode | React.ReactNode[];
  divProps?: React.HTMLAttributes<HTMLDivElement>;
};

export const MentionPart = (props: MentionPartProps): JSX.Element => {
  return (
    <div className="fr-mt-3w" {...props.divProps}>
      <h2>{props.title}</h2>
      <p className="fr-mb-2w">{props.description}</p>
      {props.children}
    </div>
  );
};
