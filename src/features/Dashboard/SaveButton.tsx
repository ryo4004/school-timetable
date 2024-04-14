import { DateTime } from 'luxon'
import { useTimetableStore } from '../../stores/timetable'
import { downloadFile } from '../../utilities/downloadFile'
import { useConfigStore } from '../../stores/configs'
import { type Timetable, type TimetableConfig } from '../../types'

export type SaveTimetable = {
  version: string
  timetables: Timetable[]
  config: TimetableConfig
}

export const SaveButton = () => {
  const { timetables } = useTimetableStore()
  const { config } = useConfigStore()

  return (
    <button
      onClick={() => {
        const saveContents = {
          version: '0.0.1',
          timetables,
          config,
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
