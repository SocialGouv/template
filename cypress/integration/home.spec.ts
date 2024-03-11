describe("Home page", () => {
  it("should render the main page", () => {
    cy.visit("http://localhost:3000/");
    cy.title().should("equal", "Template | beta.gouv.fr");
    cy.get("h1").should("equal", "Template");
  });
});
