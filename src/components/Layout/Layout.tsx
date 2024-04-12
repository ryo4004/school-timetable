import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div>
        <Link to="/">Top</Link>
        <Link to="/settings">設定</Link>
      </div>
      {children}
    </div>
  )
}
