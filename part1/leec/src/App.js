import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = (props) => {
  console.log('props value is', props)
  const { onClick, text } = props
  return <button onClick={onClick}>{text}</button>
}
// const App = () => {
//   const [counter, setCounter] = useState(0)

//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const setToZero = () => setCounter(0)

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text="plus" />
//       <Button onClick={decreaseByOne} text="minus" />
//       <Button onClick={setToZero} text="zero" />
//     </div>
//   )
// }

const History = (props) => {
  if (props.allClicks.length === 0) {
    return <div>The app is used by pressing the buttons.</div>
  }
  return <div>Button press history: {props.allClicks.join(' ')}</div>
}

// const App = () => {
//   const [clicks, setClicks] = useState({
//     left: 0,
//     right: 0
//   })
//   const [allClicks, setAll] = useState([])
//   debugger
//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setClicks({ ...clicks, left: clicks.left + 1 })
//   }

//   const handleRightClick = () => {
//     setClicks({ ...clicks, right: clicks.right + 1 })
//     setAll(allClicks.concat('R'))
//   }

//   return (
//     <div>
//       {clicks.left}
//       <Button onClick={handleLeftClick} text="left" />
//       <Button onClick={handleRightClick} text="right" />
//       {clicks.right}
//       <History allClicks={allClicks} />
//     </div>
//   )
// }

const App = () => {
  const [value, setValue] = useState(10)

  const setToVal = (nv) => () => {
    console.log('value is', nv)
    setValue(nv)
  }

  return (
    <div>
      <h1>Greetings</h1>
      {value}
      <button onClick={setToVal(0)}>reset to zero</button>
      <button onClick={setToVal(1000)}>reset to thousand</button>
      <button onClick={setToVal(value + 1)}>increment</button>
    </div>
  )
}
export default App
