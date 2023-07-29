describe("Healthz page", () => {
  it("should render the page", () => {
    cy.visit("http://localhost:3000/healthz");
    cy.get("h1").should("contain", "App is up and running");
  });
});
