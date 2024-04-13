export type Timetable = {
  weeks: TimetableWeek[]
  list: TimetableDate[]
}

export type TimetableWeek = {
  firstDate: string // 月曜日
  note: string
}

export type TimetableKey = string

export type TimetableDate = {
  date: string
  classes: Record<TimetableKey, TimetableClass>
}

export type TimetableClass = {
  subject: string[]
  note: string
}
