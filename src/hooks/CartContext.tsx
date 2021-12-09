import { createContext, useContext, useState } from "react"
import { IComic } from "../interfaces/comics";
import ChildrenProvider from "./ChidreanProvider";

interface CartContextData {
    addCart(comic: IComic): void;
    removeCart(id: number): void;
    comicsCart: IComic[];
}

export const CartContext = createContext({} as CartContextData)


export const CartProvider = ({ children }: ChildrenProvider) => {

    const [comicsCart, setComicsCart] = useState<Array<IComic>>([])

    const removeCart = (id: number) => {
        setComicsCart(state => state.filter(item => item.id !== id))
    }

    const addCart = (comic: IComic) => {
        setComicsCart([...comicsCart, comic])
    }


    return (
        <CartContext.Provider value={{ comicsCart, removeCart, addCart }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext)