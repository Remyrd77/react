import React, { useState, useEffect, useRef } from 'react'

export default function Flashcard({ flashcard }) {
  const [flip, setFlip] = useState(false)
  const [height, setHeight] = useState('initial')

  const frontEl = useRef()
  const backEl = useRef()

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height
    const backHeight = backEl.current.getBoundingClientRect().height
    setHeight(Math.max(frontHeight, backHeight, 100))
  }

  useEffect(setMaxHeight, [flashcard.question, flashcard.answer, flashcard.options])
  useEffect(() => {
    window.addEventListener('resize', setMaxHeight)
    return () => window.removeEventListener('resize', setMaxHeight)
  }, [])

  return (
    <div className="flip-card">
      <div
        className={`card ${flip ? 'flip' : ''}`}
        style={{ height: height }}
        onClick={() => setFlip(!flip)}
      >
        <div className="front" ref={frontEl}>
          <b>{flashcard.question}</b>
          <div className="flashcard-options">
            {flashcard.options.map(option => {
              return <div className="flashcard-option" key={option}><span dangerouslySetInnerHTML={{ __html: option }}></span></div>
            })}
          </div>
        </div>
        <p>hi</p>
        <div className="back" ref={backEl}><span>{flashcard.answer}</span></div>
      </div>
    </div>
  )
}
