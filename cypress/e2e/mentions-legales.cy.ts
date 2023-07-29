describe("Mentions légales page", () => {
  it("should render the page", () => {
    cy.visit("http://localhost:3000/mentions-legales");
    cy.get("h1").should("contain", "Mentions légales");
    cy.get("h2").should("contain", "Hébergement du site");
  });
});
