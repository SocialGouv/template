import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { StatTile } from "./StatTile";

export default {
  title: "StatsTile",
  component: StatTile,
} as ComponentMeta<typeof StatTile>;

const Template: ComponentStory<typeof StatTile> = (args) => (
  <StatTile {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Nombre de visites",
  stats: "1.000.000",
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  title: "Nombre de visites",
  stats: "1.000.000",
  description: "C'est le nombre d'utilisateur unique ayant visité le site",
};
