"use client"

import { useLoading } from "@/context/LoadingContext";
import MainLoader from "@/components/Loader";

export default function LoadingWrapper() {
    const { isLoading } = useLoading();
    return <MainLoader isLoading={isLoading} />;
}
