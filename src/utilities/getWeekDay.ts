import type { DateTime } from 'luxon'

export const WEEKDAYS = ['月', '火', '水', '木', '金', '土', '日'] as const

export type Weekday = (typeof WEEKDAYS)[number]

export const getWeekDay = (dateTime: DateTime) => {
  return WEEKDAYS[Number(dateTime.toFormat('c')) - 1]
}

export const getWeekNumber = (weekday: Weekday) => {
  return WEEKDAYS.findIndex((w) => w === weekday)
}
