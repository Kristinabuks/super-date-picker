import { TimeFormat, TimeUnitR } from "components/SuperDataPicker";
import { convertToHuman } from "helpers/humanConverter/humanConverter";

function unit(num: number){
    switch(num){
        case 0:
            return 'second'
        case 1:
            return 'minute'
        case 2:
            return 'hour'
        case 3:
            return 'day'
        case 4:
            return 'week'
        case 5:
            return 'month'
        case 6:
            return 'year'      
    }

}

export function formater(timeFormat: TimeFormat, relativeDate: number, relativeTimeUnits: TimeUnitR, date: Date){
    if (timeFormat === TimeFormat.NOW){
        return "Now"
    }
    if (timeFormat === TimeFormat.ABSOLUTE){
        return date.toLocaleString()
    }
    if (timeFormat === TimeFormat.RELATIVE){
        if (relativeTimeUnits < 7){
            const [diffCount, diffTimeUnit] = convertToHuman(Number(new Date) - Number(date))
            return `~ ${diffCount} ${unit(diffTimeUnit)} ago`
        }
        if (relativeTimeUnits >= 7){
            const [diffCount, diffTimeUnit] = convertToHuman( Number(date) - Number(new Date))
            return `~ in ${diffCount} ${unit(diffTimeUnit)}`
        }
        
    }
}