import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Select/Select";

interface FilterSelectProps<T> {
  onValueChange: (value: string) => void;
  placeholder: string;
  options: Array<{ value: T; label: string }>;
}

const FilterSelect = <T,>({
  onValueChange,
  placeholder,
  options,
}: FilterSelectProps<T>) => (
  <Select onValueChange={(value: string) => onValueChange(value)}>
    <SelectTrigger className="w-40">
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {options.map(({ value, label }) => (
        <SelectItem value={String(value)} key={String(value)}>
          {label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default FilterSelect;
