import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  HStack,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import { ReactElement, cloneElement, useRef } from 'react'
import { Text } from '../Layout/Text'

export const Dialog = ({
  triggerButton,
  bodyText,
  confirmButtonLabel = 'OK',
  confirmButtonColorScheme = 'red',
  confirm,
}: {
  triggerButton: ReactElement
  bodyText: string
  confirmButtonLabel?: string
  confirmButtonColorScheme?: string
  confirm: () => void
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const trigger = cloneElement(triggerButton, {
    onClick: onOpen,
  })

  return (
    <>
      {trigger}
      <ChakraAlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        size="xs"
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody padding="24px 16px 24px">
              <Text fontSize="18px" fontWeight="bold" textAlign="center">
                {bodyText}
              </Text>
            </AlertDialogBody>
            <AlertDialogFooter padding="0 16px 16px">
              <HStack justifyContent="space-between" width="100%" gap="16px">
                <Button ref={cancelRef} onClick={onClose} width="50%">
                  キャンセル
                </Button>
                <Button
                  onClick={confirm}
                  width="50%"
                  colorScheme={confirmButtonColorScheme}
                >
                  {confirmButtonLabel}
                </Button>
              </HStack>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </ChakraAlertDialog>
    </>
  )
}
