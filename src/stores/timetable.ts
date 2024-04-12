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
  return DateTime.fromISO(`${year + 1}-03-31`)
    .endOf('week')
    .plus({ day: 1 })
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

  const fullYearTimetables = [...Array(diff)].map((acc) => ({
    date: firstDate.plus({ day: acc }).toISODate() ?? '',
    classes: timetableDate,
  }))

  return {
    weeks: [],
    timetables: fullYearTimetables,
  }
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
