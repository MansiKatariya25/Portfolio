export default function Navbar() {
  const RESUME_URL = 'https://drive.google.com/file/d/1QmfOS43MGnfdNiGy9LbWduMSXz1ErJ3F/view?usp=sharing'
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
    { id: 'resume', label: 'Resume' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-violet-200">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#home" className="logo font-semibold text-2xl text-gray-900">
          Mansi
        </a>
        <ul className="quicksand hidden md:flex items-center gap-8 text-gray-800">
          {navItems.map((item) => {
            const isResume = item.id === 'resume'
            const href = isResume ? RESUME_URL : `#${item.id}`
            return (
              <li key={item.id}>
                <a
                  href={href}
                  {...(isResume ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="hover:text-violet-700 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 bg-white text-gray-700"
          onClick={() => {
            const menu = document.getElementById('mobile-menu')
            if (menu) menu.classList.toggle('hidden')
          }}
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </nav>
      <div id="mobile-menu" className="md:hidden hidden border-t border-violet-200 bg-white/80">
        <ul className="max-w-6xl mx-auto px-6 py-4 grid gap-4">
          {navItems.map((item) => {
            const isResume = item.id === 'resume'
            const href = isResume ? RESUME_URL : `#${item.id}`
            return (
              <li key={item.id}>
                <a
                  href={href}
                  {...(isResume ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block py-2 text-gray-800 hover:text-violet-700"
                  onClick={() => {
                    const menu = document.getElementById('mobile-menu')
                    if (menu) menu.classList.add('hidden')
                  }}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
