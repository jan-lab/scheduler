//we are rendering `<Appointment />` down below, so we need React.createElement
import React from "react";

//import our helper functions from the react-testing-library - The render function allows us to render Components
import { render } from "@testing-library/react";

//import the component that we are testing
import Appointment from "components/Appointment";

//A test that renders a React Component - use the describe function to group the Appointment component tests
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});

