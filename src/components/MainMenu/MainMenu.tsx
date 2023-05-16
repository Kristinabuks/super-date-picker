import { classNames } from 'helpers/classNames/classNames'
import cls from './MainMenu.module.scss'
import { ChangeEvent, useState } from 'react'
import { Button, ButtonTheme } from 'components/Button/Button'
import { TimeFormat, TimeUnitR } from 'components/SuperDataPicker'
import { convertToHuman } from 'helpers/humanConverter/humanConverter'
import { Input } from 'components/Input/Input'
import { Select } from 'components/Select/Select'

interface MainMenuProps {
    className?: string
    handlerDateStart?: (date: Date) => void
    handlerDateEnd?: (date: Date) => void
    date?: Date
    relativeTimeUnitsStart: TimeUnitR
    relativeDateStart: number
    relativeTimeUnitsEnd: TimeUnitR
    relativeDateEnd: number
    refreshDate: number
    setRefreshDate: (refreshDate: number) => void
    refreshTimeUnits: TimeUnit
    setRefreshTimeUnits: (refreshTimeUnits: TimeUnit) => void
    setFields: (
        formatStart: TimeFormat,
        formatEnd: TimeFormat,
        relativeDateStart: number,
        relativeTimeUnitsStart: TimeUnitR,
        relativeDateEnd: number,
        relativeTimeUnitsEnd: TimeUnitR
    ) => void
}

export enum TimeDirection {
    NEXT,
    FROM,
}

export enum TimeUnit {
    SECOND,
    MINUTE,
    HOUR,
    DAY,
    WEEK,
    MONTH,
    YEAR,
}

const getTimestamp = (
    timeUnit: TimeUnit,
    direction: TimeDirection,
    count: number
) => {
    let date = new Date()

    if (direction === TimeDirection.FROM) {
        count = -count
    }

    switch (timeUnit) {
        case TimeUnit.SECOND:
            return new Date(date.setSeconds(date.getSeconds() + count))
        case TimeUnit.MINUTE:
            return new Date(date.setMinutes(date.getMinutes() + count))
        case TimeUnit.HOUR:
            return new Date(date.setHours(date.getHours() + count))
        case TimeUnit.DAY:
            return new Date(date.setDate(date.getDate() + count))
        case TimeUnit.WEEK:
            return new Date(date.setDate(date.getDate() + count * 7))
        case TimeUnit.MONTH:
            return new Date(date.setMonth(date.getMonth() + count))
        case TimeUnit.YEAR:
            return new Date(date.setFullYear(date.getFullYear() + count))
    }
}

function humanDiff(start: Date, end: Date): [number, TimeUnit] {
    return convertToHuman(Number(end) - Number(start))
}

