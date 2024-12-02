"use client"

import { usePathname } from "next/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";
import React, { Fragment } from "react";
import { MobileSidebar } from "./Sidebar";

const BreadCrumbHeader = () => {
    const pathname = usePathname();
    const paths = pathname === "/dashboard" ? [""] : pathname?.split("/");
    return (
        <div className="flex flex-start item-center">
            <MobileSidebar />
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink className="capitalize pt-2" href={`/${path}`}>
                                    {path}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index !== paths.length -1 && <BreadcrumbSeparator className="pt-2" /> }
                        </Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumbHeader