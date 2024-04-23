import { usePathname } from "next/navigation"

function AdminRoute() {

    const pathname = usePathname()
    console.log(pathname)

  return (
    <div>AdminRoute</div>
  )
}

export default AdminRoute