
import { classNames } from 'helpers/classNames/classNames';
import cls from './MainMenu.module.scss'
import { ChangeEvent, useState } from 'react';
import { Button } from 'components/Button/Button';

interface MainMenuProps {
    className?: string,
    handlerDateStart?: Function,
    handlerDateEnd?: Function,
    date?: Date
}

enum TimeDirection {
    NEXT,
    FROM
}

enum TimeUnit {
    SECOND,
    MINUTE,
    HOUR,
    DAY,
    WEEKS,
    MONTH,
    YEAR
}

const getTimestamp = (timeUnit: TimeUnit, direction: TimeDirection, count: number) => {
    let date = new Date ()
        console.log('Дата сейчас', date)

        if (direction === TimeDirection.FROM){
            count = -count
        }

        switch (timeUnit) {
            case TimeUnit.SECOND:
                return (new Date(date.setSeconds(date.getSeconds() + count)))
            case TimeUnit.MINUTE:
                return (new Date(date.setMinutes(date.getMinutes() + count)))
            case TimeUnit.HOUR:
                return (new Date(date.setHours(date.getHours() + count)))
            case TimeUnit.DAY:
                return (new Date(date.setDate(date.getDate() + count)))
            case TimeUnit.WEEKS:
                return (new Date(date.setDate(date.getDate() + count * 7)))
            case TimeUnit.MONTH:
                return (new Date(date.setMonth(date.getMonth() + count)))
            case TimeUnit.YEAR:
                return (new Date(date.setFullYear(date.getFullYear() + count)))
        }
}

export const MainMenu: React.FC<MainMenuProps> = (props) => {
    const { className, handlerDateStart, handlerDateEnd } = props
    const [ direction, setDirection ] = useState<TimeDirection>(TimeDirection.FROM)
    const [ count, setCount ] = useState<number>(0)
    const [ timeUnit, setTimeUnit ] = useState<TimeUnit>(TimeUnit.SECOND)

    const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setDirection(Number(event.target.value)) 
    }

    const onChangeHandler2 = (event: ChangeEvent<HTMLInputElement>) => {
        setCount(Number(event.target.value))
    }

    const onChangeHandler3 = (event: ChangeEvent<HTMLSelectElement>) => {
        setTimeUnit(Number(event.target.value))
    }

    const onClickHandler = () => {
        if (direction == TimeDirection.NEXT){
            handlerDateStart(new Date())
            handlerDateEnd(getTimestamp(timeUnit, direction,count))
        } else if (direction == TimeDirection.FROM){
            handlerDateEnd(new Date())
            handlerDateStart(getTimestamp(timeUnit, direction,count))
        }
    }

    const onTodayClick = () => {
        let today = new Date()
        handlerDateStart(new Date(today.setHours(0, 0, 0, 0)))
        handlerDateEnd(new Date(today.setHours(23, 59, 59, 999)))
    }

    return (
        <div className={classNames(cls.mainMenu, {}, [className ?? ''])}>
            <div className={cls.quickSelect}>
                quickSelect
                <div className={cls.container}>
                    <select onChange={onChangeHandler}>
                        <option value={TimeDirection.NEXT}>Next</option>
                        <option value={TimeDirection.FROM}>From</option>
                    </select>
                    <input type="number"  min="0" className={cls.input} step="1" value={count} onChange={onChangeHandler2}/>
                    <select onChange={onChangeHandler3}>
                        <option value={TimeUnit.SECOND}>SECOND</option>
                        <option value={TimeUnit.MINUTE}>MINUTE</option>
                        <option value={TimeUnit.HOUR}>HOUR</option>
                        <option value={TimeUnit.DAY}>DAY</option>
                        <option value={TimeUnit.WEEKS}>WEEKS</option>
                        <option value={TimeUnit.MONTH}>MONTH</option>
                        <option value={TimeUnit.YEAR}>YEAR</option>
                    </select>
                    <Button onClick={onClickHandler}>Apply</Button>
                </div>               
            </div>
            <div className={cls.commonlyUsed}>
                commonlyUsed
                <Button onClick={onTodayClick}>Today</Button>
            </div>
            <div className={cls.refreshEvery}>refreshEvery</div>
        </div>
 );
}