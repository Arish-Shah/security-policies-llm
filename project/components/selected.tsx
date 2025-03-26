import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function Selected() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Generate" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="eflint">eFlint</SelectItem>
        <SelectItem value="datalog">Datalog</SelectItem>
      </SelectContent>
    </Select>
  );
}
