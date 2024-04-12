export type Timetables = {
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
  subject: []
  note: string
}

export type ClassConfig = {
  id: string
  name: string
}

export type TimetableConfig = {
  classes: ClassConfig[]
}
