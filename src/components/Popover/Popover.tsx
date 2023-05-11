
import { classNames } from 'helpers/classNames/classNames'
import cls from './Popover.module.scss'
import { ReactNode } from 'react'

interface PopoverProps {
    className?: string,
    children?: ReactNode,
    isOpen?: boolean
}

export const Popover: React.FC<PopoverProps> = (props) => {
    const { className, children, isOpen } = props

    return (
        <div className={classNames(cls.popover, {[cls.opened]: isOpen}, [className ?? ''])}>
            <div className={cls.body}>
                {children}
            </div>
        </div>
 );
}