import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Declaration from "./";

export default {
  title: "Déclaration d'accessibilité",
  component: Declaration,
} as ComponentMeta<typeof Declaration>;

const Template: ComponentStory<typeof Declaration> = (args) => (
  <Declaration {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const SomeDeclaration = Template.bind({});
SomeDeclaration.args = {
  produit: "NOUVEAU PRODUIT",
  organisme: "SERVICE DE XXXXXXX",
  email: "contact@example.fr",
  conformite: "partiellement conforme",
  audited: true,
};
