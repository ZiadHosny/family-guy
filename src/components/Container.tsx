import { ElementType, ReactNode } from 'react'

export const Container = ({
    children,
    className,
    as = 'div',
    ...rest
}: { as?: ElementType, children: ReactNode, className: string, }) => {
    return (
        <div
            {...rest}
            className={`px-5 w-full max-w-screen-md m-auto ${className}`}
        >
            {children}
        </div>
    )
}
