import { BackgroundShapes } from '@/components/LoadingAnimation'
import Logo from '@/components/Logo'
import React, { ReactNode } from 'react'

function layout({ children }: { children: ReactNode}){
    return (
        <div className="flex flex-col justify-center items-center gap-4 h-screen bg-gradient-to-br from-violet-100 to-cyan-100 dark:from-violet-950 dark:to-cyan-950">
            <BackgroundShapes />
            <Logo />
            {children}
        </div>
    )
}

export default layout