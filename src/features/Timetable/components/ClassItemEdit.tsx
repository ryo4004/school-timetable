import { CLASS_TYPES, ClassConfig, TimetableDate } from '../../../types'
import { useTimetableStore } from '../../../stores/timetable'
import { SubjectSelect } from './SubjectSelect'
import { type ChangeEvent, useState } from 'react'
import { truthy } from '../../../utilities/truthy'
import { Checkbox } from '../../../components/Form/Checkbox'
import { Flex } from '../../../components/Layout/Flex'
import { Text } from '../../../components/Layout/Text'
import { Box } from '../../../components/Layout/Box'
import { Tag } from '../../../components/Form/Tag'
import { classTypeColorSelector } from '../../../utilities/classTypeColorSelector'
import { Button } from '../../../components/Form/Button'
import { isClass } from '../../../utilities/isClass'
import { Textarea } from '../../../components/Form/Textarea'
import { useModalContext } from '../../../components/Modal/Modal'

export const ClassItemEdit = ({
  weekIndex,
  timetableDate,
  classConfig,
}: {
  weekIndex: number
  timetableDate: TimetableDate
  classConfig: ClassConfig
}) => {
  const { timetables, updateTimetables } = useTimetableStore()
  const { onClose } = useModalContext()

  const classItem = timetableDate.classes[classConfig.id]

  const [isDivide, setIsDivide] = useState(classItem.subject.length > 1)
  const [subjects, setSubjects] = useState(classItem.subject)
  const [noteInput, setNoteInput] = useState(classItem.note)

  const onUpdateTimetables = (
    weekIndex: number,
    newTimetableDate: TimetableDate,
  ) => {
    const newTimetables = timetables.map((timetable, index) => {
      if (index === weekIndex) {
        return {
          ...timetable,
          list: timetable.list.map((week) => {
            if (week.date === timetableDate.date) {
              return newTimetableDate
            }

            return week
          }),
        }
      }
      return timetable
    })

    updateTimetables(newTimetables)
    onClose()
  }

  const onUpdate = () => {
    const newTimetableDate = {
      ...timetableDate,
      classes: {
        ...timetableDate.classes,
        [classConfig.id]: {
          ...classItem,
          subject: subjects,
          note: noteInput,
        },
      },
    }

    onUpdateTimetables(weekIndex, newTimetableDate)
  }

  const onChangeFirstSubject = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubjects([e.target.value, subjects[1], subjects[2]].filter(truthy))
  }

  const onChangeSecondSubject = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubjects([subjects[0], e.target.value, subjects[2]].filter(truthy))
  }

  const onChangeThirdSubject = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubjects([subjects[0], subjects[1], e.target.value].filter(truthy))
  }

  return (
    <Box padding="8px">
      <Flex paddingY="8px">
        {classConfig.name ? (
          <Text marginX="8px" fontWeight="bold">
            {classConfig.name}
          </Text>
        ) : (
          <Text marginX="8px" color="#ccc">
            設定無し
          </Text>
        )}
        <Tag
          variant="outline"
          colorScheme={classTypeColorSelector(classConfig.type)}
          size="md"
        >
          {CLASS_TYPES[classConfig.type]}
        </Tag>
      </Flex>
      <Box maxWidth="calc(100% / 3)" minWidth="80px" marginY="8px">
        <Text fontSize="11px">プレビュー</Text>
        {isClass(classConfig.type) && (
          <Flex
            justifyContent="space-around"
            border="1px solid #000"
            borderBottom="0"
            fontSize="14px"
          >
            {/* eslint-disable-next-line no-irregular-whitespace */}
            {subjects.length === 0 && <Text>　</Text>}
            {subjects.map((subject, index) => (
              <Text key={index} whiteSpace="nowrap">
                {subject}
              </Text>
            ))}
          </Flex>
        )}
        <Box
          width="100%"
          minHeight="50px"
          border="1px solid #000"
          fontSize="12px"
          lineHeight="14px"
          whiteSpace="pre-wrap"
        >
          {noteInput}
        </Box>
      </Box>
      {isClass(classConfig.type) && (
        <Box>
          <SubjectSelect
            value={subjects[0] ?? ''}
            onChange={onChangeFirstSubject}
            size="md"
            marginY="8px"
            border="1px solid #ccc"
          />
          {isDivide && (
            <>
              <SubjectSelect
                value={subjects[1] ?? ''}
                onChange={onChangeSecondSubject}
                size="md"
                marginY="8px"
                border="1px solid #ccc"
              />
              <SubjectSelect
                value={subjects[2] ?? ''}
                onChange={onChangeThirdSubject}
                size="md"
                marginY="8px"
                border="1px solid #ccc"
              />
            </>
          )}
          <Checkbox
            isChecked={isDivide}
            onChange={(e) => {
              if (!e.target.checked) {
                setSubjects([subjects[0]].filter(truthy))
              }
              setIsDivide(e.target.checked)
            }}
          >
            分割
          </Checkbox>
        </Box>
      )}
      <Textarea
        value={noteInput}
        onChange={(e) => setNoteInput(e.target.value)}
        height="80px"
        marginY="8px"
        border="1px solid #ccc"
        borderRadius="0.375rem"
      />
      <Button onClick={onUpdate} width="100%" colorScheme="blue">
        反映
      </Button>
    </Box>
  )
}
