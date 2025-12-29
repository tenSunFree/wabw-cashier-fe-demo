import SearchBar from '@/components/common/SearchBar'
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
        <div className="w-full max-w-5xl px-6 pt-16">
          <GoogleLogo />
          <div className="mt-8">
            <SearchBar />
          </div>
          <div className="mt-6">
            <SearchActions />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
