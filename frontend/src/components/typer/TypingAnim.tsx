import React from 'react'
import { TypeAnimation } from 'react-type-animation';


const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        'Chat with our AI-powered chatbot!',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'Built with OpenAI.',
        1500,
        'Your own Customised ChatGPT!',
        1000,
      ]}
      wrapper="span"
      speed={50}
      style={{ fontSize: '60px ',color:'white', display: 'inline-block',textShadow:"1px 1px 20px #000"}}
      repeat={Infinity}
    />
    );
}

export default TypingAnim
