import type { ChangeEvent } from 'react'
import { useConfigStore } from '../../stores/configs'
import { Select, type SelectProps } from '../../components/Form/Select'

export const SubjectSelect = ({
  value,
  onChange,
  ...props
}: {
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
} & SelectProps) => {
  const { config } = useConfigStore()

  return (
    <Select value={value} onChange={onChange} size="sm" padding="0" {...props}>
      <option value="">-</option>
      {config.subjects.map((subject) => (
        <option key={subject} value={subject}>
          {subject}
        </option>
      ))}
    </Select>
  )
}
