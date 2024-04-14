import { useState } from 'react'
import { useConfigStore } from '../../stores/configs'
import { getUniqueId } from '../../utilities/getUniqueId'
import { CLASS_TYPES, CLASS_TYPE_ORDER } from '../../types'

export const ClassesSettings = () => {
  const [classesInput, setClassesInput] = useState('')
  const [classType, setClassType] = useState('class')

  const { config, updateClasses } = useConfigStore()

  return (
    <>
      <h2>授業の設定</h2>
      <input
        value={classesInput}
        onChange={(e) => setClassesInput(e.target.value)}
      />
      <select value={classType} onChange={(e) => setClassType(e.target.value)}>
        {CLASS_TYPE_ORDER.map((type) => (
          <option key={type} value={type}>
            {CLASS_TYPES[type]}
          </option>
        ))}
      </select>
      <button
        onClick={() => {
          updateClasses([
            ...config.classes,
            { id: getUniqueId(), name: classesInput, type: 'other' },
          ])
          setClassesInput('')
        }}
      >
        追加
      </button>
      <div>
        {config.classes.map((classItem) => {
          return (
            <div key={classItem.id}>
              {classItem.name ? classItem.name : '名前なし'}
              {CLASS_TYPES[classItem.type]}
            </div>
          )
        })}
      </div>
    </>
  )
}
