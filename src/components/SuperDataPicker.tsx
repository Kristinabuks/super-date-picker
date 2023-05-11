import { useState } from "react";
import { Button } from "./Button/Button";
import { classNames } from "helpers/classNames/classNames";
import cls from './SuperDataPicker.module.scss'
import { Popover } from "./Popover/Popover";
import { TimeFormatController } from "./TimeFormatController/TimeFormatController";
import { MainMenu } from "./MainMenu/MainMenu";

interface SuperDataPickerProps {
}

export const SuperDataPicker: React.FC<SuperDataPickerProps> = (props) => {
    const [start, setStart] = useState<Date>()
    const [end, setEnd] = useState<Date>()
    const [startMenuVisible, setStartMenuVisible] = useState(false)
    const [endMenuVisible, setEndMenuVisible] = useState(false)
    const [mainMenuVisible, setMainMenuVisible] = useState(false)

    const handlerStart = () => {
        if(!startMenuVisible){
            setEndMenuVisible(false)
            setMainMenuVisible(false)
        }
        setStartMenuVisible(!startMenuVisible)
    }

    const handlerEnd = () => {
        if(!endMenuVisible){
            setStartMenuVisible(false)
            setMainMenuVisible(false)
        }
        setEndMenuVisible(!endMenuVisible)
    }

    const handlerMenu = () => {
        if(!mainMenuVisible){
            setEndMenuVisible(false)
            setStartMenuVisible(false)
        }
        setMainMenuVisible(!mainMenuVisible)
    }

    const handlerStartDate = (props: Date) => {
        setStart(props)
    }

    const handlerEndDate = (props: Date) => {
        setEnd(props)
    }

    return (
        <div className={classNames(cls.superDataPicker)}>
            <div className={cls.leftContainer}>
                <Button className={cls.btn} onClick={handlerMenu}>
                    К
                </Button>
                <Popover isOpen={mainMenuVisible}>
                        <MainMenu handlerDateStart={handlerStartDate} handlerDateEnd={handlerEndDate}/>
                </Popover>
            </div>
            <div className={classNames(cls.rightContainer)}>
                <div className={cls.startTime}>
                    <Button className={cls.btn} onClick={handlerStart}>{start && start.toLocaleString()}</Button>
                    <Popover isOpen={startMenuVisible}>
                        <TimeFormatController handlerDate={handlerStartDate} date={start}/>
                    </Popover>
                </div>
                <div className={cls.endTime}>
                    <Button className={cls.btn} onClick={handlerEnd}>{end && end.toLocaleString()}</Button>
                    <Popover isOpen={endMenuVisible}>
                        <TimeFormatController handlerDate={handlerEndDate} date={end}/>
                    </Popover>
                </div>
            </div>
        </div>
 );
}