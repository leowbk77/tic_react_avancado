import {useQuery} from 'react-query';
import Card from "../components/Card";
import ProductService from "../services/product.service";
import { ProductProps } from "../interfaces/Product";

const Home = () => {
    const {
        data: products,
        error,
        isLoading,
    } = useQuery<ProductProps[], Error>("query-products", async () => {
        return await ProductService.findAll();
    });

    return (<div className="mt-32 h-4/5 w-full flex flex-col items-center justify-content gap-16">
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