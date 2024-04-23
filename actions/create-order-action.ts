"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prisma"
import { OrderSchema } from "@/src/schema"

export async function createOrder(data: Object) {
    
    const result = OrderSchema.safeParse(data)

    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }
    
    try {
        
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }

            }
        })

        
    } catch (error) {
        console.log(error)
        return {
            errors: [{message: 'Hubo un error al agregar el pedido'}]
        }
    }
}

export async function completeOrder(id: number) {
    try {
        await prisma.order.update({
        
            where: {
                id
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        })

        revalidatePath('/admin/orders')
    } catch (error) {
        console.log(error)
    }
    
}
