import { Timetable } from '../../../types'
import { useTimetableStore } from '../../../stores/timetable'
import { useState } from 'react'
import { Checkbox } from '../../../components/Form/Checkbox'
import { Text } from '../../../components/Layout/Text'
import { Box } from '../../../components/Layout/Box'
import { InputGroup } from '../../../components/Form/InputGroup'
import { InputRightAddon } from '../../../components/Form/InputRightAddon'
import { Button } from '../../../components/Form/Button'
import { NoPrint } from '../../../components/Layout/NoPrint'
import { Textarea } from '../../../components/Form/Textarea'

export const TimetableEdit = ({
  weekTimetable,
  weekIndex,
}: {
  weekTimetable: Timetable
  weekIndex: number
}) => {
  return (
    <NoPrint>
      <WeekNote weekIndex={weekIndex} weekTimetable={weekTimetable} />
      <ShowSaturday weekIndex={weekIndex} weekTimetable={weekTimetable} />
      <ShowSunday weekIndex={weekIndex} weekTimetable={weekTimetable} />
    </NoPrint>
  )
}

const WeekNote = ({
  weekTimetable,
  weekIndex,
}: {
  weekTimetable: Timetable
  weekIndex: number
}) => {
  const { updateTimetableNote } = useTimetableStore()

  const [note, setNote] = useState(weekTimetable.note)

  const update = () => {
    updateTimetableNote(weekIndex, note)
  }

  return (
    <Box margin="8px">
      <Text>今週の目標</Text>
      <InputGroup marginY="8px">
        <Textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          height="80px"
          borderRadius="0.375rem 0 0 0.375rem"
        />
        <InputRightAddon height="80px" padding="0">
          <Button
            onClick={update}
            height="80px"
            borderRadius="0 0.315rem 0.315rem 0"
          >
            反映
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Box>
  )
}

const ShowSaturday = ({
  weekTimetable,
  weekIndex,
}: {
  weekTimetable: Timetable
  weekIndex: number
}) => {
  const { updateTimetableShowSaturday } = useTimetableStore()

  return (
    <Box margin="8px">
      <Checkbox
        isChecked={weekTimetable.showSaturday}
        onChange={(e) =>
          updateTimetableShowSaturday(weekIndex, e.target.checked)
        }
      >
        土曜日を表示する
      </Checkbox>
    </Box>
  )
}

const ShowSunday = ({
  weekTimetable,
  weekIndex,
}: {
  weekTimetable: Timetable
  weekIndex: number
}) => {
  const { updateTimetableShowSunday } = useTimetableStore()

  return (
    <Box margin="8px">
      <Checkbox
        isChecked={weekTimetable.showSunday}
        onChange={(e) => updateTimetableShowSunday(weekIndex, e.target.checked)}
      >
        日曜日を表示する
      </Checkbox>
    </Box>
  )
}
