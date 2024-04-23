
import ProductsPagination from '@/components/products/ProductsPagination'
import ProductTable from '@/components/products/ProductsTable'
import Heading from '@/components/ui/Heading'
import { prisma } from '@/src/lib/prisma'
import { redirect } from 'next/navigation'
import React from 'react'

async function getProducts(page: number, pageSize: number) {

  const skip = (page-1) * pageSize

  const products = await prisma.product.findMany({
    take:pageSize,
    skip,
    include: {
      category: true
    }
  })

  return products
}

async function totalProducts() {
  const total =  await prisma.product.count()
  
  return total

}



const ProductsPage = async ({searchParams} : {searchParams: {page: string}}) => {
    
  const page:number = +searchParams.page || 1;

  const pageSize = 10

  if (page<0) redirect('/admin/products')

  const products = await getProducts(page, pageSize)

  const total = await totalProducts()

  const pages = Math.ceil(total/pageSize)

  if (page > pages) {
    redirect('/admin/products')
  } 

  return (
    <>
      <Heading>
        Administrar Productos
      </Heading>

      <ProductTable products={products}/>

      <ProductsPagination page={page} pages={pages}/>

    </>
  )
}

export default ProductsPage