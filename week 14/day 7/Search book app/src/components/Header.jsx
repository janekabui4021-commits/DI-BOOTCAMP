import React from 'react'

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Page & Pine home">
        <span className="brand-mark" aria-hidden="true">p.</span>
        <span>page <span className="brand-amp">&</span> pine</span>
      </a>
      <span className="header-note"><span className="header-dot" /> A little library for big imaginations</span>
    </header>
  )
}

export default Header
