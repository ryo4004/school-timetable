import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import type { ClassConfig, TimetableConfig } from '../types'

export type ConfigStore = {
  config: TimetableConfig
  updateTimetable: (classes: ClassConfig[]) => void
  updateSubjects: (subjects: string[]) => void
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

const getInitialConfig = () => {
  return {
    year: null,
    classes: getInitialTimetableConfig(),
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
  updateSubjects: (subjects) => {
    set((state) => ({
      ...state,
      config: {
        ...state.config,
        subjects,
      },
    }))
  },
}))
