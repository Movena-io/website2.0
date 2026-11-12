'use client'

// The design's UI primitives (src/components/Ui.tsx in the export), with Next
// links in place of react-router. Markup and class names are unchanged.
import Link from 'next/link'
import type { ComponentProps, ElementType, ReactNode } from 'react'

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: 'display' | 'xl' | 'lg' | 'md'
  className?: string
  children: ReactNode
}

export function Heading({ as = 'h2', size = 'lg', className, children }: HeadingProps) {
  const Tag = as
  return <Tag className={cx('heading', `heading-${size}`, className)}>{children}</Tag>
}

// The design renders eyebrows as nothing; kept so the page code reads like the
// design's and the labels can return by changing this one function.
export function Eyebrow(_: { children: ReactNode; className?: string }) {
  return null
}

export function Lead({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('lead', className)}>{children}</p>
}

type Variant = 'primary' | 'outline' | 'ghost' | 'light'

type ButtonLinkProps = {
  to: string
  children: ReactNode
  variant?: Variant
  size?: 'default' | 'small'
  className?: string
}

export function ButtonLink({ to, children, variant = 'primary', size = 'default', className }: ButtonLinkProps) {
  const cls = cx('button', `button-${variant}`, size === 'small' && 'button-small', className)
  if (to.startsWith('http') || to.startsWith('#') || to.startsWith('tel:') || to.startsWith('mailto:')) {
    return (
      <a className={cls} href={to}>
        {children}
      </a>
    )
  }
  return (
    <Link className={cls} href={to}>
      {children}
    </Link>
  )
}

type ButtonProps = ComponentProps<'button'> & {
  variant?: Variant
  size?: 'default' | 'small'
}

export function Button({ children, className, variant = 'primary', size = 'default', type = 'button', ...props }: ButtonProps) {
  return (
    <button
      className={cx('button', `button-${variant}`, size === 'small' && 'button-small', className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export function IconBox({ icon: Icon, tone = 'blue' }: { icon: ElementType; tone?: 'blue' | 'navy' | 'sky' | 'green' }) {
  return (
    <span className={cx('icon-box', `icon-box-${tone}`)} aria-hidden="true">
      <Icon size={20} strokeWidth={1.6} />
    </span>
  )
}

// The design's default intro text is placeholder text. Here there is no default: a
// section without real text simply renders no lead.
export function SectionIntro({
  eyebrow,
  title,
  text = null,
  align = 'left',
}: {
  eyebrow?: string
  title: ReactNode
  text?: string | null
  align?: 'left' | 'center'
}) {
  return (
    <div className={cx('section-intro', align === 'center' && 'section-intro-center')}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading>{title}</Heading>
      {text && <Lead>{text}</Lead>}
    </div>
  )
}
