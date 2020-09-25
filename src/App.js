import React, { useEffect, useState } from 'react'
import './App.css'
import spanishJokes from './assets/spanish_jokes'

// Get random spanish joke from dataset. The jokes might be inadequate/NSFW
const getSpanishJoke = () => {
  return spanishJokes[Math.floor(Math.random() * spanishJokes.length)]
}

// Tell me a joke with VoiceRSS Speech Function
const tellMe = (joke) => {
  // VoiceRSS Parameters
  // eslint-disable-next-line no-undef
  VoiceRSS.speech({
    key: 'aa5bde981a7247b8ad936157c19758e3',
    src: joke,
    hl: 'es-es',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  })
}

function App() {
  const [joke, setJoke] = useState('')
  const [disableButton, setDisableButton] = useState(false)

  const getJoke = () => {
    setDisableButton(true)

    const joke = getSpanishJoke()
    setJoke(joke)
  }

  const handleAudioEnd = () => {
    setDisableButton(false)
  }

  useEffect(() => {
    if (joke) {
      tellMe(joke)
    }
  }, [joke])

  return (
    <div className='container'>
      <button id='button' onClick={getJoke} disabled={disableButton}>
        Cuentame un chiste
      </button>
      <audio src='' id='audio' controls onEnded={handleAudioEnd} hidden />
    </div>
  )
}

export default App
