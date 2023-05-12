import { classNames } from 'helpers/classNames/classNames'
import cls from './Calendar.module.scss'
import { useState } from 'react'
import { Button, ButtonTheme } from 'components/Button/Button'

interface CalendarProps {
    className?: string
    onSelect: (date: Date) => void
}

const months: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
]

const days: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function generateMonths(): string[][] {
    const mrx = []
    for (let i = 0; i < 4; i++) {
        const row = []
        for (let j = 0; j < 3; j++) {
            row.push(months[i * 3 + j])
        }
        mrx.push(row)
    }
    return mrx
}

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
            mrx[i][j] = startYear + i * 3 + j
        }
    }
    return mrx
}

function generateCalendar(month: number, year: number): Date[][] {
    const firstDayMonth = new Date()
    firstDayMonth.setDate(1)
    firstDayMonth.setMonth(month)
    firstDayMonth.setFullYear(year)
    const date = new Date(firstDayMonth)
    const usualRussianDay = (firstDayMonth.getDay() + 6) % 7
    date.setDate(date.getDate() - usualRussianDay)
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
            mrx[i][j] = new Date(date)
            date.setDate(date.getDate() + 1)
        }
    }
    return mrx
}

const CalendarPicker = ({
    date,
    onModeChange,
    setDate,
}: {
    date: Date
    onModeChange: (mode: CalendarPickerMode) => void
    setDate: (day: Date) => void
}) => {
    function isPickedDay(d: Date) {
        return (
            date.getFullYear() === d.getFullYear() &&
            date.getMonth() === d.getMonth() &&
            date.getDate() === d.getDate()
        )
    }

    function isPickedTime(hours: number, minutes: number) {
        return date.getHours() === hours && date.getMinutes() === minutes
    }

    return (
        <div className={cls.calendarPicker}>
            <div className={cls.selectDate}>
                <div className={cls.monthAndDate}>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={() => {
                            const newDate = new Date(date)
                            setDate(
                                new Date(
                                    newDate.setMonth(newDate.getMonth() - 1)
                                )
                            )
                        }}
                    >
                        {'<'}
                    </Button>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={() => {
                            onModeChange(CalendarPickerMode.MONTH)
                        }}
                    >
                        {months[date.getMonth()]}
                    </Button>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={() => {
                            onModeChange(CalendarPickerMode.YEAR)
                        }}
                    >
                        {date.getFullYear()}
                    </Button>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        onClick={() => {
                            const newDate = new Date(date)
                            setDate(
                                new Date(
                                    newDate.setMonth(newDate.getMonth() + 1)
                                )
                            )
                        }}
                    >
                        {'>'}
                    </Button>
                </div>
                <div className={cls.dateContainer}>
                    <table className={cls.dateTable}>
                        <thead>
                            <tr>
                                {days.map((day) => (
                                    <td key={day}>{day}</td>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {generateCalendar(
                                date.getMonth(),
                                date.getFullYear()
                            ).map((row) => (
                                <tr key={row.toString()}>
                                    {row.map((cell) => (
                                        <td
                                            className={cls.date}
                                            key={cell.toString()}
                                        >
                                            <button
                                                className={classNames(cls.btn, {
                                                    [cls.active]:
                                                        isPickedDay(cell),
                                                })}
                                                onClick={() => {
                                                    const newDate = new Date(
                                                        date
                                                    )
                                                    newDate.setFullYear(
                                                        cell.getFullYear()
                                                    )
                                                    newDate.setMonth(
                                                        cell.getMonth()
                                                    )
                                                    newDate.setDate(
                                                        cell.getDate()
                                                    )
                                                    setDate(newDate)
                                                }}
                                            >
                                                {cell.getDate()}
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={cls.selectTime}>
                <ol className={cls.time}>
                    {generateTimestamps().map(([hours, minutes]) => (
                        <li key={`${hours}:${minutes}`}>
                            <button
                                className={classNames(cls.btn, {
                                    [cls.active]: isPickedTime(hours, minutes),
                                })}
                                onClick={() => {
                                    const newDate = new Date(date)
                                    newDate.setHours(hours)
                                    newDate.setMinutes(minutes)
                                    newDate.setSeconds(0)
                                    newDate.setMilliseconds(0)
                                    setDate(newDate)
                                }}
                            >
                                {`${hours.toString().padStart(2, '0')}:${minutes
                                    .toString()
                                    .padStart(2, '0')}`}
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    )
}

const YearPicker = ({
    year,
    setYear,
}: {
    year: number
    setYear: (year: number) => void
}) => {
    return (
        <table className={cls.yearPicker}>
            <thead />
            <tbody>
                {generateYears(year).map((row) => (
                    <tr key={row.toString()}>
                        {row.map((cell) => (
                            <td key={cell.toString()}>
                                <button
                                    className={cls.btn}
                                    onClick={() => {
                                        setYear(cell)
                                    }}
                                >
                                    {cell}
                                </button>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

function generateTimestamps(): number[][] {
    const list = []
    for (let i = 0; i < 48; i++) {
        const hours = Math.floor(i / 2)
        const minutes = (i % 2) * 30
        list.push([hours, minutes])
    }
    return list
}

const MonthPicker = ({ setMonth }: { setMonth: (month: number) => void }) => {
    return (
        <table className={cls.monthPicker}>
            <thead />
            <tbody>
                {generateMonths().map((row, i) => (
                    <tr key={row.toString() + i.toString()}>
                        {row.map((cell, j) => (
                            <td key={cell.toString() + j.toString()}>
                                <button
                                    className={cls.btn}
                                    onClick={() => {
                                        setMonth(i * 3 + j)
                                    }}
                                >
                                    {cell}
                                </button>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

enum CalendarPickerMode {
    YEAR,
    FULL,
    MONTH,
}

export const Calendar: React.FC<CalendarProps> = (props) => {
    const { className, onSelect } = props

    const [mode, setMode] = useState<CalendarPickerMode>(
        CalendarPickerMode.FULL
    )
    const [date, setDate] = useState<Date>(new Date())

    let currentPicker
    switch (mode) {
        case CalendarPickerMode.FULL:
            currentPicker = (
                <CalendarPicker
                    date={date}
                    setDate={(pickedDate) => {
                        setDate(new Date(pickedDate))
                        onSelect(new Date(pickedDate))
                    }}
                    onModeChange={setMode}
                />
            )
            break
        case CalendarPickerMode.YEAR:
            currentPicker = (
                <YearPicker
                    year={date.getFullYear()}
                    setYear={(year) => {
                        const newDate = new Date(date)
                        newDate.setFullYear(year)
                        setDate(newDate)
                        onSelect(new Date(newDate))
                        setMode(CalendarPickerMode.FULL)
                    }}
                />
            )
            break
        case CalendarPickerMode.MONTH:
            currentPicker = (
                <MonthPicker
                    setMonth={(month) => {
                        const newDate = new Date(date)
                        newDate.setMonth(month)
                        setDate(newDate)
                        onSelect(new Date(newDate))
                        setMode(CalendarPickerMode.FULL)
                    }}
                />
            )
            break
    }

    return (
        <div className={classNames(cls.Calendar, {}, [className ?? ''])}>
            {currentPicker}
            {date.toLocaleString()}
        </div>
    )
}
