import { createContext, useContext, useState } from "react";

interface ShoppingCartProviderProps {
    children: React.ReactNode;
};

export interface ListItem {
    id: number;
    name: string;
    quantity: number;
    unitPrice: number;
    amount: number;
};

export interface ShoppingCartListContextData {
    items: ListItem[],
    //totalSumAmount: number,
    //totalQtd: number,
    addProduct: (id: number, name: string, price: number) => void;
    //onRemove: (id: number) => void;
    //onDecrease: (id: number, price: number) => void;
};

const ShoppingCartContextDefaultValues = {
    items: [],
    totalSumAmount: 0,
    totalQtd: 0,
    addProduct: () => null,
    onRemove: () => null,
    onDecrease: () => null
};

const ShoppingCartContext = createContext<ShoppingCartListContextData>(ShoppingCartContextDefaultValues);

export const ShoppingCartProvider = ({children, }: ShoppingCartProviderProps) => {
    const [items, setItems] = useState<ListItem[]>(([]));

    // outra função completamente macarrão no código
    const addProduct = (id: number, name: string, price: number) => {
        const productAlreadyInCart = items.find((product) => product.id === id);
        if(!productAlreadyInCart) {
            const item: ListItem = {
                id: id,
                name: name,
                amount: price,
                unitPrice: price,
                quantity: 1
            }
        return setItems([...items, item]);
        } else {
            const updateCart = items.map((cartItem) => 
                cartItem.id === id ? {
                    ...cartItem,
                    quantity: Number(cartItem.quantity) + 1,
                    amount: cartItem.amount + price,
                } : cartItem
            );
            return setItems(updateCart);
        }
    }

    return (
        <ShoppingCartContext.Provider value={{items, addProduct}}>
            {children}
        </ShoppingCartContext.Provider>
    );
}

export const useShoppingCart = () => useContext(ShoppingCartContext);