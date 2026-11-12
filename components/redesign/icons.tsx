// The design was built against lucide-react 1.70. The site runs 0.577, and
// these five icons are drawn differently there, so they are copied from 1.70
// (ISC licence) to match the design. Every other icon is identical in both
// versions and comes straight from lucide-react.
import { forwardRef, type SVGProps } from 'react'

export {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  Boxes,
  Calculator,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  Compass,
  FileCheck2,
  FileText,
  House,
  Lightbulb,
  Mail,
  MapPin,
  Menu,
  MessageSquareText,
  MessagesSquare,
  MousePointer2,
  MoveRight,
  PackageCheck,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Truck,
  UserRound,
  Users,
  UsersRound,
  Workflow,
  X,
} from 'lucide-react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string; strokeWidth?: number | string }

function make(name: string, body: JSX.Element) {
  const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
    { size = 24, strokeWidth = 2, className, ...rest },
    ref,
  ) {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={['lucide', `lucide-${name}`, className].filter(Boolean).join(' ')}
        aria-hidden="true"
        {...rest}
      >
        {body}
      </svg>
    )
  })
  return Icon
}

export const CalendarDays = make(
  'calendar-days',
  <>
    <path d="M8 2v3" />
    <path d="M16 2v3" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M8 13h.01" />
    <path d="M12 13h.01" />
    <path d="M16 13h.01" />
    <path d="M8 17h.01" />
    <path d="M12 17h.01" />
    <path d="M16 17h.01" />
  </>,
)

export const CalendarRange = make(
  'calendar-range',
  <>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M16 2v3" />
    <path d="M3 9h18" />
    <path d="M8 2v3" />
    <path d="M17 13h-6" />
    <path d="M13 17H7" />
    <path d="M7 13h.01" />
    <path d="M17 17h.01" />
  </>,
)

export const ChartNoAxesCombined = make(
  'chart-no-axes-combined',
  <>
    <path d="M12 16v5" />
    <path d="M16 14.639V21" />
    <path d="M20 10.656V21" />
    <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15" />
    <path d="M4 18.463V21" />
    <path d="M8 14.656V21" />
  </>,
)

export const CheckCircle2 = make(
  'circle-check',
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m16 9-5.5 5.5L8 12" />
  </>,
)

export const CreditCard = make(
  'credit-card',
  <>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
    <path d="M6 14h2" />
  </>,
)
