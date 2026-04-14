const stats = [
  { value: '2x', label: 'Faster quoting', sub: 'vs. manual methods' },
  { value: '40%', label: 'Less admin time', sub: 'per week on average' },
  { value: '98%', label: 'Quote acceptance', sub: 'with digital signing' },
  { value: '1 tool', label: 'Instead of five', sub: 'for the entire job' },
]

export default function Stats() {
  return (
    <section className="bg-white py-20 border-t border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map(({ value, label, sub }) => (
            <div key={label} className="text-center">
              {/* Orange = key stats per brand rules */}
              <p className="text-[40px] sm:text-[48px] lg:text-[56px] font-extrabold tracking-[-0.03em] text-[#F97316] leading-none mb-2">
                {value}
              </p>
              <p className="text-[16px] font-bold text-[#0B1F3B]">{label}</p>
              <p className="text-[13px] font-medium text-[#475569] mt-1">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
