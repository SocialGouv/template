describe("Accessibilité page", () => {
  it("should render the page", () => {
    cy.visit("http://localhost:3000/accessibilite");
    cy.get("h1").should("contain", "Déclaration d’accessibilité");
    cy.get("h2").should("contain", "Amélioration et contact");
  });
});
