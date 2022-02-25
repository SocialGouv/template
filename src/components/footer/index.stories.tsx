import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import Footer from "./";
import {
  footerBodySection,
  footerBottomSection,
  footerPartnerSection,
  footerTopSection,
} from "@config";

export default {
  title: "Footer",
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = args => <Footer {...args} />;

export const Default = Template.bind({});
Default.args = {
  bodySection: footerBodySection,
  bottomSection: footerBottomSection,
  partnerSection: footerPartnerSection,
  topSection: footerTopSection,
};

export const TopSection = Template.bind({});
TopSection.args = {
  topSection: footerTopSection,
};

export const BodySection = Template.bind({});
BodySection.args = {
  bodySection: footerBodySection,
};

export const PartnerSection = Template.bind({});
PartnerSection.args = {
  partnerSection: footerPartnerSection,
};

export const BottomSection = Template.bind({});
BottomSection.args = {
  bottomSection: footerBottomSection,
};
