import { create } from 'zustand'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import type { ClassConfig, TimetableConfig, Timetables } from '../types'

type TimetableStore = {
  year: number | null
  timetable: Timetables
  createTimetable: (year: number) => void
  config: TimetableConfig
  updateTimetable: (classes: ClassConfig[]) => void
}

const getFirstDate = (year: number) => {
  return DateTime.fromISO(`${year}-04-01`).startOf('week').minus({ day: 1 })
}

const getLastDate = (year: number) => {
  return DateTime.fromISO(`${year + 1}-03-31`).endOf('week')
}

const getInitialTimetable = (
  year: number,
  classConfig: ClassConfig[],
): Timetables => {
  const firstDate = getFirstDate(year)
  const lastDate = getLastDate(year)
  const diff = Math.round(lastDate.diff(firstDate, 'days').days)
  const timetableDate = classConfig.reduce((acc, current) => {
    return { ...acc, [current.id]: { subject: [], note: '' } }
  }, {})

  const timetables = [...Array(diff)].map((_, index) => {
    return {
      date: firstDate.plus({ day: index }).toISODate() ?? '',
      classes: timetableDate,
    }
  })

  const weeks = timetables
    .filter((timetable) => {
      const date = DateTime.fromISO(timetable.date)
      return date.toFormat('c') === '1' // 月曜日
    })
    .map((timetable) => {
      return {
        firstDate: timetable.date,
        note: '',
      }
    })

  console.log({ weeks, timetables })

  return {
    weeks,
    timetables,
  }
}

const getInitialTimetableConfig = () => {
  return [
    { id: getUniqueId(), name: '' },
    { id: getUniqueId(), name: '1' },
    { id: getUniqueId(), name: '2' },
    { id: getUniqueId(), name: '' },
    { id: getUniqueId(), name: '3' },
    { id: getUniqueId(), name: '4' },
    { id: getUniqueId(), name: '' },
    { id: getUniqueId(), name: '5' },
    { id: getUniqueId(), name: '6' },
  ]
}

const getUniqueId = () => {
  return uuidv4().split('-')[0]
}

export const useTimetableStore = create<TimetableStore>((set) => ({
  year: null,
  timetable: { weeks: [], timetables: [] },
  createTimetable: (year: number) => {
    set((state) => ({
      ...state,
      timetable: getInitialTimetable(year, state.config.classes),
    }))
  },
  config: {
    classes: getInitialTimetableConfig(),
  },
  updateTimetable: (updateClasses: ClassConfig[]) => {
    set((state) => ({
      ...state,
      config: { ...state.config, classes: updateClasses },
    }))
  },
}))
