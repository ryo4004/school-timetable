import { DateTime } from 'luxon'
import { type Timetable, useTimetableStore } from '../../stores/timetable'
import { downloadFile } from '../../utilities/downloadFile'

export type SaveTimetable = {
  version: string
  timetable: Timetable
}

export const SaveButton = () => {
  const { timetable } = useTimetableStore()

  return (
    <button
      onClick={() => {
        const saveContents = {
          version: '0.0.1',
          timetable,
        }
        const dateString = DateTime.now().toFormat('yyyyMMdd')
        downloadFile(
          JSON.stringify(saveContents),
          `timetable_${dateString}.txt`,
        )
      }}
    >
      保存
    </button>
  )
}
