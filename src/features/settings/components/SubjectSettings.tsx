import { useState } from 'react'
import { useConfigStore } from '../../../stores/configs'
import { Input } from '../../../components/Form/Input'
import { Text } from '../../../components/Layout/Text'
import { Box } from '../../../components/Layout/Box'
import { InputGroup } from '../../../components/Form/InputGroup'
import { InputRightAddon } from '../../../components/Form/InputRightAddon'
import { Button, IconButton } from '../../../components/Form/Button'
import { Tag, TagCloseButton } from '../../../components/Form/Tag'
import { Flex } from '../../../components/Layout/Flex'
import { replaceElements } from '../../../utilities/replaceElements'
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons'

export const SubjectSettings = () => {
  const [subjectInput, setSubjectInput] = useState('')

  const { config, updateSubjects } = useConfigStore()

  return (
    <Box marginX="8px">
      <Text as="h3" marginTop="16px">
        教科の設定
      </Text>
      <InputGroup>
        <Input
          value={subjectInput}
          onChange={(e) => setSubjectInput(e.target.value)}
          borderRadius="0.375rem 0 0 0.375rem"
        />
        <InputRightAddon padding="0">
          <Button
            onClick={() => {
              if (subjectInput) {
                updateSubjects(
                  Array.from(new Set([...config.subjects, subjectInput])),
                )
                setSubjectInput('')
              }
            }}
            borderRadius="0 0.315rem 0.315rem 0"
          >
            追加
          </Button>
        </InputRightAddon>
      </InputGroup>
      {config.subjects.map((subject, index) => (
        <Flex key={subject} alignItems="center" marginY="8px">
          <IconButton
            onClick={() => {
              const newSubjects = replaceElements(
                config.subjects,
                index - 1,
                index,
              )
              updateSubjects(newSubjects)
            }}
            variant="outline"
            size="sm"
            aria-label="ChevronUpIcon"
            icon={<ChevronUpIcon />}
            isDisabled={index === 0}
          />
          <IconButton
            onClick={() => {
              const newSubjects = replaceElements(
                config.subjects,
                index + 1,
                index,
              )
              updateSubjects(newSubjects)
            }}
            marginX="8px"
            variant="outline"
            size="sm"
            aria-label="ChevronDownIcon"
            icon={<ChevronDownIcon />}
            isDisabled={index === config.subjects.length - 1}
          />
          <Tag borderRadius="full" colorScheme="orange" size="lg">
            {subject}
            <TagCloseButton
              onClick={() => {
                updateSubjects(config.subjects.filter((s) => s !== subject))
              }}
            />
          </Tag>
        </Flex>
      ))}
    </Box>
  )
}
