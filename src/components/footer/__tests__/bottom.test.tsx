import { render, screen } from "@testing-library/react";
import { Bottom } from "../bottom";

describe("Footer - Bottom", () => {
  it("renders version", async () => {
    const version = "1.0.0";
    render(
      <Bottom
        version={version}
        commitHash="main"
        repositoryUrl="https://github.com/SocialGouv/template"
        links={[{ href: "/", title: "Yo" }]}
        hasSwitchMode={false}
      />
    );
    expect(screen.getByText(/Version/i)).toHaveTextContent(version);
  });
});
