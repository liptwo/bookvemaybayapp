import React, { useEffect, useRef } from 'react'
import { animate } from 'animejs'

const AnimatedLetters = ({ text, className = '', as: Component = 'h2' }) => {
  const textRef = useRef(null)
  const baseClassName = 'animated-text-wrapper' // A consistent base class
  const { words } = text.split('p', {
    words: { wrap : 'clip' }
  })
  useEffect(() => {
    const element = textRef.current
    if (!element) return

    // Tách từng ký tự và bọc trong span
    // element.innerHTML = text.replace(/\S/g, "<span class='letter'>$&</span>")

    // Construct the target selector based on the baseClassName
    // const letterTarget = `.${baseClassName} .letter`

    animate((words), {
      y: [
        { to: ['100%', '0%'] },
        { to: '-100%', delay: 750, ease: 'in(3)' }
      ],
      loop: true,
      opacity: [0, 1],
      easing: 'easeInOutQuad',
      duration: 2250,
      delay: (el, i) => 150 * (i + 1)
    })
    // .add({
    //   // Target the main wrapper element for fading out
    //   targets: `.${baseClassName}`,
    //   opacity: 0,
    //   duration: 1000,
    //   easing: 'easeOutExpo',
    //   delay: 1000
    // })
  }, [text, className]) // Re-run effect if text or className changes

  // Combine the user-provided className with the baseClassName
  const combinedClassName = className
    ? `${baseClassName} ${className}`
    : baseClassName

  return React.createElement(
    Component, // Renamed 'as' to 'Component' for better React convention
    { ref: textRef, className: combinedClassName },
    null // innerHTML will populate this, so no need for 'text' here
  )
}

export default AnimatedLetters
