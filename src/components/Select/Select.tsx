import { SelectHTMLAttributes } from 'react'
import cls from './Select.module.scss'
import { classNames } from 'helpers/classNames/classNames'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    className?: string
}

export const Select: React.FC<SelectProps> = (props) => {
    const { className, ...otherProps } = props
    return (
        <select
            className={classNames(cls.select, {}, [className])}
            {...otherProps}
        ></select>
    )
}
