//Tests of creating, editing, and deleting an appointment
describe("Appointments", () => {

  //Before each of the individual tests
  beforeEach(() => {
    //1.reset the database before each test
    cy.request("GET", "/api/debug/reset");

    //2.visit the root of the web server
    cy.visit("/");

    //3.confirm that the DOM contains the text "Monday"
    cy.contains("Monday");
   });

   
  it("should book an interview", () => {
    //1.click the add button for the empty appointment
    cy.get("[alt=Add]")
    //use .first because there are two Add buttons
      .first()
      .click();

    //2.type the name "Lydia Miller-Jones" into the student input field
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //3.select the interviewer with the name "Sylvia Palmer"
    cy.get("[alt='Sylvia Palmer']").click();

    //4.click the save button
    cy.contains("Save").click();

    //5.verify that we show the student and interviewer names within the element with the ".appointment__card--show" class name
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });


  it("should edit an interview", () => {
    //1.click the edit button
    cy.get("[alt=Edit]")
      .first()
      //use {force: true} because edit button is only revealed when we hover over the appointment. When we try and click on it, it will start "waiting for actionability". We want to force the action and disable "waiting for actionability".
      .click({force: true});
    
    //2.clear the input field and type the new student name
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");

    //3.select the interviewer with the name "Tori Malcolm".
    cy.get("[alt='Tori Malcolm']").click();

    //4.click the save button
    cy.contains("Save").click();

    //5.verify that we show the student and interviewer names within the element with the ".appointment__card--show" class name.
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });


  it("should cancel an interview", () => {
    //1.click the delete button of the appointment for Archie Cohen 
    cy.get("[alt=Delete]")
      .click({force: true});
   
    //2.click the Confirm button
    cy.contains("Confirm").click();

    //3.verify that the Deleting status shows
    cy.contains("Deleting").should("exist");

    //4.verify that the Deleting status no long shows
    cy.contains("Deleting").should("not.exist");

    //5.verify that the appointment for Archie Cohen no longer exists
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });

});

 