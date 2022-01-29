// const it, cy;
// we ca also add custom commands

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3000/api/testing/reset");

    const user = {
      username: "asdf",
      name: "amudhan sowrirajan",
      password: "asdf",
    };

    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000/");
  });

  it("Login form is displayed", function () {
    cy.contains("Login");
    cy.contains("blogs");
  });

  it("try to login with the created user -> then logout -> login empty -> login wrong credentials", function () {
    cy.get("#loginUsername").type("asdf");
    cy.get("#loginPassword").type("asdf");
    cy.get("#loginButton").click();

    cy.contains("amudhan sowrirajan is logged in");
    cy.get("#logoutButton");

    // then logout with the log out button
    cy.get("#logoutButton").click();
    cy.get("#loginButton").click();
    cy.contains("Invalid Username or Password");

    //login with wrong credentials
    cy.get("#loginUsername").type("assadfsdfdf");
    cy.get("#loginPassword").type("asdfasdfasdf");
    cy.get("#loginButton").click();
    cy.contains("Invalid Username or Password");
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#loginUsername").type("asdf");
      cy.get("#loginPassword").type("asdf");
      cy.get("#loginButton").click();
    });

    it("A blog can be created", function () {
      cy.contains("Add New Blog").click();

      cy.get("#title").type("titleOf");
      cy.get("#author").type("authorOf");
      cy.get("#url").type("urlOf");
      cy.contains("Create").click();

      cy.contains("Title:titleOf Author: authorOf");
      cy.contains("View").click();
    });

    it("a logged in user can click the like button", function () {
      cy.contains("Add New Blog").click();

      cy.get("#title").type("titleOf");
      cy.get("#author").type("authorOf");
      cy.get("#url").type("urlOf");
      cy.contains("Create").click();
      cy.contains("View").click();
      // target the like button
      cy.contains("Like").click();
      cy.contains("Likes: 1");
      cy.contains("Like").click();
      cy.contains("Likes: 2");
    });

    it("the creator can delete a blog", function () {
      cy.contains("Add New Blog").click();

      cy.get("#title").type("titleOf");
      cy.get("#author").type("authorOf");
      cy.get("#url").type("urlOf");
      cy.contains("Create").click();
      cy.contains("View").click();

      cy.contains("delete blog (above)").click();
      cy.contains("Title:titleOf Author: authorOf").should("not.exist");
    });

    it("non-owner cannot create delete a blog", function () {
      cy.contains("Add New Blog").click();

      cy.get("#title").type("titleOf");
      cy.get("#author").type("authorOf");
      cy.get("#url").type("urlOf");
      cy.contains("Create").click();

      cy.contains("View").click();

      cy.get("#logoutButton").click();

      cy.contains("delete blog (above)").click();
      cy.contains("Title: titleOf");
    });

    it("the blogs are order by likes", function () {
      //add two new blogs - both have likes -0
      cy.contains("Add New Blog").click();
      cy.get("#title").type("titleOf");
      cy.get("#author").type("authorOf");
      cy.get("#url").type("urlOf");
      cy.contains("Create").click();

      cy.wait(1000);

      cy.contains("Add New Blog").click();
      cy.get("#title").type("titleOfOf");
      cy.get("#author").type("authorOfOf");
      cy.get("#url").type("urlOfOf");
      const response = cy.contains("Create").click();
      console.log(response.data);

      cy.wait(1000);

      // click the lower view button and render full and click the like button to increase the likes value
      cy.get(".showFullBlog").eq(1).click();
      cy.wait(100);
      cy.contains("Like").click();

      cy.wait(1000);

      // it should now be the first blog index-0 and we close it
      cy.get(".showFullBlog").eq(0).click();
      // above shoud close the blog at the top (highest likes -1)
      cy.wait(1000);
      // open the second blog to that has 0 likes and has title/author
      cy.get(".showFullBlog").eq(1).click();
      cy.contains("Likes: 0");
      cy.contains("Title: titleOf");
    });
  });
});
