// The two-arch Movena mark, lifted from the design export. Both paths are the
// exact `d` strings the design uses, so the shape never drifts between the
// header, the footer and the mockups; only the fills change per surface.
const BACK_PATH =
  'M23.6 25.6 Q23.6 17.6 31.6 17.6 L59.6 17.6 Q67.6 17.6 67.6 25.6 L67.6 73.6 L23.6 73.6 Z M40.1 30.1 Q36.1 30.1 36.1 34.1 L36.1 73.6 L55.1 73.6 L55.1 34.1 Q55.1 30.1 51.1 30.1 Z'
const FRONT_PATH =
  'M32.4 34.4 Q32.4 26.4 40.4 26.4 L68.4 26.4 Q76.4 26.4 76.4 34.4 L76.4 82.4 L32.4 82.4 Z M48.9 38.9 Q44.9 38.9 44.9 42.9 L44.9 82.4 L63.9 82.4 L63.9 42.9 Q63.9 38.9 59.9 38.9 Z'

export default function MovenaMark({
  width = 26,
  height = 32,
  backFill = '#0B1F3B',
  frontFill = '#1D4ED8',
  className,
  style,
}: {
  width?: number
  height?: number
  backFill?: string
  frontFill?: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="22 16 56 68"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path fill={backFill} fillRule="evenodd" d={BACK_PATH} />
      <path fill={frontFill} fillRule="evenodd" d={FRONT_PATH} />
    </svg>
  )
}
