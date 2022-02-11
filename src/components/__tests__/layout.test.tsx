import { Layout } from "@components";
import { render, screen } from "@testing-library/react";

describe("Layout", () => {
  it("renders copyright", async () => {
    render(
      <Layout>
        <div />
      </Layout>
    );
    expect(screen.getAllByText("© République Française 2022")).toBeDefined();
  });
});
