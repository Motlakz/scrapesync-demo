"use client"

import { HomeIcon, Menu, Wallet } from 'lucide-react'
import React, { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import UserAvailableCreditsBadge from './UserAvailableCreditsBadge'

type Route = {
    path: string
    label: string
    icon: React.ElementType
}

const routes: Route[] = [
    {
        path: "/dashboard",
        label: "Dashboard",
        icon: HomeIcon
    },
    {
        path: "/dashboard/billing",
        label: "Billing",
        icon: Wallet
    }
]

const isRouteActive = (pathname: string, route: Route): boolean => {
    if (route.path === "/dashboard") {
        return pathname === "/dashboard"
    }
    return pathname.startsWith(route.path)
}

const DesktopSidebar = () => {
    const pathname = usePathname()

    return (
        <aside className="hidden relative md:block max-w-[250px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-2 border-separate">
            <header className="flex items-center justify-center gap-2 border-b border-separate p-4">
                <Logo />
            </header>
            <ul>
                <div className="p-2"><UserAvailableCreditsBadge /></div>
                <li className="flex flex-col p-2 gap-2">
                    {routes.map(route => (
                        <Link 
                            key={route.path} 
                            href={route.path} 
                            className={buttonVariants({
                                variant: isRouteActive(pathname, route) ? "sidebarActiveItem" : "sidebarItem",
                            })}
                        >
                            <route.icon size={20} />
                            {route.label}
                        </Link>
                    ))}
                </li>
            </ul>
        </aside>
    )
}

export function MobileSidebar() {
    const [isOpen, setOpen] = useState(false)
    const pathname = usePathname()

    return (
        <div className="block border-separate bg-background md:hidden">
            <nav className="flex items-center justify-between">
                <Sheet open={isOpen} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="space-y-4 w-[350px] sm:w-[420px]" side="left">
                        <Logo />
                        <div className="p-2"><UserAvailableCreditsBadge /></div>
                        <ul>
                            <li className="flex flex-col p-2 gap-2">
                                {routes.map(route => (
                                    <Link 
                                        key={route.path} 
                                        href={route.path} 
                                        className={buttonVariants({
                                            variant: isRouteActive(pathname, route) ? "sidebarActiveItem" : "sidebarItem",
                                        })}
                                        onClick={() => setOpen(false)}
                                    >
                                        <route.icon size={20} />
                                        {route.label}
                                    </Link>
                                ))}
                            </li>
                        </ul>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
    )
}

export default DesktopSidebar