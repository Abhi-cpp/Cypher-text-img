import './App.css'
import Cypher from "./Cypher-text/Cypher"
import CypherImage from './Cypher-image/cypherImage'
import { useState } from 'react'
function App() {
  const [text, setText] = useState(true);
  return (
    <>
      <h1 id='head'>Welcome To Cypher App</h1>
      <div id='Cypher-div'>
        <button className={text ? "active" : "cypher"} onClick={() => { setText(true) }} >Text Cypher</button>
        <button className={text ? "cypher" : "active"} onClick={() => { setText(false) }} >Image Cypher</button>
      </div>
      {text ? <Cypher /> : <CypherImage />}
    </>
  )
}

export default App
