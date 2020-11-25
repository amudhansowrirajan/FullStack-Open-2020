import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";
import Toggalable from "./Togglable";

describe("BLOG testing ", () => {
  let component;
  const likeButton = jest.fn();
  const deleteButton = jest.fn();

  beforeEach(() => {
    const newBlog = {
      author: "AuthorOf",
      title: "TitleOf",
      url: "URL of",
    };
    component = render(
      <Toggalable name={"show"}>
        <Blog
          blog={newBlog}
          likeButton={likeButton}
          deleteButton={deleteButton}
        />
      </Toggalable>
    );
  });

  test("only author and title should be visibile initally", () => {
    expect(component.container).toHaveTextContent("TitleOf");
    expect(component.container).toHaveTextContent("AuthorOf");

    //  if the element is visible initially then URL is also not being rendered
    const element = component.container.querySelector(".TestBlogBlurb");
    expect(element).toBeDefined();

    // chack if the button is also being rendered
    const button = component.container.querySelector("button");
    expect(button).toBeDefined();
    component.debug();
  });

  test("the fullBlog is rendered when clicking the show button", () => {
    const button = component.container.querySelector("button");

    fireEvent.click(button);

    const element = component.container.querySelector(".TestBlogFullBlog");
    expect(element).toBeDefined();

    // check title,author and URL
    expect(component.container).toHaveTextContent("TitleOf");
    expect(component.container).toHaveTextContent("AuthorOf");
    expect(component.container).toHaveTextContent("URL of");

    component.debug();
  });
});
