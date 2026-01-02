import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Mic, Camera, Sparkles } from 'lucide-react'
import searchAdd from '@/assets/icons/search_add.png'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(searchTerm)
  }
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mx-auto flex h-[50px] w-full max-w-[690px] items-center rounded-full border bg-[#FFFFFF] px-[10px] py-2 shadow-sm">
        {/* Add button */}
        <Button
          type="button"
          variant="ghost"
          className="h-10 w-10 rounded-full p-0"
          aria-label="Add"
        >
          <img
            src={searchAdd}
            alt="Add search contextual action"
            className="h-5 w-5"
          />
        </Button>
        {/* Search input */}
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder=""
          className="h-10 flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
        {/* Microphone button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Voice"
        >
          <Mic className="h-5 w-5" />
        </Button>
        {/* Camera button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Camera"
        >
          <Camera className="h-5 w-5" />
        </Button>
        {/* AI mode button */}
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
