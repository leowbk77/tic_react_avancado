import Input from "./Input";
import { useQuery } from "react-query";
import { ProductProps } from "../interfaces/Product";
import ProductService from "../services/product.service";
import { ChangeEvent, useRef, useState } from "react";
import SearchListItem from "./SearchListItem";
import { useOnClickOutside } from "../hooks/useClickOutside";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import authService from "../services/auth.service";

const Header = () => {  
  const {totalQtd} = useShoppingCart();
  const [productName, setProductName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const refDropDown = useRef<HTMLUListElement>(null);

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
        onSuccess: (res) => {
          setIsOpen(res?.length > 0);
        }
    }
  );

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setProductName(value);
  };

  useOnClickOutside(refDropDown, () => {
    setIsOpen(false);
  });

  /*O codigo aqui virou realmente um macarrão
    Podia ter componentizado melhor
    Tendencia é piorar com a adicao das funcoes de service
   */
  return (
    <header className="flex fixed justify-center top-0 right-0 w-full bg-white py-3">
      <div className="mx-auto flex items-center justify-between w-11/12 gap-52">
        <div>
          <Link to="/" relative="path">
            <img
              src="/assets/logo.png"
              alt="Company logo"
              className="max-w-36"
            />
          </Link>
        </div>
        <div className="w-4/5 relative">
          <Input onChange={(e) => handleInput(e)} />
          {
            isOpen && 
            <ul ref={refDropDown} className="absolute z-50 mt-4 max-h-60 w-full overflow-auto rounded-md bg-white p-4 shadow-lg">
            {productsByName?.map((product: ProductProps) => {
              return (
              <SearchListItem className="items-center justify-between">
                {product.name}
                <div>
                  <img src={`/assets/items/${product.image}.jpg`} className="h-20 rounded-t-lg object-cover" />
                  <span>{product.price}</span>
                </div>
              </SearchListItem>);
            })}
            </ul>
          }
          
        </div>
        <div className="flex justify-center items-center">

          <Link className="flex" to="/cart" relative="path">
            <CiShoppingCart className="h-12 w-20"/>
            {
              totalQtd > 0 && (
                <div className="relative right-8 flex size-6 justify-center rounded-3xl bg-blue-400">
                  <span>{totalQtd}</span>
                </div>
              )
            }
          </Link>
          {!(authService.getLoggedUser() == null) && (
            <span className="cursor-pointer" onClick={() => {authService.cleanLoggedUser(); window.location.reload()}}>Logout</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
