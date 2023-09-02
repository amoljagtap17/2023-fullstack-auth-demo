import axios from "axios";

axios.defaults.withCredentials = true;

const productsServiceAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCTS_SERVICE_API as string,
});

export { productsServiceAPI };
