export default function analytics(event: string) {
  ;(window as any).plausible?.(event)
}
