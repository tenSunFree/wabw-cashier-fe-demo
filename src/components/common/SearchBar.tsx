import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Plus, Mic, Camera, Sparkles } from 'lucide-react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-2 rounded-full border bg-white px-2 py-2 shadow-sm">
        {/* left */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Add"
        >
          <Plus className="h-6 w-6" />
        </Button>

        {/* middle */}
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="輸入內容…"
          className="h-10 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
        />

        {/* right icons */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Voice"
        >
          <Mic className="h-5 w-5" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Camera"
        >
          <Camera className="h-5 w-5" />
        </Button>

        {/* AI mode pill */}
        <Button
          type="button"
          variant="secondary"
          className="h-10 rounded-full px-4"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          AI 模式
        </Button>
      </div>
    </form>
  )
}
