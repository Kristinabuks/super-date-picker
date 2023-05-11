import { ButtonHTMLAttributes } from "react"
import cls from './Button.module.scss'
import { classNames } from "helpers/classNames/classNames"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    size?: ButtonSize,
    theme?: ButtonTheme
}

export enum ButtonTheme {
    CLEAR = 'clear',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
}

export enum ButtonSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l'
}

export const Button: React.FC<ButtonProps> = (props) =>{
    const {
        children, 
        size = ButtonSize.M, 
        className, 
        theme, 
        ...otherProps} = props
    return(
        <button 
            className={classNames(cls.button, {}, [className, cls[theme], cls[size]])}
            {...otherProps}
        >
            {children}
        </button>
    )
}