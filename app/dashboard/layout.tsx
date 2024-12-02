import BreadCrumbHeader from '@/components/BreadCrumbHeader'
import DesktopSidebar from '@/components/Sidebar'
import { ModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

async function layout({ children }: { children: ReactNode }) {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }
    return (
        <div className="flex h-screen">
            <DesktopSidebar />
            <main className="flex flex-col flex-1">
                <header className="flex items-center justify-between px-6 py-4 h-[50px]">
                    <BreadCrumbHeader />
                    <div className="gap-1 flex items-center">
                        <ModeToggle />
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </header>
                <Separator />
                <div className="flex-1 overflow-auto">
                    <section className="sm:p-8 p-4 text-accent-foreground">
                        {children}
                    </section>
                </div>
            </main>
        </div>
    )
}

export default layout