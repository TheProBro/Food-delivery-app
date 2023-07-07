import React from 'react'
import { useReducer, useContext, createContext } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return [...state, {id:action.id,name:action.name,price:action.price,qty:action.qty,size:action.size}]
        case "DELETE_FROM_CART":
            const newArr=[...state]
            newArr.splice(action.index,1)
            return newArr
        default:
            return state
    }
}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, [])
    return(
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)