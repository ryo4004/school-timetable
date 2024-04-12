import { useState } from 'react'
import { DateTime } from 'luxon'
import { downloadFile } from '../../utilities/downloadFile'
import { useTimetableStore } from '../../stores/timetable'

export const Timetable = () => {
  const [startDate, setStartDate] = useState('')
  const [fileContents, setFileContents] = useState('')

  const { timetable } = useTimetableStore()

  if (timetable.timetables.length === 0) {
    return <>時間割の初期化が必要です</>
  }

  return (
    <>
      <h2>Timetable</h2>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <div>file: {fileContents}</div>
      <Table startDate={startDate} />
      <button
        onClick={() => {
          downloadFile(JSON.stringify(timetable), 'sample.txt')
        }}
      >
        保存
      </button>
      <input
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
              setFileContents(reader.result)
            }
          })
          reader.readAsText(file)
        }}
      />
    </>
  )
}

const Table = ({ startDate }: { startDate: string }) => {
  const startDateTime = startDate
    ? DateTime.fromFormat(startDate, 'yyyy-MM-dd')
    : DateTime.fromJSDate(new Date()).startOf('day')
  const weekDaysList = [...Array(7)].map((_, add) => {
    return startDateTime.plus({ day: add })
  })

  return (
    <>
      {weekDaysList.map((date) => (
        <div key={date.toISO()}>{date.toISODate()}</div>
      ))}
    </>
  )
}
