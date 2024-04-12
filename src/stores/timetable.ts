import { create } from 'zustand'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import type {
  ClassConfig,
  TimetableConfig,
  TimetableDate,
  Timetables,
} from '../types'

export type Timetable = {
  year: number | null
  timetables: Timetables
  config: TimetableConfig
}

type TimetableStore = {
  timetable: Timetable
  createTimetable: (year: number) => void
  updateTimetable: (classes: ClassConfig[]) => void
  updateTimetableDate: (timetableDate: TimetableDate) => void
  updateSubjects: (subjects: string[]) => void
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
): Timetables => {
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
  timetable: {
    year: null,
    timetables: { weeks: [], list: [] },
    config: {
      classes: getInitialTimetableConfig(),
      subjects: [],
    },
  },
  createTimetable: (year: number) => {
    set((state) => ({
      ...state,
      timetable: {
        ...state.timetable,
        timetables: getInitialTimetable(year, state.timetable.config.classes),
      },
    }))
  },
  updateTimetable: (updateClasses: ClassConfig[]) => {
    set((state) => ({
      ...state,
      timetable: {
        ...state.timetable,
        config: { ...state.timetable.config, classes: updateClasses },
      },
    }))
  },
  updateTimetableDate: (timetableDate) => {
    set((state) => ({
      ...state,
      timetable: {
        ...state.timetable,
        timetables: {
          ...state.timetable.timetables,
          list: state.timetable.timetables.list.map((item) => {
            if (item.date === timetableDate.date) {
              return timetableDate
            }
            return item
          }),
        },
      },
    }))
  },
  updateSubjects: (subjects) => {
    set((state) => ({
      ...state,
      timetable: {
        ...state.timetable,
        config: {
          ...state.timetable.config,
          subjects,
        },
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
