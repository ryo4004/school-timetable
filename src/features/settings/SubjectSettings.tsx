import { useState } from 'react'
import { useConfigStore } from '../../stores/configs'
import { Input } from '../../components/Form/Input'

export const SubjectSettings = () => {
  const [subjectInput, setSubjectInput] = useState('')

  const { config, updateSubjects } = useConfigStore()

  return (
    <div>
      <h3>教科の設定</h3>
      <Input
        value={subjectInput}
        onChange={(e) => setSubjectInput(e.target.value)}
      />
      <button
        onClick={() => {
          if (subjectInput) {
            updateSubjects(
              Array.from(new Set([...config.subjects, subjectInput])),
            )
            setSubjectInput('')
          }
        }}
      >
        追加
      </button>
      {config.subjects.map((subject) => (
        <div key={subject}>
          {subject}:
          <button
            onClick={() => {
              updateSubjects(config.subjects.filter((s) => s !== subject))
            }}
          >
            削除
          </button>
        </div>
      ))}
    </div>
  )
}
