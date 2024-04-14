import { TimetableKey } from './Timetable'

export const CLASS_TYPE_ORDER = ['class', 'break', 'lunch', 'other'] as const

export type ClassTypeKeys = (typeof CLASS_TYPE_ORDER)[number]

export const CLASS_TYPES: Record<
  ClassTypeKeys,
  '授業' | '休憩' | '昼休み' | 'その他'
> = {
  class: '授業',
  break: '休憩',
  lunch: '昼休み',
  other: 'その他',
} as const

type ClassType = keyof typeof CLASS_TYPES

export type ClassConfig = {
  id: string
  name: string
  type: ClassType
}

export type DateSchedule = Record<TimetableKey, string>

export type TimetableConfig = {
  year: number | null
  schedule: DateSchedule[] // 0が日曜日, 1が月曜日
  classes: ClassConfig[]
  subjects: string[]
}
