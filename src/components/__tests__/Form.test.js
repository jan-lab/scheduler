import React from "react";
//import our helper functions from the react-testing-library
import { render, cleanup, fireEvent, prettyDOM, getByTestId } from "@testing-library/react";
//import the Form component
import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {

  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];


  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
      );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });


  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} student="Lydia Miller-Jones" />
      );

    expect(getByTestId("student-name-input")).toHaveValue("Lydia Miller-Jones");
  });


  it("validates that the student name is not blank", () => {
    // 1. Create the mock onSave function
    const onSave = jest.fn();

    // 2. Render the Form with interviewers and the onSave mock function passed as an onSave prop
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
    // 3. Click the save button
    fireEvent.click(getByText("Save"));

    // 4. Verify that the error msg shows up and does not allow the user to save
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });
  

  it("can successfully save after trying to submit an empty student name", () => {
    // 1. Create the mock onSave function
    const onSave = jest.fn();

    //2. Render the Form with interviewers and the onSave mock function passed as an onSave prop
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    //3. Click the save button
    fireEvent.click(getByText("Save"));
      
    // 4. Verify that the error msg shows up and does not allow the user to save
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    // 5. Enter the valid input in the student name field
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 6. Click the save button
    fireEvent.click(getByText("Save"));

    // 7. Confirm that we do not show the error message after we click the "Save" with a valid input value
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    
    // 8. Confirm that the schedule has been saved
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });


  it("calls onCancel and resets the input field", () => {
    // 1. Create the mock onCancel function
    const onCancel = jest.fn();

    // 2. Render the Form with interviewers, student, onSave mock function, onCancel mock function passed as props
    const { getByText, getByPlaceholderText, queryByText, container } = render(
      <Form
        interviewers={interviewers}
        student="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
    // 3. Click on the save button
    fireEvent.click(getByText("Save"));
    
    // 4. Change the student name
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
    
    // 5. Click on the cancel button
    fireEvent.click(getByText("Cancel"));
  
    // 6. Confirm that we do not show the error message after we click the "Cancel" button
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
    
    // 7. Confirm that the schedule has been cancelled
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});

