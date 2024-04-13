import type { ChangeEvent } from 'react'
import { useConfigStore } from '../../stores/configs'

export const SubjectSelect = ({
  value,
  onChange,
}: {
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}) => {
  const { config } = useConfigStore()

  return (
    <select value={value} onChange={onChange}>
      <option value=""></option>
      {config.subjects.map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </select>
  )
}
