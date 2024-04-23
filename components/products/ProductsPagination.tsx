import Link from "next/link"


const ProductsPagination = ({ page, pages }: { page: number, pages: number }) => {

        const arrPages = Array.from({length: pages}, (_, i) => i + 1)



    return (
        <nav className="flex items-center justify-center py-10">
            
            <Link 
                href={`/admin/products?page=${(page - 1)<1 ? page : page-1}`}
                className={`bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${(page - 1)<1 ? "cursor-not-allowed disabled" :""}`}
            >
                &laquo;
            </Link>

            {
                arrPages.map((pageNumber, i) => (
                    <Link 
                        key={i}
                        href={`/admin/products?page=${pageNumber}`}
                        className={`bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${pageNumber === page ? "font-bold" : ""}`}
                    >
                        {pageNumber}
                    </Link>
                ))
            }

            <Link 
                href={`/admin/products?page=${(page + 1)>pages ? page : page+1}`}
                className={`bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 ${(page + 1)>pages ? "cursor-not-allowed disabled" :""}`}
            >
                &raquo;
            </Link>
        </nav>
    )
}

export default ProductsPagination