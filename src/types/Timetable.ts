export type Timetables = {
  weeks: TimetableWeek[]
  timetables: TimetableDate[]
}

export type TimetableWeek = {
  startDate: string
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
