import { useShoppingCart } from "../contexts/ShoppingCartContext";

const ShoppingCart = () => {
    const {items} = useShoppingCart();

    return (
        <div className="flex h-full flex-col gap-12">
            <div className="mt-32 flex h-4/5 justify-center overflow-x-auto">
                {
                    items.map((item) => {
                        return (
                            <span>{item.name}</span>
                        );
                    })
                }
            </div>
        </div>
    );
};

export default ShoppingCart;