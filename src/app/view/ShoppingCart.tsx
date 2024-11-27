import { useEffect } from "react";
import Button from "../components/Button";
import { useShoppingCart } from "../contexts/ShoppingCartContext";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
    const {items, addProduct, onRemove, onDecrease, totalSumAmount} = useShoppingCart();
    const navigate = useNavigate();

    useEffect(()=>{
        if (authService.getLoggedUser() == null) {
            navigate("/login");
        }
    });

    return (
        <div className="flex h-full flex-col gap-12">
            <div className="mt-32 flex h-4/5 justify-center overflow-x-auto">
                <div className="flex w-3/6 flex-col gap-8">
                    {
                        items.map((item) => {
                            return (
                                <div key={item.id} className="flex justify-between rounded-3xl bg-white p-8">
                                    <div className="flex flex-col gap-4">
                                        <p>
                                            <span className="text-center capitalize">Nome do produto: {item.name}</span>
                                        </p>
                                        
                                        <span>Quantidade: {item.quantity}</span>
                                        <span>Valor Total: {item.amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex flex-col gap-5">
                                        <Button onClick={(e) => {e.stopPropagation(); addProduct(item.id, item.name, item.unitPrice)}}>+</Button>
                                        <Button onClick={(e) => {e.stopPropagation(); onDecrease(item.id, item.unitPrice)}}>-</Button>
                                        <Button onClick={(e) => {e.stopPropagation(); onRemove(item.id)}} variant="secondary">Remover</Button>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div>
                <span className="ml-16">
                    <b>Total:</b> R$ {totalSumAmount.toFixed(2)}
                </span>
            </div>
        </div>
    );
};

export default ShoppingCart;