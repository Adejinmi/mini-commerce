import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard, { Product } from "@/components/ProductCard";

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
  },
}));

const addMock = jest.fn();
jest.mock("@/store/cart", () => ({
  useCart: () => addMock,
}));

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  slug: "test-product",
  image: "/test.jpg",
  price: 99.99,
  description: "This is a test product",
};

describe("ProductCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product details correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("adds product to cart on button click", () => {
    render(<ProductCard product={mockProduct} />);
    const button = screen.getByRole("button", { name: /add to cart/i });

    fireEvent.click(button);
    expect(addMock).toHaveBeenCalledWith(mockProduct);
  });
});
