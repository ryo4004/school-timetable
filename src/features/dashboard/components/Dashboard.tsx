import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTimetableStore } from '../../../stores/timetable'
import { useConfigStore } from '../../../stores/configs'
import { isMonday } from '../../../utilities/getWeekDay'
import { Input } from '../../../components/Form/Input'
import { Text } from '../../../components/Layout/Text'
import { InputGroup } from '../../../components/Form/InputGroup'
import { InputRightAddon } from '../../../components/Form/InputRightAddon'
import { Button, IconButton } from '../../../components/Form/Button'
import { Alert, AlertIcon } from '../../../components/Layout/Alert'
import { replaceToSlash } from '../../../utilities/formatDate'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from '../../../components/Layout/Accordion'
import { Box } from '../../../components/Layout/Box'
import { Flex } from '../../../components/Layout/Flex'
import { CloseIcon } from '@chakra-ui/icons'
import { Dialog } from '../../../components/Dialog/Dialog'

export const CreateTimeTable = () => {
  const [startDate, setStartDate] = useState('')
  const { timetables, createTimetable } = useTimetableStore()
  const { config } = useConfigStore()

  const onCreate = () => {
    if (!startDate) {
      return
    }
    if (timetables.find((timetable) => timetable.firstDate === startDate)) {
      return alert('すでに存在します')
    }
    createTimetable(startDate, config.classes, config.schedule)
  }

  const isDisabled = !startDate || !isMonday(startDate)

  return (
    <Box marginX="8px">
      <Text as="h2" marginY="16px" fontWeight="bold" fontSize="20px">
        ダッシュボード
      </Text>
      <Text as="h3" marginTop="16px">
        新しい週案ページを作成
      </Text>
      <InputGroup>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          borderRadius="0.375rem 0 0 0.375rem"
        />
        <InputRightAddon padding="0">
          <Button
            onClick={onCreate}
            isDisabled={isDisabled}
            borderRadius="0 0.315rem 0.315rem 0"
          >
            作成
          </Button>
        </InputRightAddon>
      </InputGroup>
      {startDate && !isMonday(startDate) && (
        <Alert status="error" marginY="8px">
          <AlertIcon />
          月曜日を選んでください
        </Alert>
      )}
    </Box>
  )
}

export const WeekTable = () => {
  const { timetables, updateTimetables } = useTimetableStore()

  const onClickRemoveTimetable = (firstDate: string) => () => {
    const newTimetables = timetables.filter((timetable) => {
      return timetable.firstDate !== firstDate
    })
    updateTimetables(newTimetables)
  }

  return (
    <Box marginX="8px">
      <Text as="h3" marginTop="16px">
        週案一覧
      </Text>
      {timetables.length === 0 && (
        <Text marginY="16px">週案ページがありません</Text>
      )}
      {timetables.length !== 0 && (
        <Accordion allowToggle={true} defaultIndex={[0]} marginY="16px">
          <AccordionItem>
            <AccordionButton padding="8px 16px">
              作成済みの週案
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding="0">
              {timetables.map((weekTimetable, index) => {
                return (
                  <Flex key={weekTimetable.firstDate}>
                    <Box flex="1">
                      <Link
                        to={`/${weekTimetable.firstDate.replace(/-/g, '')}`}
                      >
                        <Flex
                          alignItems="center"
                          _hover={{ background: '#0000000a' }}
                          padding="8px 16px"
                        >
                          <Text fontSize="14px">
                            {replaceToSlash(weekTimetable.firstDate)}
                          </Text>
                          <Text marginLeft="8px" fontWeight="bold">
                            週案（{index + 1}週）
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                    <Dialog
                      triggerButton={
                        <IconButton
                          aria-label="closeIcon"
                          icon={<CloseIcon />}
                          background="white"
                          border="0"
                          borderRadius="0"
                        />
                      }
                      bodyText={`週案${index + 1}を削除しますか？`}
                      confirmButtonLabel="削除"
                      confirm={onClickRemoveTimetable(weekTimetable.firstDate)}
                    />
                  </Flex>
                )
              })}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  )
}
