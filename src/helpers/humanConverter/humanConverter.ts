import { TimeUnit } from 'components/MainMenu/MainMenu'

export function timeUnitToMilliseconds(unit: TimeUnit): number {
    switch (unit) {
        case TimeUnit.YEAR:
            return 31536000000
        case TimeUnit.MONTH:
            return 2629800000
        case TimeUnit.WEEK:
            return 604800000
        case TimeUnit.DAY:
            return 86400000
        case TimeUnit.HOUR:
            return 3600000
        case TimeUnit.MINUTE:
            return 60000
        case TimeUnit.SECOND:
            return 1000
    }
}

export function convertToHuman(milliseconds: number): [number, TimeUnit] {
    for (const unit of [
        TimeUnit.YEAR,
        TimeUnit.MONTH,
        TimeUnit.WEEK,
        TimeUnit.DAY,
        TimeUnit.HOUR,
    ]) {
        const normTs = milliseconds / timeUnitToMilliseconds(unit)
        if (Math.trunc(normTs) >= 1) {
            return [Math.round(normTs), unit]
        }
    }

    return [
        Math.round(milliseconds / timeUnitToMilliseconds(TimeUnit.MINUTE)),
        TimeUnit.MINUTE,
    ]
}
