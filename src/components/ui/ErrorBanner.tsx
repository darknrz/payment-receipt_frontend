type ErrorBannerProps = {
  message: string
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="mx-5 mt-4 rounded-[18px] border border-rose-700/20 bg-rose-50/80 px-3.5 py-3 font-bold text-rose-800">
      {message}
    </div>
  )
}
