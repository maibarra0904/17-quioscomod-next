import { prisma } from "@/src/lib/prisma";

//Esta configuración fuerza a que la API sea dinamica
//Sin esta configuración la API demoraría mucho en actualizar
export const dynamic = 'force-dinamic';

export async function GET() {
    
    const orders = await prisma.order.findMany({
        take: 5,
        where: {
            orderReadyAt: {
                not: null,
            }
        },
        orderBy: {
            orderReadyAt: "desc",
        },
        include: {
            orderProducts: {
                include: {
                    product: true,
                },
            }
        }
    })

    return Response.json(orders)
}