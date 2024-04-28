'use client'
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { redirect } from "next/navigation"


const ProductSearchForm = () => {

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get('search')
        }

        const result = SearchSchema.safeParse(data);

        if(!result.success) {
            result.error.issues.forEach((issue) => {
  
                toast.error(issue.message)
            })
            return
        } 

        redirect(`/admin/products/search?search=${result.data.search}`)
    }

  return (
    <form 
        action={handleSearchForm}
        className="flex items-center"
    >
      <input
        id="search"
        name="search"
        type="text"
        placeholder="Buscar producto"
        className="w-full p-2 mt-2 mr-1 placeholder-gray-400"
      />

      <input
      type="submit"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-2 p-2 uppercase font-bold cursor-pointer"
      value="Buscar"
      />
    </form>
  )
}

export default ProductSearchForm