import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Tile } from "./tile";

export default {
  title: "Tile",
  component: Tile,
} as ComponentMeta<typeof Tile>;

const Template: ComponentStory<typeof Tile> = args => <Tile {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Random title",
  description: "Random description",
  image: {
    src: "https://via.placeholder.com/600x400",
    alt: "Random image",
  },
  href: "https://www.fabrique.social.gouv.fr/",
};
