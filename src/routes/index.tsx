import { Outlet, type RouteObject, useRoutes } from 'react-router-dom'
import { Timetable } from '../features/Timetable'
import { Settings } from '../features/settings'
import { Layout } from '../components/Layout/Layout'
import { Dashboard } from '../features/dashboard'
import { Guide } from '../features/Guide/Guide'

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
      { path: '/', element: <Guide /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/:key', element: <Timetable /> },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]
