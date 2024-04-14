import { useState } from 'react'
import { useConfigStore } from '../../stores/configs'
import { getUniqueId } from '../../utilities/getUniqueId'
import { CLASS_TYPES, CLASS_TYPE_ORDER, ClassTypeKeys } from '../../types'
import { replaceElements } from '../../utilities/replaceElements'
import { Input } from '../../components/Form/Input'
import { Text } from '../../components/Layout/Text'
import { InputGroup } from '../../components/Form/InputGroup'
import { InputRightAddon } from '../../components/Form/InputRightAddon'
import { Button } from '../../components/Form/Button'
import { Select } from '../../components/Form/Select'
import { InputLeftAddon } from '../../components/Form/InputLeftAddon'
import { Flex } from '../../components/Layout/Flex'
import { Tag, TagCloseButton } from '../../components/Form/Tag'

export const ClassesSettings = () => {
  const [classesInput, setClassesInput] = useState('')
  const [classType, setClassType] = useState('class')

  const { config, updateClasses } = useConfigStore()

  return (
    <>
      <Text as="h3" marginTop="16px">
        授業の設定
      </Text>
      <InputGroup>
        <InputLeftAddon padding="0">
          <Select
            value={classType}
            onChange={(e) => setClassType(e.target.value)}
            border="0"
            borderRadius="0.375rem 0 0 0.375rem"
          >
            {CLASS_TYPE_ORDER.map((type) => (
              <option key={type} value={type}>
                {CLASS_TYPES[type]}
              </option>
            ))}
          </Select>
        </InputLeftAddon>
        <Input
          value={classesInput}
          onChange={(e) => setClassesInput(e.target.value)}
          borderRadius="0"
        />
        <InputRightAddon padding="0">
          <Button
            onClick={() => {
              updateClasses([
                ...config.classes,
                { id: getUniqueId(), name: classesInput, type: 'other' },
              ])
              setClassesInput('')
            }}
            borderRadius="0 0.315rem 0.315rem 0"
          >
            追加
          </Button>
        </InputRightAddon>
      </InputGroup>
      {config.classes.map((classItem, index) => {
        return (
          <Flex key={classItem.id} alignItems="center" marginY="8px">
            <Tag
              borderLeft="0"
              variant="outline"
              colorScheme={classTypeColorSelector(classItem.type)}
              size="lg"
            >
              {CLASS_TYPES[classItem.type]}
            </Tag>
            <Tag
              marginLeft="8px"
              variant="outline"
              colorScheme={classTypeColorSelector(classItem.type)}
              size="lg"
            >
              {classItem.name ? classItem.name : '-'}
              <TagCloseButton
                onClick={() => {
                  updateClasses(
                    config.classes.filter((item) => item.id !== classItem.id),
                  )
                }}
              />
            </Tag>

            {index > 0 && (
              <Button
                onClick={() => {
                  const newClasses = replaceElements(
                    config.classes,
                    index - 1,
                    index,
                  )
                  updateClasses(newClasses)
                }}
              >
                上へ
              </Button>
            )}
            {index < config.classes.length - 1 && (
              <Button
                onClick={() => {
                  const newClasses = replaceElements(
                    config.classes,
                    index + 1,
                    index,
                  )
                  updateClasses(newClasses)
                }}
              >
                下へ
              </Button>
            )}
          </Flex>
        )
      })}
    </>
  )
}

const classTypeColorSelector = (classType: ClassTypeKeys) => {
  switch (classType) {
    case 'class': {
      return 'orange'
    }
    case 'break': {
      return 'teal'
    }
    case 'lunch': {
      return 'cyan'
    }
    default: {
      return 'gray'
    }
  }
}
