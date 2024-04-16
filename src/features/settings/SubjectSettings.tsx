import { useState } from 'react'
import { useConfigStore } from '../../stores/configs'
import { Input } from '../../components/Form/Input'
import { Text } from '../../components/Layout/Text'
import { Box } from '../../components/Layout/Box'
import { InputGroup } from '../../components/Form/InputGroup'
import { InputRightAddon } from '../../components/Form/InputRightAddon'
import { Button } from '../../components/Form/Button'
import { Tag, TagCloseButton } from '../../components/Form/Tag'
import { Flex } from '../../components/Layout/Flex'

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
      {config.subjects.map((subject) => (
        <Flex key={subject} alignItems="center" marginY="8px">
          <Tag borderRadius="full" colorScheme="blue" size="lg">
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
