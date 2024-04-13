import { create } from 'zustand'
import { DateTime } from 'luxon'
import type { ClassConfig, TimetableDate, Timetable } from '../types'

type TimetableStore = {
  timetables: Timetable[]
  createTimetable: (firstDate: string, classes: ClassConfig[]) => void
  updateTimetableDate: (weekIndex: number, timetableDate: TimetableDate) => void
  loadTimetable: (timetable: Timetable) => void
}

const getInitialTimetable = (
  firstDate: string,
  classConfig: ClassConfig[],
): Timetable => {
  const firstDateTime = DateTime.fromISO(firstDate)

  const timetableDate = classConfig.reduce((acc, current) => {
    return { ...acc, [current.id]: { subject: [], note: '' } }
  }, {})

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
  updateTimetableDate: (weekIndex, timetableDate) => {
    set((state) => ({
      ...state,
      timetables: state.timetables.map((timetable, index) => {
        if (index === weekIndex) {
          return {
            ...timetable,
            list: timetable.list.map((item) => {
              if (item.date === timetableDate.date) {
                return timetableDate
              }
              return item
            }),
          }
        }
        return timetable
      }),
    }))
  },
  loadTimetable: (timetable) => {
    set((state) => ({
      ...state,
      timetable,
    }))
  },
}))
