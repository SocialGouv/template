import { MentionPart } from "@components";
import type { NextPage } from "next";
import { NextSeo } from "next-seo";
import React from "react";

const Cgu: NextPage = () => {
  return (
    <>
      <NextSeo
        title="Template | Conditions générales d'utilisation"
        description="Conditions générales d'utilisation de l'application template."
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
          },
        ]}
      />
      <div className="fr-container fr-my-6w">
        <h1>Conditions générales d&apos;utilisation</h1>
        <div>
          <MentionPart
            title="Présentation"
            description="Template est une application de template. Le code du logiciel est libre, et peut donc être vérifié et amélioré par toutes et tous."
          />
          <MentionPart
            title="Vocabulaire"
            description="« Nous » se réfère à l’éditeur de Template, « Vous » se réfère à un·e usager de Template, « Partenaires » se réfère aux organismes responsables d’attribuer les aides calculées par Template."
          />
          <MentionPart
            title="Absence de garantie"
            description="Les résultats fournis par ce service ont une valeur informative et ne représentent en aucun cas un diagnostic médical. Nous ne garantissons pas l’exactitude du contenu des sites externes vers lesquels nous redirigeons la navigation. Ces sites ne sont pas non plus régis par les mêmes conditions d’utilisation, notamment en ce qui concerne leur traitement des données à caractère personnel. Nous mettons Template à disposition sans garantie sur sa disponibilité, en « best effort ». Cela signifie que d’éventuelles indisponibilités n’ouvriront pas droit à compensation financière."
          />
          <MentionPart
            title="Vos données"
            description="Nous nous engageons à ne jamais exploiter les informations que vous nous transmettrez dans un but commercial ou publicitaire. De manière générale, Template n’accepte aucune forme de publicité autre que celle que constitue la présentation des aides des partenaires. Nous collectons également des données anonymes d’audience, indépendamment des suivis de consommation effectués. Cela nous permet par exemple de déterminer la durée d’un suivi et les pages à améliorer en priorité. Nous nous engageons à prendre toutes les mesures nécessaires pour garantir la sécurité et la confidentialité des informations que vous nous fournissez. Les situations enregistrées sont enregistrées dans un centre de données sécurisé. Seules nos équipes techniques et celles de nos partenaires peuvent y accéder."
          />
          <MentionPart
            title="Évolutions"
            description="Nous pouvons faire évoluer Template sans information préalable. Nous ajoutons régulièrement des aides, améliorons l’interface et modifions des formulations sur la base de vos retours et des évolutions réglementaires. Nous pouvons suspendre l’accès à Template sans information préalable, notamment pour des raisons de maintenance. Nous mettons l’application à jour plusieurs fois par semaine. L’indisponibilité ne dépasse généralement pas une dizaine de secondes. Nous pouvons amender ces conditions d’utilisation. Tout l’historique de ces conditions est librement accessible."
          />
          <MentionPart
            title="Utilisation"
            description="Son utilisation est gratuite et facultative. Si vous effectuez un suivi de votre consommation, vous acceptez ces conditions d’utilisation. Comme indiqué dans l’article L. 112-9 du code des relations entre le public et l’administration. L’utilisation de Template requiert une connexion internet et un smartphone récent. Nous nous réservons le droit de bloquer, sans information préalable ni compensation financière, les usages mettant en péril l’utilisation du logiciel par d’autres usagers. Cela nous permet d’anticiper d’éventuelles attaques par déni de service."
          />
        </div>
      </div>
    </>
  );
};

export default Cgu;
