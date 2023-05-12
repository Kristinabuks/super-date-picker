import { useEffect, useState } from 'react'
import { Button } from './Button/Button'
import { classNames } from 'helpers/classNames/classNames'
import cls from './SuperDataPicker.module.scss'
import { Popover } from './Popover/Popover'
import {
    TimeFormatController,
    getRelativeTimestamp,
} from './TimeFormatController/TimeFormatController'
import { MainMenu, TimeUnit } from './MainMenu/MainMenu'
import { timeUnitToMilliseconds } from 'helpers/humanConverter/humanConverter'

interface SuperDataPickerProps {
    start: number
    end: number
    setStart: (v: number) => void
    setEnd: (v: number) => void
}

export enum TimeFormat {
    ABSOLUTE,
    RELATIVE,
    NOW,
}

export enum MenuType {
    TimeFormatStart,
    TimeFormatEnd,
    Main,
}

export enum TimeUnitR {
    SECOND_AGO,
    MINUTE_AGO,
    HOUR_AGO,
    DAY_AGO,
    WEEK_AGO,
    MONTH_AGO,
    YEAR_AGO,
    SECOND_FROM,
    MINUTE_FROM,
    HOUR_FROM,
    DAY_FROM,
    WEEK_FROM,
    MONTH_FROM,
    YEAR_FROM,
}

