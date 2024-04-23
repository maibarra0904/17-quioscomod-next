import OrderCard from "@/components/order/OrderCard"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"


async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
    
  })
  return orders
}


const OrdersPage = async() => {

    const orders = await getPendingOrders()

    console.log(orders)

  return (
    <>
    <Heading>
      Administrar Ordenes
    </Heading>

    {
      orders.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {
            orders.map(order => order.status===false && (
              <OrderCard key={order.id} order={order}/>
            ))
          }
        </div>
      ) : ''
    }
    
  </>
  )
}

export default OrdersPage