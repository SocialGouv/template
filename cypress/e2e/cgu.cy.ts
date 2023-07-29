describe("CGU page", () => {
  it("should render the page", () => {
    cy.visit("http://localhost:3000/cgu");
    cy.get("h1").should("contain", "Conditions générales d'utilisation");
    cy.get("h2").should("contain", "Absence de garantie");
  });
});
