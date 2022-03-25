describe("Home page", () => {
  it("should render the main page", () => {
    cy.visit("http://localhost:3000/");
    cy.get("h1").should("contain", "Template");
    cy.get("h2").should("contain", "Aute");
  });
});
