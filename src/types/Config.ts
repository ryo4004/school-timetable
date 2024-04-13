import { TimetableKey } from './Timetable'

export type ClassConfig = {
  id: string
  name: string
}

export type DateSchedule = Record<TimetableKey, string>

export type TimetableConfig = {
  year: number | null
  schedule: DateSchedule[] // 0が日曜日, 1が月曜日
  classes: ClassConfig[]
  subjects: string[]
}
