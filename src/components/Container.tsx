import { ElementType, ReactNode } from 'react'

export const Container = ({
    as: ElementType = 'div',
    children,
    className,
    ...rest
}: { as?: ElementType, children: ReactNode, className: string, }) => {
    return (
        <ElementType
            {...rest}
            className={`px-5 w-full max-w-screen-md m-auto ${className}`}
        >
            {children}
        </ElementType>
    )
}
