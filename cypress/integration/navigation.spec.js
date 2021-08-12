describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    //1.visit the root of the web server
    cy.visit("/");
    //2.use the data-testid attribute that already exists on the day list item to target the second day in the test data
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      //check that the element has the day-list__item--selected class
      .should("have.class", "day-list__item--selected")
  });
});