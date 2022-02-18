/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

describe("Basic spec", () => {
  it("should render the main page", () => {
    cy.visit("http://localhost:3000/");
  });
});
