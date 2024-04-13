export type Timetable = {
  weeks: TimetableWeek[]
  list: TimetableDate[]
}

export type TimetableWeek = {
  firstDate: string // 月曜日
  note: string
}

type TimetableKey = string

export type TimetableDate = {
  date: string
  classes: Record<TimetableKey, TimetableClass>
}

export type TimetableClass = {
  subject: string[]
  note: string
}

export type ClassConfig = {
  id: string
  name: string
}

export type TimetableConfig = {
  year: number | null
  classes: ClassConfig[]
  subjects: string[]
}
