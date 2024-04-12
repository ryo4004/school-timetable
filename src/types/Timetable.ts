export type TimetableYear = TimetableWeek[]

export type TimetableWeek = {
  note: string
  list: TimetableDate[]
}

type TimetableKey = string

export type TimetableDate = Record<TimetableKey, TimetableClass>

export type TimetableClass = {
  subject: []
  memo: string
}

export type ClassConfig = {
  id: string
  name: string
}

export type TimetableConfig = {
  classes: ClassConfig[]
}
