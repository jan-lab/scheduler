import React from "react";
import Application from "components/Application";
import axios from "axios";
//import all of the queries from the "react-testing-library".
import { render, cleanup, fireEvent, waitForElement, getByText, getAllByTestId, prettyDOM } from "@testing-library/react";
import { getByAltText, getByPlaceholderText, queryByText, queryByAltText} from "@testing-library/react";


afterEach(cleanup);


describe("Application", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    //render the Application
    //destructure the getByText function returned by render - to use within the scope of the test
    const { getByText } = render(<Application />);

    //start a promise chain with waitForElement - wait to get the DOM element/node with the text "Monday"
    return waitForElement(() => getByText("Monday")).then(() => {
      //fire the click event on the "Tuesday" menu button
      fireEvent.click(getByText("Tuesday"));
      //verify that the text "Leopold Silvers" is in the document.
      expect(getByText("Leopold Silvers")).toBeInTheDocument()
    });
  });


  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    // 1. Render the Application and store the container value returned by render.
    //not to destructure the getByText function as we will use the one that is imported at the top. 
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
  
    // 5. Click the first interviewer in the list - recommended alt text for the InterviewerListItem image is the name of the interviewer.
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click the "Save" button on that same appointment.
    fireEvent.click(getByText(appointment, "Save"));

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
    
    //debug();
  });


  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application and store the container value returned by render.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
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
    // 1. Render the Application and store the container value returned by render.
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

     // 6. Check that the element with the text "Saving" is displayed.
     expect(getByText(appointment, /Saving/i)).toBeInTheDocument();

    /// 7. Wait until the element with the text "Lydia Miller-Jones" is displayed.
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));
    
    // 8. Check that the DayListItem with the text "Monday"  the same number of spots remaining as before".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();

    //debug();
  });
    

  it("shows the save error when failing to save an appointment", () => {
    //use mockRejectedValueOnce() because we want the mock to revert to the default behaviour after the single request that this test generates is complete. This replaces the mock from src/__mocks__/axios.js module temporarily, until the put function is called once.
    axios.put.mockRejectedValueOnce();
  });
  

  it("shows the delete error when failing to delete an existing appointment", () => {
    axios.delete.mockRejectedValueOnce();
  });

});
