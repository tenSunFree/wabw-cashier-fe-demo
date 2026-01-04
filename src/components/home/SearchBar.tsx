import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import searchMicrophone from '@/assets/icons/search_microphone.png'
import searchCamera from '@/assets/icons/search_camera.png'
import searchAiMode from '@/assets/icons/search_ai_mode.png'
import searchAdd from '@/assets/icons/search_add.png'
import { ImgBox } from '@/components/common/ImgBox'

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
          className="h-8 w-8 rounded-full p-0"
          aria-label="Add"
        >
          <ImgBox
            src={searchAdd}
            alt="Add search contextual action"
            size={16}
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
          className="mr-[8px] h-8 w-8 rounded-full"
          aria-label="Voice"
        >
          <ImgBox src={searchMicrophone} alt="Voice" size={20} />
        </Button>
        {/* Camera button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="mr-[10px] h-8 w-8 rounded-full"
          aria-label="Camera"
        >
          <ImgBox src={searchCamera} alt="Camera" size={20} />
        </Button>
        {/* AI mode button */}
        <Button
          type="button"
          variant="secondary"
          className="h-[31px] rounded-full px-[10px] font-semibold"
        >
          <ImgBox src={searchAiMode} alt="AI 模式" size={18} />
          AI 模式
        </Button>
      </div>
    </form>
  )
}
