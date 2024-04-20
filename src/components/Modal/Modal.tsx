import {
  Modal as ChakraModal,
  type ModalProps,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from '@chakra-ui/react'
import { cloneElement, type ReactElement } from 'react'

export const Modal = ({
  triggerElement,
  bodyElement,
}: {
  triggerElement: ReactElement
  bodyElement: ReactElement
} & Omit<ModalProps, 'children' | 'isOpen' | 'onClose'>) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const trigger = cloneElement(triggerElement, {
    onClick: onOpen,
    cursor: 'pointer',
  })

  return (
    <>
      {trigger}
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>{bodyElement}</ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  )
}
