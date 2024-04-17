import { Layout } from '../../../components/Layout/Layout'
import { ClassCount } from '../components/ClassCount'
import { CreateTimeTable, WeekTable } from '../components/Dashboard'

export const Dashboard = () => {
  return (
    <Layout>
      <CreateTimeTable />
      <WeekTable />
      <ClassCount />
    </Layout>
  )
}
