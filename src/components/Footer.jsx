const IconLinkedIn = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M22.225 0H1.771C.792 0 0 .774 0 1.729V22.27C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.73C24 .774 23.2 0 22.222 0zM7.052 20.452H3.861V9h3.191v11.452zM5.457 7.433a1.85 1.85 0 1 1 0-3.7 1.85 1.85 0 0 1 0 3.7zM20.447 20.452h-3.553V14.89c0-1.328-.024-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.94v5.659H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.601 0 4.266 2.37 4.266 5.455v6.288z"/>
  </svg>
)

const IconGitHub = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.26.79-.58 0-.29-.01-1.04-.02-2.04-3.2.69-3.87-1.36-3.87-1.36-.53-1.35-1.29-1.71-1.29-1.71-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.04 1.77 2.72 1.26 3.38.96.11-.75.41-1.26.74-1.55-2.56-.29-5.26-1.28-5.26-5.68 0-1.25.45-2.27 1.2-3.06-.12-.29-.52-1.48.12-3.07 0 0 .98-.31 3.22 1.17.92-.25 1.9-.38 2.88-.38.98 0 1.96.13 2.88.38 2.24-1.48 3.22-1.17 3.22-1.17.64 1.59.24 2.78.12 3.07.75.79 1.2 1.81 1.2 3.06 0 4.41-2.7 5.38-5.28 5.66.42.36.8 1.06.8 2.15 0 1.55-.01 2.79-.01 3.17 0 .32.21.7.8.58C20.22 21.43 23.5 17.1 23.5 12 23.5 5.73 18.27.5 12 .5z"/>
  </svg>
)

const IconInstagram = (props) => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="2"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-violet-100 border-t border-violet-200">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          {/* Left: brand + copyright */}
          <div>
            <div className="text-3xl font-semibold text-gray-900 logo">Mansi</div>
            <p className="mt-3 text-gray-700 text-sm quicksand">
              © {new Date().getFullYear()} Mansi Katariya. Made with React.
            </p>
          </div>

          {/* Right: links + socials */}
          <div className="quicksand flex flex-col items-start sm:items-end gap-5">
            <nav className="flex items-center gap-8 text-gray-900 font-medium">
              <a href="#skills" className="hover:text-violet-800">Skills</a>
              <a href="#contact" className="hover:text-violet-800">Contact</a>
              <a href="#work" className="hover:text-violet-800">Work</a>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/mansi-katariya-436209247/" target="blank" aria-label="LinkedIn"
                className="inline-grid place-items-center w-10 h-10 rounded-xl bg-white border-2 border-gray-900 shadow-[4px_4px_0_0_#000] text-gray-900 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_#000] transition"
              >
                <IconLinkedIn />
              </a>
              <a
                href="https://github.com/MansiKatariya25" target="blank" aria-label="GitHub"
                className="inline-grid place-items-center w-10 h-10 rounded-xl bg-white border-2 border-gray-900 shadow-[4px_4px_0_0_#000] text-gray-900 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_#000] transition"
              >
                <IconGitHub />
              </a>
              <a
                href="https://www.instagram.com/mansii.katariyaa?igsh=Z3RsMGEzeDBvcXNq" target="blank"aria-label="Instagram"
                className="inline-grid place-items-center w-10 h-10 rounded-xl bg-white border-2 border-gray-900 shadow-[4px_4px_0_0_#000] text-gray-900 hover:translate-y-0.5 hover:shadow-[3px_3px_0_0_#000] transition"
              >
                <IconInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

