
import { classNames } from 'helpers/classNames/classNames'
import cls from './Calendar.module.scss'

interface CalendarProps {
    className?: string
}

const months: string[][] = [
    ["Январь",],
    [],
    [],
    [],
]

function generateYears(year: number): number[][] {
    const mrx: number[][] = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ]
    const startYear = year - 7
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 3; j++) {
            mrx[i][j] = startYear + i*3 + j
        }
    }
    return mrx
}

function generateCalendar(month: number, year: number): Date[][] {
    const firstDayMonth = new Date()
    firstDayMonth.setDate(1)
    firstDayMonth.setMonth(month)
    firstDayMonth.setFullYear(year)
    const hubabuba = new Date(firstDayMonth)
    const usualRussianDay = (firstDayMonth.getDay() + 6) % 7
    hubabuba.setDate(hubabuba.getDate() - usualRussianDay)
    const mrx: Date[][] = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
    ]
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            mrx[i][j] = new Date(hubabuba)
            hubabuba.setDate(hubabuba.getDate() + 1)
        }
    }
    return mrx
}

export const Calendar: React.FC<CalendarProps> = (props) => {
    const { className } = props

    return (
        <div className={classNames(cls.Calendar, {}, [className ?? ''])}>
            <table>
                {generateYears(2023).map(row => (
                    <tr>
                        {row.map(cell => (
                            <td>
                                <button onClick={() => {
                                    console.log(cell)
                                }}>{cell}</button>
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
            <table>
                {generateCalendar(0, 2023).map(row => (
                    <tr>
                        {row.map(cell => (
                            <td>
                                <button onClick={() => {
                                    console.log(cell.getMonth(), cell.getFullYear())
                                }}>{cell.getDate()}</button>
                            </td>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
 );
}