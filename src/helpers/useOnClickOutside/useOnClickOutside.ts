import { MutableRefObject, useEffect } from 'react'

export function useOnClickOutside(
    ref: MutableRefObject<any>,
    handler: (e: Event) => void
) {
    useEffect(() => {
        const listener = (e: Event) => {
            if (!ref.current || ref.current.contains(e.target)) {
                return
            }
            handler(e)
        }
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])
}
