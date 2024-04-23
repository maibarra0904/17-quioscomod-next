'use client'
import Link from "next/link"
import Logo from "../ui/Logo"
import { usePathname } from "next/navigation"

const adminNavigation = [
    {url: '/admin/orders', text: 'Ordenes', blank: false},
    {url: '/admin/products', text: 'Productos', blank: false},
    {url: '/order/cafe', text: 'Ver Quiosco', blank: true},
]

export default function AdminSidebar() {

    const pathname = usePathname()
    console.log(pathname)

    return (
        <>
            <Logo />

            <div className="space-y-3 ">
                <p className="mt-10 uppercase font-bold text-sm text-gray-600 text-center">Navegación</p>
                <nav className="flex flex-col">
                    {
                        adminNavigation.map((item, index) => (
                            <Link
                                key={index}
                                href={item.url}
                                className={`font-bold text-lg border-t border-gray-200 p-3 last-of-type:border-b ${item.url === pathname ? 'bg-amber-400' : ''}`}
                                target={item.blank ? 'blank' :''}
                            >
                                {item.text}
                            </Link>
                        ))
                    }
                </nav>
            </div>
        </>

    )
}