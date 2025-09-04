import { useState } from "react";

function useDisclosure({
  defaultIsOpen = false,
}: { defaultIsOpen?: boolean } = {}) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const onToggle = () => setIsOpen((currentValue) => !currentValue);

  return { onOpen, onClose, isOpen, onToggle };
}

export { useDisclosure };
