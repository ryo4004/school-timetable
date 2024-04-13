import { useState } from 'react'
import { useTimetableStore } from '../../stores/timetable'
import { useConfigStore } from '../../stores/configs'

export const Settings = () => {
  const [subjectInput, setSubjectInput] = useState('')

  const { createTimetable } = useTimetableStore()
  const { config, updateSubjects } = useConfigStore()

  return (
    <>
      <h2>settings</h2>
      {config.classes.map((classItem, index) => (
        <div key={classItem.id}>
          {index}: {classItem.name}
        </div>
      ))}
      <button onClick={() => createTimetable(2024, config.classes)}>
        作成
      </button>
      <div>
        <input
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
        <div>
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
      </div>
    </>
  )
}
