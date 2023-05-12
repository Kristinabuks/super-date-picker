import { classNames } from 'helpers/classNames/classNames'
import cls from './Popover.module.scss'
import { ReactNode, useRef } from 'react'
import { useOnClickOutside } from 'helpers/useOnClickOutside/useOnClickOutside'

interface PopoverProps {
    className?: string
    children?: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

export const Popover: React.FC<PopoverProps> = (props) => {
    const { className, children, isOpen, onClose } = props
    const popoverRef = useRef()
    useOnClickOutside(popoverRef, onClose)

    return (
        <div
            ref={popoverRef}
            className={classNames(cls.popover, { [cls.opened]: isOpen }, [
                className ?? '',
            ])}
        >
            <div className={cls.body}>{children}</div>
        </div>
    )
}
