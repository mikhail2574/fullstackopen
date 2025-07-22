import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";
import { test, expect } from "node:test";

test("BlogForm calls createBlog with correct data", async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  await user.type(screen.getByLabelText(/title:/i), "My Blog");
  await user.type(screen.getByLabelText(/author:/i), "Me");
  await user.type(screen.getByLabelText(/url:/i), "http://blog.com");

  await user.click(screen.getByText("create"));

  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith({
    title: "My Blog",
    author: "Me",
    url: "http://blog.com",
  });
});
