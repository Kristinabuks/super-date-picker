import { classNames } from 'helpers/classNames/classNames'
import cls from './TimeFormatController.module.scss'
import { Button } from 'components/Button/Button'
import { ChangeEvent, useState } from 'react'
import { Calendar } from 'components/Calendar/Calendar'

interface TimeFormatControllerProps {
    className?: string,
    handlerDate?: Function,
    date?: Date
}

interface renderMenuProps {
    format: TimeFormat,
    handlerDate?: Function,
    date?: Date
}

enum TimeFormat {
    ABSOLUTE,
    RELATIVE,
    NOW
}

enum TimeUnit {
    SECOND_AGO,
    MINUTE_AGO,
    HOUR_AGO,
    DAY_AGO,
    WEEKS_AGO,
    MONTH_AGO,
    YEAR__AGO,
    SECOND_FROM,
    MINUTE_FROM,
    HOUR_FROM,
    DAY_FROM,
    WEEKS_FROM,
    MONTH_FROM,
    YEAR_FROM,
}

function getRelativeTimestamp(relativeTimeUnits: TimeUnit, relativeDate: number) {
    let date = new Date ()
    switch (relativeTimeUnits) {
        case TimeUnit.SECOND_AGO:
            return new Date(date.setSeconds(date.getSeconds() - relativeDate))
        case TimeUnit.MINUTE_AGO:
            return new Date(date.setMinutes(date.getMinutes() - relativeDate))
        case TimeUnit.HOUR_AGO:
            return new Date(date.setHours(date.getHours() - relativeDate))
        case TimeUnit.DAY_AGO:
            return new Date(date.setDate(date.getDate() - relativeDate))
        case TimeUnit.WEEKS_AGO:
            return new Date(date.setDate(date.getDate() - relativeDate * 7))
        case TimeUnit.MONTH_AGO:
            return new Date(date.setMonth(date.getMonth() - relativeDate))
        case TimeUnit.YEAR__AGO:
            return new Date(date.setFullYear(date.getFullYear() - relativeDate))
        case TimeUnit.SECOND_FROM:
            return new Date(date.setSeconds(date.getSeconds() + relativeDate))
        case TimeUnit.MINUTE_FROM:
            return new Date(date.setMinutes(date.getMinutes() + relativeDate))
        case TimeUnit.HOUR_FROM:
            return new Date(date.setHours(date.getHours() + relativeDate))
        case TimeUnit.DAY_FROM:
            return new Date(date.setDate(date.getDate() + relativeDate))
        case TimeUnit.WEEKS_FROM:
            return new Date(date.setDate(date.getDate() + relativeDate * 7))
        case TimeUnit.MONTH_FROM:
            return new Date(date.setMonth(date.getMonth() + relativeDate))
        case TimeUnit.YEAR_FROM:
            return new Date(date.setFullYear(date.getFullYear() + relativeDate))
    }
}

const renderMenu = (props: renderMenuProps) =>{
    const { format, handlerDate, date } = props
    const [ relativeDate, setRelativeDate ] = useState<number>(0)
    const [ relativeTimeUnits, setRelativeTimeUnits] = useState<TimeUnit>(TimeUnit.SECOND_AGO)

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

    if (format == TimeFormat.ABSOLUTE){
        return <div>
            <Calendar/>
        </div>
    } else if (format == TimeFormat.RELATIVE){
        return <div>
            <div className={cls.relativeMenu}>
                <input type="number" min="0" value={relativeDate} className={cls.input} onChange={onChangeHandler} step="1" />
                <select onChange={onChangeHandler2}>
                    <option value={TimeUnit.SECOND_AGO}>SECOND_AGO</option>
                    <option value={TimeUnit.MINUTE_AGO}>MINUTE_AGO</option>
                    <option value={TimeUnit.HOUR_AGO}>HOUR_AGO</option>
                    <option value={TimeUnit.DAY_AGO}>DAY_AGO</option>
                    <option value={TimeUnit.WEEKS_AGO}>WEEKS_AGO</option>
                    <option value={TimeUnit.MONTH_AGO}>MONTH_AGO</option>
                    <option value={TimeUnit.YEAR__AGO}>YEAR__AGO</option>
                    <option value={TimeUnit.SECOND_FROM}>SECOND_FROM</option>
                    <option value={TimeUnit.MINUTE_FROM}>MINUTE_FROM</option>
                    <option value={TimeUnit.HOUR_FROM}>HOUR_FROM</option>
                    <option value={TimeUnit.DAY_FROM}>DAY_FROM</option>
                    <option value={TimeUnit.WEEKS_FROM}>WEEKS_FROM</option>
                    <option value={TimeUnit.MONTH_FROM}>MONTH_FROM</option>
                    <option value={TimeUnit.YEAR_FROM}>YEAR_FROM</option>
                </select>
            </div> 
            <div>
                <p>Дата</p>
                <p>{date && date.toLocaleString()}</p>
            </div>
        </div>
    } else if (format === TimeFormat.NOW) {
        return <div className={cls.nowMenu}>
            <div className={cls.description}>Установка времени на "сейчас" означает, что при каждом обновлении это время будет равно времени обновления.</div>
            <Button className={cls.btn} onClick={nowHendler}>Установить текущее время и дату</Button>
        </div>
    }
}

export const TimeFormatController: React.FC<TimeFormatControllerProps> = (props) => {
    const { className, handlerDate, date} = props

    const [format, setFormat] = useState(TimeFormat.ABSOLUTE)

    return (
        <div className={classNames(cls.timeFormatController, {}, [className ?? ''])}>
            <div>
                <div className={cls.wrapper}>
                    <Button className={cls.menuBtn} onClick={()=>setFormat(TimeFormat.ABSOLUTE)}>Absolute</Button>
                    <Button className={cls.menuBtn} onClick={()=>setFormat(TimeFormat.RELATIVE)}>Relative</Button>
                    <Button className={cls.menuBtn} onClick={()=>setFormat(TimeFormat.NOW)}>Now</Button>
                </div>
                {renderMenu({format, handlerDate, date})}       
            </div>
        </div>
 );
}

