import React from "react";
import { render, cleanup, fireEvent, waitForElement, getByText, getAllByTestId, prettyDOM } from "@testing-library/react";
//import all of the queries from the "react-testing-library".
import { getByAltText, getByPlaceholderText, queryByText, queryByAltText} from "@testing-library/react";
import Application from "components/Application";
/* somewhere near the top */
import axios from "axios";

afterEach(cleanup);

describe("Application", () => {

  //application loads without crashing and makes the requests to the API server to retrieve appointment data to display in the schedule. this new test is that it needs to be asynchronous. We want to wait for the fake API request to complete before we confirm that the data has loaded. Our fake data contains a record for a day with the text "Monday". Before we request the data from the API, we won't render any days. When we pass the data contained in the response through the component tree, the first list item will render the text "Monday". We can instruct our test to wait for the element with the text "Monday". We are using waitForElement to wait until we are able to get a DOM element with the text "Monday". The waitForElement function returns a promise that resolves when the callback returns a truthy value and rejects after a time out when it cannot find the specified text. When we return a Promise from the test function, the Jest framework knows that the test isn't complete until the promise chain has resolved or rejected. The argument we pass to waitForElement is a function that returns a DOM node. In this case, it is looking for something based on the text "Monday".

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);

    //Start a promise chain with waitForElement. The next operation in the promise chain should fire the click event on the "Tuesday" menu button and then verify that the text "Leopold Silvers" is in the document.
    return waitForElement(() => getByText("Monday")).then(() => {
        fireEvent.click(getByText("Tuesday"));
        expect(getByText("Leopold Silvers")).toBeInTheDocument()
      });
  });

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Add" button on the first empty appointment.
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    // 5. Click the first interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // console.log(prettyDOM(appointment));
    // debug();

    // 7. Check that the element with the text "Saving" is displayed.
    expect(getByText(appointment, /Saving/i)).toBeInTheDocument();
    
    // 8. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  
    // 9. Check that the DayListItem with the text "Monday" also has the text "no spots remaining".
    //Find the specific day node that contains the text "Monday". Import the getAllByTestId query to search the original container for the nodes with data-testid="day".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
    // console.log(prettyDOM(day));
  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    // "Are you sure you would like to delete?"
    expect(
      getByText(appointment, "Confirm?")
      ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, /Deleting/i)).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, "Add"));
    
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

    // debug();
  });
    

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Enter the name "Lydia Miller-Jones" into the input with the placeholder "Enter Student Name".
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    // 4. Click the second interviewer in the list.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 5. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));
    // console.log(prettyDOM(appointment));
    // debug();

     // 6. Check that the element with the text "Saving" is displayed.
     expect(getByText(appointment, /Saving/i)).toBeInTheDocument();

    /// 7. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    // 8. Check that the DayListItem with the text "Monday"  the same number of spots remaining as before".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

  
    debug();
  });
    
    
    /* test number five */
    //We use mockRejectedValueOnce() because we want the mock to revert to the default behaviour after the single request that this test generates is complete. This replaces the mock from our src/__mocks__/axios.js module temporarily, until the put function is called once.
  it("shows the save error when failing to save an appointment", () => {
    axios.put.mockRejectedValueOnce();
  });
  
  it("shows the delete error when failing to delete an existing appointment", () => {
    axios.delete.mockRejectedValueOnce();
  });




  // it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  //   //Render the application and store the container value returned by render. Then console.log the value of container.
  //   //Make sure not to destructure the getByText function, we will use the one that we import at the top. We can leave the "changes the schedule when a new day is selected" test alone since it only needs the getByText function within the scope of that test.
  //   const { container, debug } = render(<Application />);
  //   //Use the waitForElement function, and wait until after the element containing "Archie Cohen" renders. Use the async and await syntax learned
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   // console.log(container); //we call console.log(prettyDOM(container)) after the data loads. Review the updated console output.
  //   // console.log(prettyDOM(container));
  //   //is this the right place?
  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[0];
  //   // console.log(prettyDOM(appointments));
    
  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //     );
    
  //   // console.log(prettyDOM(day))

  //   //need to trigger three click events and an input change event.
  //   fireEvent.click(getByAltText(appointment, "Add"));
    
  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });
    
  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer")); //recommended alt text for the InterviewerListItem image is the name of the interviewer.
    
  //   //triggers the save operation
  //   fireEvent.click(getByText(appointment, "Save"));
    
  //   //???
  //   // debug();
  //   // console.log(prettyDOM(appointment));
    
  //   expect(getByText(appointment, /saving/i)).toBeInTheDocument(); 
  //   // expect(getByText(appointment, "Saving")).not.toBeInTheDocument();

  //   await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
  //   });

    

});
