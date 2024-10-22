import Input from "./Input";
import { useQuery } from "react-query";
import { ProductProps } from "../interfaces/Product";
import ProductService from "../services/product.service";
import { ChangeEvent, useState } from "react";

const Header = () => {  
  const [productName, setProductName] = useState("");
  /*documentacao do react query
    https://tanstack.com/query/latest/docs/framework/react/overview
   */
  const {
    data: productsByName,
    error,
    isLoading,
  } = useQuery<ProductProps[], Error>(
   [ "query-search-by-name", productName],
    async () => {
      return await ProductService.searchName(productName);
    },
    {
        enabled: productName.length > 0,
    }
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
  };

  return (
    <header className="flex fixed justify-center top-0 right-0 w-full bg-white py-3">
      <div className="mx-auto flex items-center justify-between w-11/12 gap-52">
        <div>
          <a href="/">
            <img
              src="/assets/logo.png"
              alt="Company logo"
              className="max-w-36"
            />
          </a>
        </div>
        <div className="w-4/5">
          <Input onChange={(e) => handleInput(e)} />
          <ul>
            {productsByName?.map((product: ProductProps) => {
              return <li>{product.name}</li>;
            })}
          </ul>
        </div>
        <div>ShoppingCart</div>
      </div>
    </header>
  );
};

export default Header;
