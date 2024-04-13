import { DateTime } from 'luxon'
import { useTimetableStore } from '../../stores/timetable'
import { downloadFile } from '../../utilities/downloadFile'
import { useConfigStore } from '../../stores/configs'
import { type Timetable, type TimetableConfig } from '../../types'

export type SaveTimetable = {
  version: string
  timetable: Timetable
  config: TimetableConfig
}

export const SaveButton = () => {
  const { timetable } = useTimetableStore()
  const { config } = useConfigStore()

  return (
    <button
      onClick={() => {
        const saveContents = {
          version: '0.0.1',
          timetable,
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
