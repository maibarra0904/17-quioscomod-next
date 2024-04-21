import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";


interface  Store {
    order: OrderItem[]
    addToOrder: (product: Product) => void
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    deleteProduct: (id: number) => void
    deleteAllProducts: () => void
}

export const useStore = create<Store>((set, get) => ({
    order: [],
    addToOrder: (product: Product) => {

        const {categoryId, image, ...data} = product

        let order: OrderItem[] = []

        const currentProduct = get().order.filter(item => item.id === product.id)

        if(currentProduct[0]?.quantity ===5) return

        if(get().order.find(i => i.id === product.id)) {
            order = get().order.map(item => item.id === product.id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            }: item)
        } else {
            order = [...get().order, {
                ...data,
                 quantity: 1,
                 subtotal: data.price,
            }]
        }

        set(() => ({
            order
        }))
        

    },

    increaseQuantity: (id: number) => {
        set((state) => ({
            order: state.order.map(item => item.id === id ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            }: item)
        }))
    },

    decreaseQuantity: (id: number) => {

        const order = get().order.map(item => item.id === id ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1)
        } : item)

        set(() => ({
            order
        }))
    },

    deleteProduct: (id: number) => {
        set((state) => ({
            order: state.order.filter(item => item.id!== id)
        }))
    },

    deleteAllProducts: () => {

        let order:OrderItem[] = []

        set(() => ({
            order
        }))
    }


}))