import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function searchProducts(searchTerm: string) {
  const products = await prisma.product.findMany(
    {
      where: {
        name: {
          contains: searchTerm,
          mode: "insensitive",
        }
      },
      include: {
        category: true,
      },
    }
  )

  return products;
}


const SearchPage = async ({ searchParams }: { searchParams: { search: string } }) => {

  const products = await searchProducts(searchParams.search)

  return (
    <>
      <Heading>Resultados de Busqueda: {searchParams.search}</Heading>

      <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>


        <ProductSearchForm />
      </div>

      {
        products?.length ?
          <ProductTable products={products} /> :
          <p className="mt-5 text-center text-lg">No hay resultados</p>
      }

    </>
  )
}

export default SearchPage