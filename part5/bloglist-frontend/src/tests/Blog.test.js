import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import { test, expect } from "node:test";

const blog = {
  title: "Test blog",
  author: "Test author",
  url: "http://test.com",
  likes: 5,
  user: {
    username: "testuser",
    name: "Test User",
  },
};

test("renders title and author but not url or likes by default", () => {
  render(<Blog blog={blog} user={{ username: "testuser" }} />);

  const summary = screen.getByText(/Test blog Test author/i);
  expect(summary).toBeDefined();

  const details = screen.queryByText(/http:\/\/test.com/i);
  expect(details).toBeNull();

  const likes = screen.queryByText(/likes 5/i);
  expect(likes).toBeNull();
});

test("renders url and likes after clicking the view button", async () => {
  const user = userEvent.setup();
  render(<Blog blog={blog} user={{ username: "testuser" }} />);

  const button = screen.getByText("view");
  await user.click(button);

  expect(screen.getByText("http://test.com")).toBeDefined();
  expect(screen.getByText("likes 5")).toBeDefined();
});

test("like button calls event handler twice if clicked twice", async () => {
  const mockHandler = jest.fn();
  const user = userEvent.setup();

  render(
    <Blog
      blog={blog}
      user={{ username: "testuser" }}
      handleLike={mockHandler}
    />
  );

  await user.click(screen.getByText("view"));
  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
