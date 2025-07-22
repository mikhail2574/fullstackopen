const { test, expect } = require("@playwright/test");
const axios = require("axios");

const apiUrl = "http://localhost:3003/api";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page }) => {
    await axios.post(`${apiUrl}/testing/reset`);
    await axios.post(`${apiUrl}/users`, {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    });
    await page.goto("/");
  });

  test("5.17: Login form is shown", async ({ page }) => {
    await expect(page.getByPlaceholder("Username")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();
  });

  test.describe("5.18: Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByPlaceholder("Username").fill("mluukkai");
      await page.getByPlaceholder("Password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
      await expect(
        page.locator("text=Matti Luukkainen logged in")
      ).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByPlaceholder("Username").fill("mluukkai");
      await page.getByPlaceholder("Password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.locator(".error")).toContainText("wrong credentials");
    });
  });

  test.describe("5.19–5.23: When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByPlaceholder("Username").fill("mluukkai");
      await page.getByPlaceholder("Password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("5.19: user can create a blog", async ({ page }) => {
      await page.getByText("create new blog").click();
      await page.getByPlaceholder("title").fill("Test Blog");
      await page.getByPlaceholder("author").fill("Author");
      await page.getByPlaceholder("url").fill("http://test.com");
      await page.getByRole("button", { name: "create" }).click();
      await expect(page.locator("text=Test Blog")).toBeVisible();
    });

    test("5.20: user can like a blog", async ({ page }) => {
      await createBlog(page, "Like Me", "Liker", "http://like.com");
      await page.getByText("view").click();
      await page.getByText("like").click();
      await expect(page.locator("text=likes 1")).toBeVisible();
    });

    test("5.21: user can delete a blog", async ({ page }) => {
      await createBlog(page, "Delete Me", "Deleter", "http://delete.com");
      await page.getByText("view").click();
      page.once("dialog", (dialog) => dialog.accept());
      await page.getByText("remove").click();
      await expect(page.locator("text=Delete Me")).toHaveCount(0);
    });

    test("5.22: only creator sees delete button", async ({ browser }) => {
      const context1 = await browser.newContext();
      const page1 = await context1.newPage();

      await page1.goto("/");
      await page1.getByPlaceholder("Username").fill("mluukkai");
      await page1.getByPlaceholder("Password").fill("salainen");
      await page1.getByRole("button", { name: "login" }).click();
      await createBlog(page1, "User1 Blog", "Author", "http://auth1.com");
      await page1.close();

      const context2 = await browser.newContext();
      const page2 = await context2.newPage();
      await axios.post(`${apiUrl}/users`, {
        username: "user2",
        name: "Second User",
        password: "pass2",
      });

      await page2.goto("/");
      await page2.getByPlaceholder("Username").fill("user2");
      await page2.getByPlaceholder("Password").fill("pass2");
      await page2.getByRole("button", { name: "login" }).click();
      await page2.getByText("view").click();
      await expect(page2.getByText("remove")).toHaveCount(0);

      await context2.close();
    });

    test("5.23: blogs are ordered by likes descending", async ({ page }) => {
      await createBlog(page, "Least Likes", "A", "url1", 1);
      await createBlog(page, "Medium Likes", "B", "url2", 3);
      await createBlog(page, "Most Likes", "C", "url3", 5);

      const titles = await page.locator(".blogTitle").allTextContents();
      expect(titles[0]).toContain("Most Likes");
      expect(titles[1]).toContain("Medium Likes");
      expect(titles[2]).toContain("Least Likes");
    });
  });
});

// helper
async function createBlog(page, title, author, url, likes = 0) {
  await page.getByText("create new blog").click();
  await page.getByPlaceholder("title").fill(title);
  await page.getByPlaceholder("author").fill(author);
  await page.getByPlaceholder("url").fill(url);
  await page.getByRole("button", { name: "create" }).click();

  if (likes > 0) {
    await page.getByText("view").last().click();
    for (let i = 0; i < likes; i++) {
      await page.getByText("like").click();
    }
  }
}
