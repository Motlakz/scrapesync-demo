import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import logoPng from "../public/logo.png"

const Logo = ({
    fontSize = "text-2xl",
    iconSize = 28
}: { fontSize?: string, iconSize?: number }) => {
    return (
       <Link  href="/" className={cn(
        "text-2xl font-extrabold flex items-center gap-2",
        fontSize
       )}>
            <div className="rounded-xl bg-gradient-to-r from-violet-400 to-cyan-400 p-1">
                <Image src={logoPng} alt="scrapesync logo" className="rounded-md" width={iconSize} height={iconSize}/>
            </div>
            <div>
                <span className="link-highlight bg-gradient-to-r from-violet-500 to-violet-600 bg-clip-text text-transparent">
                    Scrape
                </span>
                <span className="link-highlight-cyan bg-gradient-to-r from-cyan-500 to-cyan-600 bg-clip-text text-transparent">
                    Sync
                </span>
            </div> 
       </Link>
    )
}

export default Logo