import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Testimonial } from "./testimonial";

export default {
  title: "Testimonial",
  component: Testimonial,
} as ComponentMeta<typeof Testimonial>;

const Template: ComponentStory<typeof Testimonial> = args => (
  <Testimonial {...args} />
);

export const Default = Template.bind({});
Default.args = {
  description: "Random description",
  image: {
    src: "https://via.placeholder.com/600x400",
    alt: "Random image",
  },
  link: {
    href: "https://www.google.com",
    title: "Random link",
  },
};
