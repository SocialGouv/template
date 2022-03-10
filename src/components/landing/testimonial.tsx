export type TestimonialProps = {
  description: string;
  image: {
    src: string;
    alt: string;
  };
  link: {
    title: string;
    href: string;
  };
};

export const Testimonial = (props: TestimonialProps): JSX.Element => {
  return (
    <div className="fr-col-12 fr-col-md-4 fr-px-2w">
      <div className="fr-centered fr-my-2w fr-py-4w">
        <a
          target="_blank"
          className="fr-link"
          title={props.link.title}
          href={props.link.href}
          rel="noreferrer"
        >
          <img src={props.image.src} alt={props.image.alt} />
        </a>
      </div>
      <p>{props.description}</p>
    </div>
  );
};
