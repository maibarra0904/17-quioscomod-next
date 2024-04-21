'use client'

import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/create-order-action"
import { OrderSchema } from "@/src/schema"
import { toast } from "react-toastify"

const OrderSummary = () => {
    const {order, deleteAllProducts} = useStore()



    const total = order.map(item => item.subtotal).reduce((a, b) => a + b, 0).toFixed(2)

    const handleCreateOrder = async (formData: FormData) => {
        
        const data = {
            name: formData.get('name'),
            total: parseFloat(total),
            order
        }

        //Validación del lado del cliente
        //const result = OrderSchema.safeParse(data)

        // if(!result.success) {
        //     result.error.issues.forEach((issue) => {
        //         toast.error(issue.message)
        //     })
        // } else {
        //     toast.success('Orden Creada Satisfactoriamente')
        // }
        
        //Validación del lado del servidor
        const response = await createOrder(data)

        if(response?.errors) {
            response.errors.forEach((error) => {
                toast.error(error.message)
            })

            return
        }

        deleteAllProducts();
        toast.success('Orden Creada Satisfactoriamente')
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">Mi pedido</h1>
            {
            order.length === 0
                ? <p className="text-center my-10">No hay pedidos aún</p>
                : (<><div className="mt-5">
                    {
                        order.map(item => (
                            <ProductDetails key={item.id} item={item}/>
                        ))
                    }
                </div>
                <p className="text-2xl mt-20 text-center">
                    Total a pagar: {''}
                    <span className="font-bold">
                        {
                            formatCurrency(parseFloat(total))
                        }
                    </span>
                </p>

                <form
                    className="w-full mt-10 space-y-5"
                    action={handleCreateOrder}
                >
                    <input 
                        type="text"
                        placeholder="Nombre"
                        className="bg-white boder border-gray-100 p-2 w-full"
                        name="name"
                    />
                    
                    <input 
                        type="submit"
                        className="py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold"
                        value="Finalizar Pedido"
                    />

                </form>

                </>)
            }
        </aside>

        
    )
}

export default OrderSummary