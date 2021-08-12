/// <reference types="Cypress" />

describe("Appointments", () => {

  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    //visit the root of the web server
    cy.visit("/");
    //confirm that the DOM contains the text "Monday"
    // cy.contains("[data-testid=day]", "Tuesday")
    cy.contains("Monday");
   });


  it("should book an interview", () => {
    //click the add button for the empty appointment. Remember that cy.get() allows arguments that match the jQuery API.
    cy.get("[alt=Add]")
    //using .first because there are two Add buttons
      .first()
      .click();

    //type the name "Lydia Miller-Jones" into the student input field.
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //select the interviewer with the name "Sylvia Palmer".
    cy.get("[alt='Sylvia Palmer']").click();

    //click the save button.
    cy.contains("Save").click();

    //verify that we show the student and interviewer names within and element that has the ".appointment__card--show" class.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({force: true});
   
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    //select the interviewer with the name "Tori Malcolm".
    cy.get("[alt='Tori Malcolm']").click();

    //click the save button.
    cy.contains("Save").click();

    //verify that we show the student and interviewer names within and element that has the ".appointment__card--show" class.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  it("should cancel an interview", () => {
    cy.get("[alt=Delete]")
      .click({force: true});
   
    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
   
  });

});

 