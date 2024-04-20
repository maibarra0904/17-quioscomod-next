import { prisma } from "@/src/lib/prisma"
import CategoryIcon from "../ui/CategoryIcon"


const getCategories = async() => {
    const categories = await prisma.category.findMany()
    //console.log(categories)
    return categories
}

const OrderSidebar = async () => {

    const categories = await getCategories()

    console.log(categories.map(el => el))

  return (
    <aside className="md:w-72 md:h-screen bg-white">
        <nav className="mt-10">
            {
                categories.map(category => (
                    <CategoryIcon 
                        key={category.id}
                        category={category}
                    />
                ))
            }
        </nav>
    </aside>
  )
}

export default OrderSidebar