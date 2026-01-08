export default function NotFound() {
  return (
    <>
      <div className="bg-background flex h-screen w-full flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-primary text-6xl font-bold">404</h1>
        <h2 className="text-foreground text-2xl font-semibold">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md text-base">
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or perhaps never existed.
        </p>
      </div>
    </>
  )
}
