import { DateTime } from 'luxon'
import { useTimetableStore } from '../../stores/timetable'
import { downloadFile } from '../../utilities/downloadFile'
import { useConfigStore } from '../../stores/configs'
import { type Timetable, type TimetableConfig } from '../../types'
import { Button } from '../Form/Button'
import { toast } from '../../libraries/toast'

export type SaveTimetable = {
  version: string
  timetables: Timetable[]
  config: TimetableConfig
}

export const SaveButton = () => {
  const { timetables } = useTimetableStore()
  const { config } = useConfigStore()

  return (
    <Button
      onClick={() => {
        const saveContents = {
          version: '0.0.1',
          timetables,
          config,
        }
        const dateString = DateTime.now().toFormat('yyyyMMdd_HHmmss')
        downloadFile(JSON.stringify(saveContents), `週案くん_${dateString}.txt`)
        toast({
          status: 'success',
          title: '保存しました',
        })
      }}
      borderRadius="0"
    >
      保存
    </Button>
  )
}
