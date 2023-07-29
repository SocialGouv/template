describe("Stats page", () => {
  it("should render the page", () => {
    cy.visit("http://localhost:3000/stats");
    cy.get("h1").should("contain", "Statistiques d'utilisation");
  });
});
