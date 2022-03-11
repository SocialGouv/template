import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StatsTile } from "./tile";

export default {
  title: "StatsTile",
  component: StatsTile,
} as ComponentMeta<typeof StatsTile>;

const Template: ComponentStory<typeof StatsTile> = args => (
  <StatsTile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Nombre de visites",
  stats: "1.000.000",
  description: "C'est le nombre d'utilisateur unique ayant visité le site",
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  title: "Nombre de visites",
  stats: "1.000.000",
  description: "C'est le nombre d'utilisateur unique ayant visité le site",
};
