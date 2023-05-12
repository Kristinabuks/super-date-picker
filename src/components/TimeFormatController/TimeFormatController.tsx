import { classNames } from 'helpers/classNames/classNames'
import cls from './TimeFormatController.module.scss'
import { Button, ButtonTheme } from 'components/Button/Button'
import { ChangeEvent, useState } from 'react'
import { Calendar } from 'components/Calendar/Calendar'
import { TimeFormat, TimeUnitR } from 'components/SuperDataPicker'
import { Input } from 'components/Input/Input'
import { Select } from 'components/Select/Select'

interface TimeFormatControllerProps {
    className?: string
    handlerDate?: (date: Date) => void
    date?: Date
    format: TimeFormat
    setFormat: (format: TimeFormat) => void
    relativeTimeUnits: TimeUnitR
    setRelativeTimeUnits: (relativeTimeUnits: TimeUnitR) => void
    relativeDate: number
    setRelativeDate: (relativeDate: number) => void
}

export function getRelativeTimestamp(
    relativeTimeUnits: TimeUnitR,
    relativeDate: number
) {
    let date = new Date()
    switch (relativeTimeUnits) {
        case TimeUnitR.SECOND_AGO:
            return new Date(date.setSeconds(date.getSeconds() - relativeDate))
        case TimeUnitR.MINUTE_AGO:
            return new Date(date.setMinutes(date.getMinutes() - relativeDate))
        case TimeUnitR.HOUR_AGO:
            return new Date(date.setHours(date.getHours() - relativeDate))
        case TimeUnitR.DAY_AGO:
            return new Date(date.setDate(date.getDate() - relativeDate))
        case TimeUnitR.WEEK_AGO:
            return new Date(date.setDate(date.getDate() - relativeDate * 7))
        case TimeUnitR.MONTH_AGO:
            return new Date(date.setMonth(date.getMonth() - relativeDate))
        case TimeUnitR.YEAR_AGO:
            return new Date(date.setFullYear(date.getFullYear() - relativeDate))
        case TimeUnitR.SECOND_FROM:
            return new Date(date.setSeconds(date.getSeconds() + relativeDate))
        case TimeUnitR.MINUTE_FROM:
            return new Date(date.setMinutes(date.getMinutes() + relativeDate))
        case TimeUnitR.HOUR_FROM:
            return new Date(date.setHours(date.getHours() + relativeDate))
        case TimeUnitR.DAY_FROM:
            return new Date(date.setDate(date.getDate() + relativeDate))
        case TimeUnitR.WEEK_FROM:
            return new Date(date.setDate(date.getDate() + relativeDate * 7))
        case TimeUnitR.MONTH_FROM:
            return new Date(date.setMonth(date.getMonth() + relativeDate))
        case TimeUnitR.YEAR_FROM:
            return new Date(date.setFullYear(date.getFullYear() + relativeDate))
    }
}

export const TimeFormatController: React.FC<TimeFormatControllerProps> = (
    props
) => {
    const {
        className,
        handlerDate,
        date,
        format,
        setFormat,
        relativeTimeUnits,
        setRelativeTimeUnits,
        relativeDate,
        setRelativeDate,
    } = props

    const renderMenu = () => {
        const nowHendler = () => {
            handlerDate(new Date())
        }

        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const relativeDate = Number(event.target.value)
            handlerDate(getRelativeTimestamp(relativeTimeUnits, relativeDate))
            setRelativeDate(relativeDate)
        }

        const onChangeHandler2 = (event: ChangeEvent<HTMLSelectElement>) => {
            const relativeTimeUnits = Number(event.target.value)
            handlerDate(getRelativeTimestamp(relativeTimeUnits, relativeDate))
            setRelativeTimeUnits(relativeTimeUnits)
        }

        if (format == TimeFormat.ABSOLUTE) {
            return (
                <div className={cls.calendar}>
                    <Calendar onSelect={handlerDate} />
                </div>
            )
        } else if (format == TimeFormat.RELATIVE) {
            return (
                <div>
                    <div className={cls.relativeMenu}>
                        <Input
                            type="number"
                            min="0"
                            value={relativeDate}
                            className={cls.input}
                            onChange={onChangeHandler}
                            step="1"
                        />
                        <Select
                            onChange={onChangeHandler2}
                            value={relativeTimeUnits}
                        >
                            <option value={TimeUnitR.SECOND_AGO}>
                                SECOND_AGO
                            </option>
                            <option value={TimeUnitR.MINUTE_AGO}>
                                MINUTE_AGO
                            </option>
                            <option value={TimeUnitR.HOUR_AGO}>HOUR_AGO</option>
                            <option value={TimeUnitR.DAY_AGO}>DAY_AGO</option>
                            <option value={TimeUnitR.WEEK_AGO}>
                                WEEKS_AGO
                            </option>
                            <option value={TimeUnitR.MONTH_AGO}>
                                MONTH_AGO
                            </option>
                            <option value={TimeUnitR.YEAR_AGO}>
                                YEAR__AGO
                            </option>
                            <option value={TimeUnitR.SECOND_FROM}>
                                SECOND_FROM
                            </option>
                            <option value={TimeUnitR.MINUTE_FROM}>
                                MINUTE_FROM
                            </option>
                            <option value={TimeUnitR.HOUR_FROM}>
                                HOUR_FROM
                            </option>
                            <option value={TimeUnitR.DAY_FROM}>DAY_FROM</option>
                            <option value={TimeUnitR.WEEK_FROM}>
                                WEEKS_FROM
                            </option>
                            <option value={TimeUnitR.MONTH_FROM}>
                                MONTH_FROM
                            </option>
                            <option value={TimeUnitR.YEAR_FROM}>
                                YEAR_FROM
                            </option>
                        </Select>
                    </div>
                    <div>
                        <p>Дата</p>
                        <p>{date && date.toLocaleString()}</p>
                    </div>
                </div>
            )
        } else if (format === TimeFormat.NOW) {
            return (
                <div className={cls.nowMenu}>
                    <div className={cls.description}>
                        Установка времени на "сейчас" означает, что при каждом
                        обновлении это время будет равно времени обновления.
                    </div>
                    <Button className={cls.btn} onClick={nowHendler}>
                        Установить текущее время и дату
                    </Button>
                </div>
            )
        }
    }

    return (
        <div
            className={classNames(cls.timeFormatController, {}, [
                className ?? '',
            ])}
        >
            <div>
                <div className={cls.wrapper}>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        className={classNames(
                            cls.menuBtn,
                            { [cls.active]: format === TimeFormat.ABSOLUTE },
                            [className ?? '']
                        )}
                        onClick={() => setFormat(TimeFormat.ABSOLUTE)}
                    >
                        Absolute
                    </Button>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        className={classNames(
                            cls.menuBtn,
                            { [cls.active]: format === TimeFormat.RELATIVE },
                            [className ?? '']
                        )}
                        onClick={() => setFormat(TimeFormat.RELATIVE)}
                    >
                        Relative
                    </Button>
                    <Button
                        theme={ButtonTheme.CLEAR}
                        className={classNames(
                            cls.menuBtn,
                            { [cls.active]: format === TimeFormat.NOW },
                            [className ?? '']
                        )}
                        onClick={() => setFormat(TimeFormat.NOW)}
                    >
                        Now
                    </Button>
                </div>
                {renderMenu()}
            </div>
        </div>
    )
}
