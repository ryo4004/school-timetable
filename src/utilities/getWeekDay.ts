import { DateTime } from 'luxon'

export const WEEKDAYS = ['月', '火', '水', '木', '金', '土', '日'] as const

export type Weekday = (typeof WEEKDAYS)[number]

export const getWeek = (dateTime: DateTime) => {
  return Number(dateTime.toFormat('c')) - 1
}

export const getWeekDay = (dateTime: DateTime) => {
  return WEEKDAYS[getWeek(dateTime)]
}

export const getWeekNumber = (weekday: Weekday) => {
  return WEEKDAYS.findIndex((w) => w === weekday)
}

type ISOString = string

export const isMonday = (date: ISOString) => {
  return getWeek(DateTime.fromISO(date)) === 0
}

export const isSaturday = (date: ISOString) => {
  return getWeek(DateTime.fromISO(date)) === 5
}

export const isSunday = (date: ISOString) => {
  return getWeek(DateTime.fromISO(date)) === 6
}
