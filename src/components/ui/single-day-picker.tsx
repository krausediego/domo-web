import { format } from "date-fns";
import type { ButtonHTMLAttributes } from "react";

import { useDisclosure } from "@/hooks/use-disclosure";
import { cn } from "@/lib/utils";

import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { SingleCalendar } from "./single-calendar";

type TProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onSelect" | "value"
> & {
  onSelect: (value: Date | undefined) => void;
  value?: Date | undefined;
  placeholder: string;
  labelVariant?: "P" | "PP" | "PPP";
};

function SingleDayPicker({
  id,
  onSelect,
  className,
  placeholder,
  labelVariant = "PPP",
  value,
  ...props
}: TProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const handleSelect = (date?: Date) => {
    onSelect(date);
    onClose();
  };

  return (
    <Popover open={isOpen} onOpenChange={onToggle} modal>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant="outline"
          className={cn(
            "group relative h-9 w-full justify-start px-3 py-2 font-normal whitespace-nowrap hover:bg-inherit",
            className,
          )}
          {...props}
        >
          {value && <span>{format(value, labelVariant)}</span>}
          {!value && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="center" className="w-fit p-0">
        <SingleCalendar
          mode="single"
          required
          selected={value}
          onSelect={handleSelect}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { SingleDayPicker };
