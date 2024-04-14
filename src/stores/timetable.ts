import { create } from 'zustand'
import { DateTime } from 'luxon'
import type {
  ClassConfig,
  Timetable,
  TimetableClass,
  TimetableKey,
} from '../types'

type TimetableStore = {
  timetables: Timetable[]
  createTimetable: (firstDate: string, classes: ClassConfig[]) => void
  updateTimetables: (newTimetables: Timetable[]) => void
  loadTimetable: (timetable: Timetable) => void
}

const getInitialTimetable = (
  firstDate: string,
  classConfig: ClassConfig[],
): Timetable => {
  const firstDateTime = DateTime.fromISO(firstDate)

  const timetableDate = classConfig.reduce(
    (acc, current) => {
      return { ...acc, [current.id]: { subject: [], note: '' } }
    },
    {} as Record<TimetableKey, TimetableClass>,
  )

  const timetableList = [...Array(7)].map((_, index) => {
    return {
      date: firstDateTime.plus({ day: index }).toISODate() ?? '',
      classes: timetableDate,
    }
  })

  return {
    firstDate,
    note: '',
    list: timetableList,
  }
}

export const useTimetableStore = create<TimetableStore>((set) => ({
  timetables: [],
  createTimetable: (firstDate: string, classes: ClassConfig[]) => {
    set((state) => ({
      ...state,
      timetables: [
        ...state.timetables,
        getInitialTimetable(firstDate, classes),
      ],
    }))
  },
  updateTimetables: (newTimetables) => {
    set((state) => ({
      ...state,
      timetables: newTimetables,
    }))
  },
  loadTimetable: (timetable) => {
    set((state) => ({
      ...state,
      timetable,
    }))
  },
}))
