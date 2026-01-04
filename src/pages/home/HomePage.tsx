import SearchBar from '@/components/home/SearchBar'
import { GoogleLogo } from '@/components/home/GoogleLogo'
import { SearchActions } from '@/components/home/SearchActions'
import { TopNav } from '@/components/home/TopNav'
import { Footer } from '@/components/home/Footer'

export default function HomePage() {
  console.log('HomePage')
  return (
    <div className="flex w-full flex-col bg-[#11223300] text-neutral-900">
      <TopNav />
      <main className="flex flex-1 flex-col items-center">
        <div className="w-full max-w-5xl bg-[#44556600] px-6">
          {/* 往右 1.5rem，可改 pl-4 / pl-8 */}
          <div className="pl-[50px]">
            <GoogleLogo />
          </div>
          <div className="mt-[14px]">
            <SearchBar />
          </div>
          <div className="mt-[29px]">
            <SearchActions />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
