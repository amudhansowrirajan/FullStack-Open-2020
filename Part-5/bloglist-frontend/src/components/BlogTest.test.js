import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
// import { prettyDOM } from '@testing-library/dom' // for displayingthe component in its entirity.
import Blog from "./Blog";

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
      <Blog
        blog={newBlog}
        likeButton={likeButton}
        deleteButton={deleteButton}
      />
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
    // component.debug();
  });

  test("the fullBlog is rendered when clicking the show button and removed when the hide button is clicked again", () => {
    const button = component.container.querySelector(".showFullBlog");

    fireEvent.click(button);

    const element = component.container.querySelector(".TestBlogFullBlog");
    const blogLikeButton = component.container.querySelector(".TestLikeButton");
    expect(element).toBeDefined();
    expect(blogLikeButton).toBeDefined();

    // check title,author and URL
    expect(element).toHaveTextContent("TitleOf");
    expect(element).toHaveTextContent("AuthorOf");
    expect(element).toHaveTextContent("URL of");
    expect(element).toHaveTextContent("Likes:"); // wont contain a 0 because the it is added with server side validation.

    // component.debug();

    //the hide button exist
    fireEvent.click(button);
    const element2 = component.container.querySelector(".TestBlogBlurb");
    expect(element2).toBeDefined();
  });

  test("the likes function is called when the like button is clicked - twice", () => {
    const button = component.container.querySelector(".showFullBlog");

    fireEvent.click(button);

    const blogLikeButton = component.container.querySelector(".TestLikeButton");

    expect(blogLikeButton).toBeDefined();

    fireEvent.click(blogLikeButton);
    expect(likeButton.mock.calls).toHaveLength(1);
    fireEvent.click(blogLikeButton);
    expect(likeButton.mock.calls).toHaveLength(2);
  });
});
