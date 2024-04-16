import { create } from 'zustand'
import { DateTime } from 'luxon'
import type {
  ClassConfig,
  DateSchedule,
  Timetable,
  TimetableClass,
  TimetableKey,
} from '../types'
import { getWeek } from '../utilities/getWeekDay'
import { truthy } from '../utilities/truthy'

type TimetableStore = {
  timetables: Timetable[]
  createTimetable: (
    firstDate: string,
    classes: ClassConfig[],
    schedule: DateSchedule[],
  ) => void
  updateTimetables: (newTimetables: Timetable[]) => void
  updateTimetableNote: (weekIndex: number, newNote: string) => void
  updateTimetableShowSaturday: (
    weekIndex: number,
    showSaturday: boolean,
  ) => void
  updateTimetableShowSunday: (weekIndex: number, showSunday: boolean) => void
  loadTimetable: (timetables: Timetable[]) => void
}

const getInitialTimetable = (
  firstDate: string,
  classConfig: ClassConfig[],
  schedule: DateSchedule[],
): Timetable => {
  const firstDateTime = DateTime.fromISO(firstDate)

  const timetableList = [...Array(7)].map((_, index) => {
    const dateTime = firstDateTime.plus({ day: index })

    const dateSchedule = schedule[getWeek(dateTime)]

    const timetableDate = classConfig.reduce(
      (acc, current) => {
        const scheduledClass = dateSchedule[current.id]
        return {
          ...acc,
          [current.id]: { subject: [scheduledClass].filter(truthy), note: '' },
        }
      },
      {} as Record<TimetableKey, TimetableClass>,
    )

    return {
      date: dateTime.toISODate() ?? '',
      classes: timetableDate,
    }
  })

  return {
    firstDate,
    note: '',
    showSaturday: false,
    showSunday: false,
    list: timetableList,
  }
}

export const useTimetableStore = create<TimetableStore>((set) => ({
  timetables: [],
  createTimetable: (
    firstDate: string,
    classes: ClassConfig[],
    schedule: DateSchedule[],
  ) => {
    set((state) => {
      const newTimetables = [
        ...state.timetables,
        getInitialTimetable(firstDate, classes, schedule),
      ].sort((a, b) => {
        return (
          DateTime.fromISO(a.firstDate).toMillis() -
          DateTime.fromISO(b.firstDate).toMillis()
        )
      })
      return {
        ...state,
        timetables: newTimetables,
      }
    })
  },
  updateTimetables: (newTimetables) => {
    set((state) => ({
      ...state,
      timetables: newTimetables,
    }))
  },
  updateTimetableNote: (weekIndex, newNote) => {
    set((state) => ({
      ...state,
      timetables: state.timetables.map((timetable, index) => {
        if (index === weekIndex) {
          return { ...timetable, note: newNote }
        }
        return timetable
      }),
    }))
  },
  updateTimetableShowSaturday: (weekIndex, showSaturday) => {
    set((state) => ({
      ...state,
      timetables: state.timetables.map((timetable, index) => {
        if (index === weekIndex) {
          return { ...timetable, showSaturday }
        }
        return timetable
      }),
    }))
  },
  updateTimetableShowSunday: (weekIndex, showSunday) => {
    set((state) => ({
      ...state,
      timetables: state.timetables.map((timetable, index) => {
        if (index === weekIndex) {
          return { ...timetable, showSunday }
        }
        return timetable
      }),
    }))
  },
  loadTimetable: (timetables) => {
    set((state) => ({
      ...state,
      timetables,
    }))
  },
}))
