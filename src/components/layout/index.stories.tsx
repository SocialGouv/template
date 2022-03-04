import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Layout from "./";
import {
  footerBodySection,
  footerBottomSection,
  footerPartnerSection,
  footerTopSection,
  headerProps,
} from "@config";

export default {
  title: "Layout",
  component: Layout,
} as ComponentMeta<typeof Layout>;

const Template: ComponentStory<typeof Layout> = args => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: <p>Hello World</p>,
  headerProps: headerProps,
  footerProps: {
    bodySection: footerBodySection,
    bottomSection: footerBottomSection,
    partnerSection: footerPartnerSection,
    topSection: footerTopSection,
  },
};
