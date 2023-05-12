import { InputHTMLAttributes } from 'react'
import cls from './Input.module.scss'
import { classNames } from 'helpers/classNames/classNames'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string
}

export const Input: React.FC<InputProps> = (props) => {
    const { className, ...otherProps } = props
    return (
        <input
            className={classNames(cls.input, {}, [className])}
            {...otherProps}
        ></input>
    )
}
