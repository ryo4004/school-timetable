import { create } from 'zustand'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import type { ClassConfig, TimetableConfig, TimetableYear } from '../types'

type TimetableStore = {
  year: 2024
  timetable: TimetableYear
  config: TimetableConfig
  updateTimetable: (classes: ClassConfig[]) => void
}

const getFirstDate = (year: number) => {
  return DateTime.fromJSDate(new Date(year, 4, 1)).startOf('week')
}

const getInitialTimetable = (year: number) => {
  const firstDate = getFirstDate(year)
}

const getInitialTimetableConfig = () => {
  return [
    { id: uuidv4(), name: '' },
    { id: uuidv4(), name: '1' },
    { id: uuidv4(), name: '2' },
    { id: uuidv4(), name: '' },
    { id: uuidv4(), name: '3' },
    { id: uuidv4(), name: '4' },
    { id: uuidv4(), name: '' },
    { id: uuidv4(), name: '5' },
    { id: uuidv4(), name: '6' },
  ]
}

export const useTimetableStore = create<TimetableStore>((set) => ({
  year: 2024,
  timetable: [],
  config: {
    classes: getInitialTimetableConfig(),
  },
  updateTimetable: (updateClasses: ClassConfig[]) => {
    return set((state) => ({
      ...state,
      config: { ...state.config, classes: updateClasses },
    }))
  },
}))
