import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MentionPart } from "./part";

export default {
  title: "MentionPart",
  component: MentionPart,
} as ComponentMeta<typeof MentionPart>;

const Template: ComponentStory<typeof MentionPart> = args => (
  <MentionPart {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Random title",
  description:
    "Non id incididunt labore enim amet cupidatat et quis in tempor ipsum ad velit cillum.",
};

export const WithChildren = Template.bind({});
WithChildren.args = {
  title: "Random title",
  description:
    "Non id incididunt labore enim amet cupidatat et quis in tempor ipsum ad velit cillum.",
  children: <div>Hello world</div>,
};
