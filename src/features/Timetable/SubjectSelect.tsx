import type { ChangeEvent } from 'react'
import { useConfigStore } from '../../stores/configs'
import { Select } from '../../components/Form/Select'

export const SubjectSelect = ({
  value,
  onChange,
}: {
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}) => {
  const { config } = useConfigStore()

  return (
    <Select value={value} onChange={onChange} size="sm" padding="0">
      <option value="">-</option>
      {config.subjects.map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </Select>
  )
}
