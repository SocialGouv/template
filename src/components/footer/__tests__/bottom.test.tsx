import { render, screen } from "@testing-library/react";
import { Bottom } from "../bottom";

describe("Bottom", () => {
  it("renders copyright", async () => {
    const copyright = "© République Française 2022";
    render(
      <Bottom copyright={copyright} links={[{ href: "/", title: "Yo" }]} />
    );
    expect(screen.getByText(copyright)).toBeDefined();
  });
});
