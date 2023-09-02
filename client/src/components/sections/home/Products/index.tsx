import { useProductsQuery } from "./useProductsQuery";

export function Products() {
  const productsQuery = useProductsQuery();

  console.log("productsQuery::", productsQuery.data);

  return <h1>Products!</h1>;
}
