import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type {
  ClassConfig,
  TimetableConfig,
  TimetableKey,
  DateSchedule,
} from '../types'

export type ConfigStore = {
  config: TimetableConfig
  updateTimetable: (classes: ClassConfig[]) => void
  updateSchedule: (index: number, dateSchedule: DateSchedule) => void
  updateSubjects: (subjects: string[]) => void
  loadConfig: (config: TimetableConfig) => void
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

const getInitialConfig = (): TimetableConfig => {
  const classes = getInitialTimetableConfig()
  const dateSchedule = (): Record<TimetableKey, string> => {
    return classes.reduce((acc, current) => ({ ...acc, [current.id]: '' }), {})
  }
  return {
    year: null,
    classes,
    schedule: [...Array(7)].fill(dateSchedule()),
    subjects: ['国語', '社会', '算数', '理科', '生活', '音楽'],
  }
}

export const useConfigStore = create<ConfigStore>((set) => ({
  config: getInitialConfig(),
  updateTimetable: (classes) => {
    set((state) => ({
      ...state,
      config: {
        ...state.config,
        classes,
      },
    }))
  },
  updateSchedule: (index, dateSchedule) => {
    set((state) => ({
      ...state,
      config: {
        ...state.config,
        schedule: state.config.schedule.map((s, i) => {
          if (i === index) {
            return dateSchedule
          }
          return s
        }),
      },
    }))
  },
  updateSubjects: (subjects) => {
    set((state) => ({
      ...state,
      config: {
        ...state.config,
        subjects,
      },
    }))
  },
  loadConfig: (config) => {
    set((state) => ({
      ...state,
      config,
    }))
  },
}))