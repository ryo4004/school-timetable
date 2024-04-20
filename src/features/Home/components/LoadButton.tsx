import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTimetableStore } from '../../../stores/timetable'
import { type SaveTimetable } from '../../../components/Layout/SaveButton'
import { useConfigStore } from '../../../stores/configs'
import { Input } from '../../../components/Form/Input'
import { toast } from '../../../libraries/toast'

export const LoadButton = () => {
  const navigate = useNavigate()

  const [fileName, setFileName] = useState('')
  const { loadTimetable } = useTimetableStore()
  const { loadConfig } = useConfigStore()

  return (
    <>
      <div>{fileName ?? '読み込まれていません'}</div>
      <Input
        type="file"
        accept=".txt"
        onChange={(e) => {
          const files = e.currentTarget.files

          if (files?.length !== 1) {
            return
          }

          const file = files[0]

          const reader = new FileReader()
          reader.addEventListener('load', () => {
            if (typeof reader.result === 'string') {
              setFileName(file.name)
              try {
                const json = JSON.parse(reader.result)
                if (isSaveTimetable(json) && json.version === '0.0.1') {
                  loadTimetable(json.timetables)
                  loadConfig(json.config)
                  toast({
                    status: 'success',
                    title: '読み込みました',
                  })
                  navigate('/dashboard')
                }
              } catch (error) {
                console.log(error)
              }
            }
          })
          reader.readAsText(file)
        }}
      />
    </>
  )
}

const isSaveTimetable = (value: unknown): value is SaveTimetable => {
  if (typeof value !== 'object') {
    return false
  }

  const timetable = value as SaveTimetable

  if (timetable.version) {
    return true
  }
  return true
}
