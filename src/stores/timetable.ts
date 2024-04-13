import { create } from 'zustand'
import { DateTime } from 'luxon'
import type { ClassConfig, TimetableDate, Timetable } from '../types'

type TimetableStore = {
  timetable: Timetable
  createTimetable: (year: number, classes: ClassConfig[]) => void
  updateTimetableDate: (timetableDate: TimetableDate) => void
  loadTimetable: (timetable: Timetable) => void
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
): Timetable => {
  const firstDate = getFirstDate(year)
  const lastDate = getLastDate(year)
  const diff = Math.round(lastDate.diff(firstDate, 'days').days)
  const timetableDate = classConfig.reduce((acc, current) => {
    return { ...acc, [current.id]: { subject: [], note: '' } }
  }, {})

  const timetableList = [...Array(diff)].map((_, index) => {
    return {
      date: firstDate.plus({ day: index }).toISODate() ?? '',
      classes: timetableDate,
    }
  })

  const weeks = timetableList
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

  return {
    weeks,
    list: timetableList,
  }
}

export const useTimetableStore = create<TimetableStore>((set) => ({
  timetable: {
    weeks: [],
    list: [],
  },
  createTimetable: (year: number, classes: ClassConfig[]) => {
    set((state) => ({
      ...state,
      timetable: {
        ...state.timetable,
        timetables: getInitialTimetable(year, classes),
      },
    }))
  },
  updateTimetableDate: (timetableDate) => {
    set((state) => ({
      ...state,
      timetable: {
        ...state.timetable,
        list: state.timetable.list.map((item) => {
          if (item.date === timetableDate.date) {
            return timetableDate
          }
          return item
        }),
      },
    }))
  },
  loadTimetable: (timetable) => {
    set((state) => ({
      ...state,
      timetable,
    }))
  },
}))
