import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Header from ".";
import { headerBody, headerNav } from "@config";

export default {
  title: "Header",
  component: Header,
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = args => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  bodySection: headerBody,
  navSection: headerNav,
};

export const Body = Template.bind({});
Body.args = {
  bodySection: headerBody,
};

export const Nav = Template.bind({});
Nav.args = {
  navSection: headerNav,
};
