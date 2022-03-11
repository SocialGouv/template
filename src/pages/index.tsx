import { Head, Testimonial, Tile } from "@components";
import { Row } from "@dataesr/react-dsfr";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";

const Index: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Template"
        description="Template de la fabrique des ministères sociaux."
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <section>
        <Row
          justifyContent="center"
          alignItems="middle"
          className="fr-mb-8w fr-mt-8w"
        >
          <Head
            title="Template"
            textLead={<p>Template de la fabrique des ministères sociaux.</p>}
            description="Pariatur veniam ipsum pariatur elit ullamco sit quis ipsum ad veniam proident sunt. Qui ut irure in quis reprehenderit. Laborum anim ad laboris ipsum magna ullamco consequat ex consectetur. Duis sit adipisicing ipsum occaecat commodo consequat officia ea. Cupidatat fugiat reprehenderit aliqua eiusmod mollit Lorem consectetur. Minim elit proident eu qui exercitation mollit id esse velit et dolore velit laboris. Ipsum occaecat Lorem occaecat magna excepteur veniam ullamco cupidatat irure incididunt velit nulla."
            image={{
              src: "https://dummyimage.com/190x300/188cf2/fff.png&text=logo+1",
              alt: "Image",
            }}
          />
        </Row>
      </section>
      <section>
        <Row justifyContent="center" gutters>
          <Tile
            title="Nisi irure nisi et et commodo veniam consectetur aliqua irure occaecat quis ut in."
            description="Eu ad aliqua laborum consequat pariatur et reprehenderit cupidatat deserunt."
            href="/"
            image={{
              src: "https://dummyimage.com/100x80/188cf2/fff.png&text=logo+1",
              alt: "Image",
            }}
          />
          <Tile
            title="Nisi irure nisi et et commodo veniam consectetur aliqua irure occaecat quis ut in."
            description="Eu ad aliqua laborum consequat pariatur et reprehenderit cupidatat deserunt."
            href="/"
            image={{
              src: "https://dummyimage.com/100x80/188cf2/fff.png&text=logo+1",
              alt: "Image",
            }}
          />
          <Tile
            title="Nisi irure nisi et et commodo veniam consectetur aliqua irure occaecat quis ut in."
            description="Eu ad aliqua laborum consequat pariatur et reprehenderit cupidatat deserunt."
            href="/"
            image={{
              src: "https://dummyimage.com/100x80/188cf2/fff.png&text=logo+1",
              alt: "Image",
            }}
          />
        </Row>
      </section>
      <section>
        <div className="fr-container fr-py-6w">
          <div className="fr-grid-row fr-grid-row--center fr-grid-row--gutters">
            <div className="fr-col-12">
              <h2>
                Aute commodo sunt mollit incididunt proident excepteur do duis
                eu.
              </h2>
            </div>
            <Testimonial
              image={{
                src: "https://dummyimage.com/100x80/188cf2/fff.png&text=logo+1",
                alt: "Image",
              }}
              link={{
                href: "/",
                title: "Lorem ipsum",
              }}
              description="Non cupidatat amet veniam officia amet laborum quis labore consequat. Consectetur occaecat ad aliquip exercitation ex. Laborum est sint eiusmod incididunt adipisicing quis aliquip enim magna pariatur duis eiusmod id ad."
            />
            <Testimonial
              image={{
                src: "https://dummyimage.com/100x80/188cf2/fff.png&text=logo+1",
                alt: "Image",
              }}
              link={{
                href: "/",
                title: "Lorem ipsum",
              }}
              description="Consectetur ad irure voluptate nostrud commodo. Nulla eu laborum elit aliqua laboris. Do tempor nisi culpa pariatur ea excepteur aliqua nisi excepteur dolore. Excepteur eiusmod in mollit dolore eiusmod commodo labore eiusmod eiusmod excepteur excepteur tempor mollit quis."
            />
            <Testimonial
              image={{
                src: "https://dummyimage.com/100x80/188cf2/fff.png&text=logo+1",
                alt: "Image",
              }}
              link={{
                href: "/",
                title: "Lorem ipsum",
              }}
              description="Excepteur fugiat aliquip eu Lorem laborum ad exercitation adipisicing officia aliquip. Culpa nulla labore irure proident Lorem aute eu adipisicing do. Pariatur nulla ea nostrud occaecat. Nulla adipisicing voluptate cillum reprehenderit incididunt cillum excepteur enim. Laboris aliquip eiusmod mollit nostrud proident sit. Et et non dolor irure do. Nisi ut Lorem elit dolore amet ea duis do laboris laborum qui nulla est ipsum."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