export const SuperDataPicker: React.FC<SuperDataPickerProps> = (props) => {
    const start = props.start ? new Date(props.start) : null
    const end = props.end ? new Date(props.end) : null
    const { setStart, setEnd } = props

    const [startMenuVisible, setStartMenuVisible] = useState(false)
    const [endMenuVisible, setEndMenuVisible] = useState(false)
    const [mainMenuVisible, setMainMenuVisible] = useState(false)
    const [formatStart, setFormatStart] = useState<TimeFormat>(
        TimeFormat.ABSOLUTE
    )
    const [formatEnd, setFormatEnd] = useState<TimeFormat>(TimeFormat.ABSOLUTE)
    const [relativeDateStart, setRelativeDateStart] = useState<number>(0)
    const [relativeTimeUnitsStart, setRelativeTimeUnitsStart] =
        useState<TimeUnitR>(TimeUnitR.SECOND_AGO)
    const [relativeDateEnd, setRelativeDateEnd] = useState<number>(0)
    const [relativeTimeUnitsEnd, setRelativeTimeUnitsEnd] = useState<TimeUnitR>(
        TimeUnitR.SECOND_AGO
    )
    const [refreshDate, setRefreshDate] = useState<number>(0)
    const [refreshTimeUnits, setRefreshTimeUnits] = useState<TimeUnit>(
        TimeUnit.SECOND
    )

    useEffect(() => {
        const intervalMs =
            refreshDate * timeUnitToMilliseconds(refreshTimeUnits)
        if (intervalMs === 0) {
            return
        }
        const interval: number = window.setInterval(() => {
            switch (+formatStart) {
                case TimeFormat.NOW:
                    setStart(Number(new Date()))
                    break
                case TimeFormat.RELATIVE:
                    setStart(
                        Number(
                            getRelativeTimestamp(
                                relativeTimeUnitsStart,
                                relativeDateStart
                            )
                        )
                    )
                    break
            }

            switch (+formatEnd) {
                case TimeFormat.NOW:
                    setEnd(Number(new Date()))
                    break
                case TimeFormat.RELATIVE:
                    setEnd(
                        Number(
                            getRelativeTimestamp(
                                relativeTimeUnitsEnd,
                                relativeDateEnd
                            )
                        )
                    )
                    break
            }
        }, intervalMs)
        return () => {
            clearInterval(interval)
        }
    }, [formatStart, formatEnd, refreshDate, refreshTimeUnits])

    const handlerStart = () => {
        if (!startMenuVisible) {
            setEndMenuVisible(false)
            setMainMenuVisible(false)
        }
        setStartMenuVisible(!startMenuVisible)
    }

    const handlerEnd = () => {
        if (!endMenuVisible) {
            setStartMenuVisible(false)
            setMainMenuVisible(false)
        }
        setEndMenuVisible(!endMenuVisible)
    }

    const handlerMenu = () => {
        if (!mainMenuVisible) {
            setEndMenuVisible(false)
            setStartMenuVisible(false)
        }
        setMainMenuVisible(!mainMenuVisible)
    }

    const handlerStartDate = (date: Date) => {
        setStart(Number(date))
    }

    const handlerEndDate = (date: Date) => {
        setEnd(Number(date))
    }

    function setFields(
        formatStart: TimeFormat,
        formatEnd: TimeFormat,
        relativeDateStart: number = 0,
        relativeTimeUnitsStart: TimeUnitR = 0,
        relativeDateEnd: number = 0,
        relativeTimeUnitsEnd: TimeUnitR = 0
    ) {
        setFormatStart(formatStart)
        setFormatEnd(formatEnd)
        if (formatStart === TimeFormat.RELATIVE) {
            setRelativeDateStart(relativeDateStart)
            setRelativeTimeUnitsStart(relativeTimeUnitsStart)
        }
        if (formatEnd === TimeFormat.RELATIVE) {
            setRelativeDateEnd(relativeDateEnd)
            setRelativeTimeUnitsEnd(relativeTimeUnitsEnd)
        }
    }

    return (
        <div className={classNames(cls.superDataPicker)}>
            <div className={cls.leftContainer}>
                <Button className={cls.btn} onClick={handlerMenu}>
                    Menu
                </Button>
                <Popover
                    isOpen={mainMenuVisible}
                    onClose={() => setMainMenuVisible(false)}
                >
                    <MainMenu
                        handlerDateStart={handlerStartDate}
                        handlerDateEnd={handlerEndDate}
                        relativeDateStart={relativeDateStart}
                        relativeTimeUnitsStart={relativeTimeUnitsStart}
                        relativeDateEnd={relativeDateEnd}
                        relativeTimeUnitsEnd={relativeTimeUnitsEnd}
                        setFields={setFields}
                        refreshDate={refreshDate}
                        setRefreshDate={setRefreshDate}
                        refreshTimeUnits={refreshTimeUnits}
                        setRefreshTimeUnits={setRefreshTimeUnits}
                    />
                </Popover>
            </div>
            <div className={classNames(cls.rightContainer)}>
                <div className={cls.startTime}>
                    <Button className={cls.btn} onClick={handlerStart}>
                        {start && start.toLocaleString()}
                    </Button>
                    <Popover
                        isOpen={startMenuVisible}
                        onClose={() => setStartMenuVisible(false)}
                    >
                        <TimeFormatController
                            handlerDate={handlerStartDate}
                            date={start}
                            format={formatStart}
                            setFormat={setFormatStart}
                            relativeDate={relativeDateStart}
                            setRelativeDate={setRelativeDateStart}
                            relativeTimeUnits={relativeTimeUnitsStart}
                            setRelativeTimeUnits={setRelativeTimeUnitsStart}
                        />
                    </Popover>
                </div>
                <div className={cls.endTime}>
                    <Button className={cls.btn} onClick={handlerEnd}>
                        {end && end.toLocaleString()}
                    </Button>
                    <Popover
                        isOpen={endMenuVisible}
                        onClose={() => setEndMenuVisible(false)}
                    >
                        <TimeFormatController
                            handlerDate={handlerEndDate}
                            date={end}
                            format={formatEnd}
                            setFormat={setFormatEnd}
                            relativeDate={relativeDateEnd}
                            setRelativeDate={setRelativeDateEnd}
                            relativeTimeUnits={relativeTimeUnitsEnd}
                            setRelativeTimeUnits={setRelativeTimeUnitsEnd}
                        />
                    </Popover>
                </div>
            </div>
        </div>
    )
}
