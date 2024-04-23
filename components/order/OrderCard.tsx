'use client'

import { OrderWithProducts } from "@/src/types";
import { formatCurrency } from '../../src/utils/index';
import { completeOrder } from "@/actions/create-order-action";

type OrderCardProps = {
    order: OrderWithProducts
}

const OrderCard = ({order}: OrderCardProps) => {

    console.log(order);
    
    const completarOrden = (id: number) => {
        
        const complete = async () => {
            await completeOrder(id)
        }

        complete()

    }

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6  lg:mt-0 lg:p-8 space-y-4"
        >
            <p className='text-2xl font-medium text-gray-900 border-b border-gray-200'>Cliente: {order.name}</p>
            <p className='text-lg font-medium text-gray-900'>Productos Ordenados:</p>
            <dl className="mt-6 space-y-4">

                {
                    order.orderProducts.map(product => (
                        <div 
                            key={product.productId}
                            className="flex items-center gap-2 border-t border-gray-50 pt-4"
                        >
                            <dt className="text-sm font-bold text-gray-500">
                                <span>({product.quantity})</span>
                            </dt>
                            <dd className="text-sm text-gray-900">
                                {product.product.name}
                            </dd>
                        </div>
                    ))
                }

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <dt className="text-base font-medium text-gray-900">Total a Pagar: {formatCurrency(order.total)}</dt>
                    <dd className="text-base font-medium text-gray-900">{}</dd>
                </div>
            </dl>

            
            <input
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                value='Marcar Orden Completada'
                onClick={() => completarOrden(order.id)}
            />
            
        </section>
    )
}

export default OrderCard