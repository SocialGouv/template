import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Layout from "./";
import {
  headerBody,
  headerNav,
  footerBodySection,
  footerBottomSection,
  footerPartnerSection,
  footerTopSection,
} from "@config";

export default {
  title: "Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = args => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <p>Hello World</p>,
  headerProps: { bodySection: headerBody, navSection: headerNav },
  footerProps: {
    bodySection: footerBodySection,
    bottomSection: footerBottomSection,
    partnerSection: footerPartnerSection,
    topSection: footerTopSection,
  },
};
