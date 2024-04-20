import { type RouteObject, useRoutes } from 'react-router-dom'
import { Timetable } from '../features/Timetable'
import { Settings } from '../features/settings'
import { Dashboard } from '../features/dashboard'
import { Home } from '../features/home/Home'

export const AppRoutes = () => {
  const element = useRoutes(routes)
  return <>{element}</>
}

const routes: RouteObject[] = [
  {
    path: '',
    children: [
      { path: '/', element: <Home /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/:key', element: <Timetable /> },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
  },
]
