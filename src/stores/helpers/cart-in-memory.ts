import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";

export function add(products: ProductCartProps[], newProduct: ProductProps) {
  const allreadyExists = products.find(({ id }) => newProduct.id === id);

  if (allreadyExists !== undefined) {
    return products.map((product) =>
      product.id === allreadyExists.id
        ? {
            ...product,
            quantity: product.quantity + 1,
          }
        : product
    );
  }

  return [...products, { ...newProduct, quantity: 1 }];
}
