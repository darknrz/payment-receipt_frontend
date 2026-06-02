export function LoadingDots() {
  return (
    <div className="mr-auto flex w-fit gap-2 rounded-[26px] border border-ink/10 bg-white/90 p-4 shadow-[0_14px_34px_rgba(33,38,31,0.1)]">
      <span className="h-2.5 w-2.5 rounded-full bg-teal-500 [animation:dot-pulse_1s_infinite_ease-in-out]"></span>
      <span className="h-2.5 w-2.5 rounded-full bg-teal-500 [animation-delay:120ms] [animation:dot-pulse_1s_infinite_ease-in-out]"></span>
      <span className="h-2.5 w-2.5 rounded-full bg-teal-500 [animation-delay:240ms] [animation:dot-pulse_1s_infinite_ease-in-out]"></span>
    </div>
  )
}
