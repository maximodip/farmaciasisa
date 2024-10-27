import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function SearchInput({
  placeholder = 'Buscar...',
  onChange,
  value,
}: {
  placeholder?: string
  value?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <div className="relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="pl-8"
        onChange={onChange}
        value={value}
      />
    </div>
  )
}
