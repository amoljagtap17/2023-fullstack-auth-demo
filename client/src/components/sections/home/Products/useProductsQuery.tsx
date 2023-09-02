import { productsServiceAPI } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const getProductsQuery = async () => {
  const { data } = await productsServiceAPI.get("/products");

  console.log("data::", data);

  return data;
};

export const useProductsQuery = () =>
  useQuery({ queryKey: ["products"], queryFn: getProductsQuery });
