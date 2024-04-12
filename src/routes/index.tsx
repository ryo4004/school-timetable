import { Outlet, type RouteObject, useRoutes } from 'react-router-dom'
import { Timetable } from '../features/Timetable'
import { Settings } from '../features/settings'
import { Layout } from '../components/Layout/Layout'

export const AppRoutes = () => {
  const element = useRoutes(routes)
  return <>{element}</>
}

const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { path: '/', element: <Timetable /> },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]
