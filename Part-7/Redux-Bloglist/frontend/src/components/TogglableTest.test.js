import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Togglable from "./Togglable";

describe("<TOGGLABLE /> testing- view option", () => {
  let component;

  beforeEach(() => {
    component = render(
      <Togglable name="Show">
        <div className="testDiv"></div>
      </Togglable>
    );
  });

  test("renders its children", () => {
    expect(component.container.querySelector(".testDiv")).toBeDefined();
  });

  test("at start the children are not displayed", () => {
    const div = component.container.querySelector(".TestTogglable");

    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", () => {
    const button = component.getByText("Show");
    fireEvent.click(button);

    const div = component.container.querySelector(".TestTogglable");
    expect(div).not.toHaveStyle("display: none");
  });
});
