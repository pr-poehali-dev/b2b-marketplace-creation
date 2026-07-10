import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategoryComboboxProps {
  categories: Category[];
  value: number | '';
  onChange: (id: number) => void;
  placeholder?: string;
}

const CategoryCombobox = ({ categories, value, onChange, placeholder = 'Выберите категорию' }: CategoryComboboxProps) => {
  const [open, setOpen] = useState(false);
  const selected = categories.find((c) => c.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {selected ? selected.name : <span className="text-muted-foreground">{placeholder}</span>}
          <Icon name="ChevronsUpDown" size={16} className="ml-2 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
        <Command>
          <CommandInput placeholder="Поиск категории..." />
          <CommandList>
            <CommandEmpty>Категория не найдена</CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category.id}
                  value={category.name}
                  onSelect={() => {
                    onChange(category.id);
                    setOpen(false);
                  }}
                >
                  <Icon
                    name="Check"
                    size={16}
                    className={cn('mr-2', value === category.id ? 'opacity-100' : 'opacity-0')}
                  />
                  {category.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryCombobox;