export const MainMenu: React.FC<MainMenuProps> = (props) => {
    const {
        className,
        handlerDateStart,
        handlerDateEnd,
        refreshDate,
        setRefreshDate,
        refreshTimeUnits,
        setRefreshTimeUnits,
        setFields,
    } = props
    const [direction, setDirection] = useState<TimeDirection>(
        TimeDirection.FROM
    )
    const [count, setCount] = useState<number>(0)
    const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.SECOND)
    const [refreshD, setRefreshD] = useState<number>(0)
    const [refreshTU, seRrefreshTU] = useState<TimeUnit>(TimeUnit.SECOND)

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setDirection(Number(event.target.value))
    }

    const onChangeHandler2 = (event: ChangeEvent<HTMLInputElement>) => {
        setCount(Number(event.target.value))
    }

    const onChangeHandler3 = (event: ChangeEvent<HTMLSelectElement>) => {
        setTimeUnit(Number(event.target.value))
    }

    const onChangeHandler4 = (event: ChangeEvent<HTMLInputElement>) => {
        setRefreshD(Number(event.target.value))
    }

    const onChangeHandler5 = (event: ChangeEvent<HTMLSelectElement>) => {
        seRrefreshTU(Number(event.target.value))
    }

    const onClickHandler = () => {
        if (direction == TimeDirection.NEXT) {
            handlerDateStart(new Date())
            setFields(
                TimeFormat.NOW,
                TimeFormat.RELATIVE,
                0,
                0,
                count,
                timeUnit + 7
            )
            handlerDateEnd(getTimestamp(timeUnit, direction, count))
        } else if (direction == TimeDirection.FROM) {
            handlerDateEnd(new Date())
            setFields(
                TimeFormat.RELATIVE,
                TimeFormat.NOW,
                count,
                timeUnit % 12,
                0,
                0
            )
            handlerDateStart(getTimestamp(timeUnit, direction, count))
        }
    }

    const onClickHandler2 = () => {
        setRefreshDate(refreshD)
        setRefreshTimeUnits(refreshTU)
    }

    const onTodayClick = () => {
        const today = new Date()
        const start = new Date(new Date().setHours(0, 0, 0, 0))
        const end = new Date(new Date().setHours(23, 59, 59, 999))
        handlerDateStart(start)
        handlerDateEnd(end)
        let [diffCountStart, diffTimeUnitStart] = humanDiff(start, today)
        let [diffCountEnd, diffTimeUnitEnd] = humanDiff(today, end)
        setFields(
            TimeFormat.RELATIVE,
            TimeFormat.RELATIVE,
            diffCountStart,
            diffTimeUnitStart % 12,
            diffCountEnd,
            diffTimeUnitEnd + 7
        )
    }

    const onWeekClick = () => {
        let today = new Date()
        let startDay = new Date(
            today.setDate(today.getDate() - ((today.getDay() + 6) % 7))
        )
        today = new Date()
        let endDay = new Date(
            today.setDate(today.getDate() + (6 - ((today.getDay() + 6) % 7)))
        )
        startDay = new Date(startDay.setHours(0, 0, 0, 0))
        endDay = new Date(endDay.setHours(23, 59, 59, 999))
        handlerDateStart(startDay)
        handlerDateEnd(endDay)
        today = new Date()
        let [diffCountStart, diffTimeUnitStart] = humanDiff(startDay, today)
        let [diffCountEnd, diffTimeUnitEnd] = humanDiff(today, endDay)
        setFields(
            TimeFormat.RELATIVE,
            TimeFormat.RELATIVE,
            diffCountStart,
            diffTimeUnitStart % 12,
            diffCountEnd,
            diffTimeUnitEnd + 7
        )
    }

    const onMonthClick = () => {
        let today = new Date()
        let startDay = new Date(today.setDate(1))
        today = new Date(today.setMonth(today.getMonth() + 1))
        let endDay = new Date(today.setDate(today.getDate() - 1))
        startDay = new Date(startDay.setHours(0, 0, 0, 0))
        endDay = new Date(endDay.setHours(23, 59, 59, 999))
        handlerDateStart(startDay)
        handlerDateEnd(endDay)
        today = new Date()
        let [diffCountStart, diffTimeUnitStart] = humanDiff(startDay, today)
        let [diffCountEnd, diffTimeUnitEnd] = humanDiff(today, endDay)
        setFields(
            TimeFormat.RELATIVE,
            TimeFormat.RELATIVE,
            diffCountStart,
            diffTimeUnitStart % 12,
            diffCountEnd,
            diffTimeUnitEnd + 7
        )
    }

    const onYearClick = () => {
        let today = new Date()
        let startDay = new Date(today.setFullYear(today.getFullYear(), 0, 1))
        today = new Date(today.setFullYear(startDay.getFullYear() + 1))
        let endDay = new Date(today.setDate(today.getDate() - 1))
        startDay = new Date(startDay.setHours(0, 0, 0, 0))
        endDay = new Date(endDay.setHours(23, 59, 59, 999))
        handlerDateStart(startDay)
        handlerDateEnd(endDay)
        today = new Date()
        let [diffCountStart, diffTimeUnitStart] = humanDiff(startDay, today)
        let [diffCountEnd, diffTimeUnitEnd] = humanDiff(today, endDay)
        setFields(
            TimeFormat.RELATIVE,
            TimeFormat.RELATIVE,
            diffCountStart,
            diffTimeUnitStart % 12,
            diffCountEnd,
            diffTimeUnitEnd + 7
        )
    }

    const onYesterdayClick = () => {
        let today = new Date()
        let startDay = new Date(today.setDate(today.getDate() - 1))
        let endDay = startDay
        startDay = new Date(startDay.setHours(0, 0, 0, 0))
        endDay = new Date(endDay.setHours(23, 59, 59, 999))
        handlerDateStart(startDay)
        handlerDateEnd(endDay)
        today = new Date()
        let [diffCountStart, diffTimeUnitStart] = humanDiff(startDay, today)
        let [diffCountEnd, diffTimeUnitEnd] = humanDiff(endDay, today)
        setFields(
            TimeFormat.RELATIVE,
            TimeFormat.RELATIVE,
            diffCountStart,
            diffTimeUnitStart % 12,
            diffCountEnd,
            diffTimeUnitEnd + 0
        )
    }

    const onWeekToDateClick = () => {
        let today = new Date()
        let startDay = new Date(
            today.setDate(today.getDate() - ((today.getDay() + 6) % 7))
        )
        today = new Date()
        let endDay = today
        startDay = new Date(startDay.setHours(0, 0, 0, 0))
        handlerDateStart(startDay)
        handlerDateEnd(endDay)
        let [diffCountStart, diffTimeUnitStart] = humanDiff(startDay, today)
        setFields(
            TimeFormat.RELATIVE,
            TimeFormat.NOW,
            diffCountStart,
            diffTimeUnitStart % 12,
            0,
            0
        )
    }

    const onMonthToDateClick = () => {
        let today = new Date()
        let startDay = new Date(today.setDate(1))
        today = new Date()
        let endDay = today
        startDay = new Date(startDay.setHours(0, 0, 0, 0))
        handlerDateStart(startDay)
        handlerDateEnd(endDay)
        let [diffCountStart, diffTimeUnitStart] = humanDiff(startDay, today)
        setFields(
            TimeFormat.RELATIVE,
            TimeFormat.NOW,
            diffCountStart,
            diffTimeUnitStart % 12,
            0,
            0
        )
    }

    const onYearToDateClick = () => {
        let today = new Date()
        let startDay = new Date(today.setFullYear(today.getFullYear(), 0, 1))
        today = new Date()
        let endDay = today
        startDay = new Date(startDay.setHours(0, 0, 0, 0))
        handlerDateStart(startDay)
        handlerDateEnd(endDay)
        let [diffCountStart, diffTimeUnitStart] = humanDiff(startDay, today)
        setFields(
            TimeFormat.RELATIVE,
            TimeFormat.NOW,
            diffCountStart,
            diffTimeUnitStart % 12,
            0,
            0
        )
    }

    return (
        <div className={classNames(cls.mainMenu, {}, [className ?? ''])}>
            <div className={cls.quickSelect}>
                Quick Select
                <div className={cls.container}>
                    <Select
                        className={cls.select}
                        onChange={onChangeHandler}
                        value={direction}
                    >
                        <option value={TimeDirection.NEXT}>Next</option>
                        <option value={TimeDirection.FROM}>From</option>
                    </Select>
                    <Input
                        type="number"
                        min="0"
                        className={cls.input}
                        step="1"
                        value={count}
                        onChange={onChangeHandler2}
                    />
                    <Select className={cls.select} onChange={onChangeHandler3}>
                        <option value={TimeUnit.SECOND}>SECOND</option>
                        <option value={TimeUnit.MINUTE}>MINUTE</option>
                        <option value={TimeUnit.HOUR}>HOUR</option>
                        <option value={TimeUnit.DAY}>DAY</option>
                        <option value={TimeUnit.WEEK}>WEEK</option>
                        <option value={TimeUnit.MONTH}>MONTH</option>
                        <option value={TimeUnit.YEAR}>YEAR</option>
                    </Select>
                    <Button className={cls.btnApply} onClick={onClickHandler}>
                        Apply
                    </Button>
                </div>
            </div>
            <div className={cls.commonlyUsed}>
                Commonly Used
                <div className={cls.containerCU}>
                    <div className={cls.left}>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={cls.btn}
                            onClick={onTodayClick}
                        >
                            Today
                        </Button>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={cls.btn}
                            onClick={onWeekClick}
                        >
                            This week
                        </Button>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={cls.btn}
                            onClick={onMonthClick}
                        >
                            This month
                        </Button>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={cls.btn}
                            onClick={onYearClick}
                        >
                            This year
                        </Button>
                    </div>
                    <div className={cls.right}>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={cls.btn}
                            onClick={onYesterdayClick}
                        >
                            Yesterday
                        </Button>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={cls.btn}
                            onClick={onWeekToDateClick}
                        >
                            Week to date
                        </Button>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={cls.btn}
                            onClick={onMonthToDateClick}
                        >
                            Month to date
                        </Button>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            className={cls.btn}
                            onClick={onYearToDateClick}
                        >
                            Year to date
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cls.refreshEvery}>
                Refresh Every
                <div className={cls.container}>
                    <Input
                        type="number"
                        min="0"
                        className={cls.input}
                        step="1"
                        value={refreshD}
                        onChange={onChangeHandler4}
                    />
                    <Select
                        className={cls.select}
                        onChange={onChangeHandler5}
                        value={refreshTU}
                    >
                        <option value={TimeUnit.SECOND}>SECOND</option>
                        <option value={TimeUnit.MINUTE}>MINUTE</option>
                        <option value={TimeUnit.HOUR}>HOUR</option>
                    </Select>
                    <Button className={cls.btnApply} onClick={onClickHandler2}>
                        Apply
                    </Button>
                </div>
            </div>
        </div>
    )
}
