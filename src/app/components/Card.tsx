import { useShoppingCart } from "../contexts/ShoppingCartContext";
import { Product } from "../interfaces/Product";
import Button from "./Button";

const Card = ({item}: Product) => {
    const {addProduct} = useShoppingCart();
    return (
        <div className="flex h-96 bg-white p-2 w-64 rounded-2xl flex-col justify-center">
            <div className="flex justify-center">
                <img src={`./assets/items/${item.image}.jpg`} alt={item.name} className="h-40 rounded-t-lg object-cover"/>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-center items-center mb-2">
                    <span className="text-center capitalize font-bold">{item.name}</span>
                </div>
                <div className="flex justify-center items-center">
                    <span>{item.price} $</span>
                </div>
            </div>
            <Button onClick={(e) => {e.stopPropagation; addProduct(item.id, item.name, item.price)}}>Adicionar ao carrinho</Button>
        </div>
    );
};

export default Card;