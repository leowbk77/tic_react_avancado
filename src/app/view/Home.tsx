import {useQuery} from 'react-query';
import Card from "../components/Card";
import ProductService from "../services/product.service";
import { ProductProps } from "../interfaces/Product";
import { useState } from 'react';
import Button from '../components/Button';
import SearchListItem from '../components/SearchListItem';
import { tv } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

const menuListVariants = tv({
    variants: {
        variant: {
            menuList: "absolut z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg",
        },
    },
    defaultVariants: {
        variant: "menuList"
    }
});

const Home = () => {
    const [typeFilter, setTypeFilter] = useState("");
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    //opcoes de ordenacao do popup
    const listOptionsFilter = [{
        value: "desc",
        name: "Maior preco",
        class: "flex justify-center items-center"
    }, {
        value: "asc",
        name: "Menor preco",
        class: "flex justify-center w-full"
    }];

    const {
        data: products,
        error,
        isLoading,
    } = useQuery<ProductProps[], Error>(["query-products", typeFilter], async () => {
        return await ProductService.findAll(typeFilter);
    });
        
    const handleFilter = (value: string) => {
        setTypeFilter(value);
    };

    const handleFilterButton = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const menuListClasses = twMerge(menuListVariants(), isOpenMenu ? "flex items-center flex-col absolute top-60 bg-white rounded-md p-4 shadow-lg shadow-black w-44" : "hidden");

    return (<div className="mt-32 h-4/5 w-full flex flex-col items-center justify-content gap-16">
                <div className="flex w-4/5 flex-col items-end">
                    <Button className="w-24" onClick={() => handleFilterButton()}>Filtro</Button>
                    <ul className={menuListClasses}>
                        {
                           listOptionsFilter.map((item) => {
                            return (
                                <SearchListItem key={item.name} className={item.class} onClick={(e) => {e.stopPropagation(); handleFilter(item.value)}}>
                                    {item.name}
                                </SearchListItem>
                            );
                           })
                        }
                    </ul>
                </div>
                <div className="grid h-5/6 w-11/13 grid-cols-4 gap-4 overflow-x-auto">
                {
                    products?.map((product: ProductProps) => {
                        return (<Card key={product.id} item={product}/>)
                    })
                }
                </div>
                
            </div>
    );
};

export default Home;