import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Head } from "./head";

export default {
  title: "Header",
  component: Head,
} as ComponentMeta<typeof Head>;

const Template: ComponentStory<typeof Head> = args => <Head {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Random title",
  textLead: "Random text lead",
  description: "Random description",
  image: {
    src: "https://via.placeholder.com/600x400",
    alt: "Random image",
  },
};
