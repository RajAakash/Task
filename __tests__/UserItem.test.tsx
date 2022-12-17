import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import UsersItem from "../components/UserItem";

describe("Given UserItem component", () => {
  it("When passing isFavorite true, heartIcon is red", () => {
    const mockProps = {
      userDetails: jest.fn(),
      handleEdit: jest.fn(),
      handleDelete: jest.fn(),
      isFavorite: true,
      handleFavorite: jest.fn(),
    };
    render(<UsersItem {...mockProps} />);
    const favoriteIcon = screen.getByRole("img", {
      name: /favoriteicon/i,
    });

    expect(favoriteIcon).toHaveStyle({ color: "red" });
  });

  it("When passing isFavorite false, heartIcon is black", () => {
    const mockProps = {
      userDetails: jest.fn(),
      handleEdit: jest.fn(),
      handleDelete: jest.fn(),
      isFavorite: false,
      handleFavorite: jest.fn(),
    };
    render(<UsersItem {...mockProps} />);
    const favoriteIcon = screen.getByRole("img", {
      name: /favoriteicon/i,
    });

    expect(favoriteIcon).toHaveStyle({ color: "black" });
  });

  it("When clicking edit icon, edit function is called", async () => {
    const mockProps = {
      userDetails: jest.fn(),
      handleEdit: jest.fn(),
      handleDelete: jest.fn(),
      isFavorite: false,
      handleFavorite: jest.fn(),
    };
    render(<UsersItem {...mockProps} />);

    const editIcon = screen.getByRole("img", {
      name: /edit/i,
    });

    await act(async () => {
      await userEvent.click(editIcon);
    });
    expect(mockProps.handleEdit).toBeCalledTimes(1);
  });
});
