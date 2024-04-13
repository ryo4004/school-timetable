export type ClassConfig = {
  id: string
  name: string
}

export type TimetableConfig = {
  year: number | null
  classes: ClassConfig[]
  subjects: string[]
}
