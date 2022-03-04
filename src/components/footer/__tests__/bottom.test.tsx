import { render, screen } from "@testing-library/react";
import { Bottom } from "../bottom";

describe("Bottom", () => {
  it("renders version", async () => {
    const version = "1.0.0";
    render(
      <Bottom
        version={version}
        commitHash="master"
        repositoryUrl="https://github.com/SocialGouv/template"
        links={[{ href: "/", title: "Yo" }]}
      />
    );
    expect(screen.getByText(version)).toBeDefined();
  });
});
