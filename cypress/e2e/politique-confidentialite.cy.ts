describe("Politique de confidentialité page", () => {
  it("should render the page", () => {
    cy.visit("http://localhost:3000/politique-confidentialite");
    cy.get("h1").should("contain", "Politique de confidentialité");
    cy.get("h2").should(
      "contain",
      "Traitement des données à caractère personnel"
    );
    cy.get("h2").should("contain", "Cookies");
  });
});
