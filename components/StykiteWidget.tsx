"use client"

import { useEffect, useRef, useState } from 'react'

export default function StykiteWidget() {
    const widgetRef = useRef<HTMLDivElement>(null)
    const [apiKey, setApiKey] = useState<string>('')

    useEffect(() => {
        const fetchedApiKey = process.env.NEXT_PUBLIC_STYKITE_WIDGET_API_KEY || ''
        setApiKey(fetchedApiKey)
    }, [])

    useEffect(() => {
        // Only create widget when apiKey is available
        if (widgetRef.current && apiKey) {
            const widget = document.createElement('stykite-widget')
            widget.setAttribute('company-id', process.env.STYKITE_COMPANY_ID!)
            widget.setAttribute('country-id', process.env.STYKITE_COUNTRY_ID!)
            widget.setAttribute('api-key', apiKey)
            widget.setAttribute('widget-type', 'PLAN_PREVIEW')
            widget.setAttribute('email', '')

            widgetRef.current.appendChild(widget)
        }
    }, [apiKey]) // Re-run when apiKey changes

    return <div ref={widgetRef}></div>
}
