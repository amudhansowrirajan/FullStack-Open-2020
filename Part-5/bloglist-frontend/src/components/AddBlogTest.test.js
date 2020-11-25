import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import AddBlog from "./AddBlog";

describe("ADDBLOG - testing", () => {
  let component;
  const createBlog = jest.fn();

  beforeEach(() => {
    component = render(<AddBlog submitTo={createBlog} />);
  });

  test("the title, author, url input fields exist", () => {
    const author = component.container.querySelector("#author");
    const title = component.container.querySelector("#title");
    const url = component.container.querySelector("#url");

    expect(author).toBeDefined();
    expect(title).toBeDefined();
    expect(url).toBeDefined();
  });

  test("insert values into all  input field and submit", () => {
    const form = component.container.querySelector("form");
    const author = component.container.querySelector("#author");
    const title = component.container.querySelector("#title");
    const url = component.container.querySelector("#url");

    fireEvent.change(author, {
      target: {
        value: "Adding Author",
      },
    });
    fireEvent.change(title, {
      target: {
        value: "TitleOf",
      },
    });
    fireEvent.change(url, {
      target: {
        value: "urlOf",
      },
    });

    // component.debug();
    fireEvent.submit(form);
    expect(createBlog.mock.calls).toHaveLength(1);
    // expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )
    // console.log(createBlog.mock.calls[0][0]);
    expect(createBlog.mock.calls[0][0].title).toBe("TitleOf");
    expect(createBlog.mock.calls[0][0].author).toBe("Adding Author");
    expect(createBlog.mock.calls[0][0].url).toBe("urlOf");
  });
});
