export type Timetable = {
  firstDate: string // 月曜日
  note: string
  showSaturday: boolean
  showSunday: boolean
  list: TimetableDate[]
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
