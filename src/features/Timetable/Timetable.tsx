import { useParams } from 'react-router-dom'

export const Timetable = () => {
  const { date } = useParams<{ date: string }>()

  return <>Timetable: {date}</>
}
