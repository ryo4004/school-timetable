import {
  Modal as ChakraModal,
  type ModalProps,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useModalContext,
} from '@chakra-ui/react'
import { cloneElement, type ReactElement } from 'react'

export const Modal = ({
  triggerElement,
  bodyElement,
}: {
  // divなどonClickが設定できる要素で囲まれていること
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
          <ModalBody padding="0">{bodyElement}</ModalBody>
        </ModalContent>
      </ChakraModal>
    </>
  )
}

export { useModalContext }
