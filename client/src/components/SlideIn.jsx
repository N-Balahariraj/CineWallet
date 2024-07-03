import React from 'react'

export default function SlideIn({ children, overlay }) {
    const isOverlay = overlay ? 'm-0 opacity-100' : ''
    return (
        <div className={`SlideIn ${isOverlay}`}>{children}</div>
    )
}
