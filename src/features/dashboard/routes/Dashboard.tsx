import { ClassCount } from '../components/ClassCount'
import { CreateTimeTable, WeekTable } from '../components/Dashboard'

export const Dashboard = () => {
  return (
    <>
      <CreateTimeTable />
      <WeekTable />
      <ClassCount />
    </>
  )
}
