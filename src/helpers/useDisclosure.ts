import { useState } from "react";

type DisclosureProps = {
  isOpen?: boolean;
};

interface Disclosure {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}

export function useDisclosure(props?: DisclosureProps): Disclosure {
  const { isOpen: initialValue = false } = props ?? {};
  const [isOpen, setIsOpen] = useState(initialValue);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleToggle = () => setIsOpen((v) => !v);

  return {
    isOpen,
    onOpen: handleOpen,
    onClose: handleClose,
    onToggle: handleToggle,
  };
}