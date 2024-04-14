import {
  Accordion as ChakraAccordion,
  AccordionItem as ChakraAccordionItem,
  AccordionButton as ChakraAccordionButton,
  AccordionPanel as ChakraAccordionPanel,
  AccordionIcon as ChakraAccordionIcon,
  type AccordionProps,
  type AccordionItemProps,
  type AccordionButtonProps,
  type AccordionPanelProps,
  type AccordionIconProps,
} from '@chakra-ui/react'

export const Accordion = (props: AccordionProps) => {
  return <ChakraAccordion {...props} />
}

export const AccordionItem = (props: AccordionItemProps) => {
  return <ChakraAccordionItem {...props} />
}

export const AccordionButton = (props: AccordionButtonProps) => {
  return <ChakraAccordionButton {...props} />
}

export const AccordionPanel = (props: AccordionPanelProps) => {
  return <ChakraAccordionPanel {...props} />
}

export const AccordionIcon = (props: AccordionIconProps) => {
  return <ChakraAccordionIcon {...props} />
}
