import { useState, createContext, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'




function App() {

  const userContext = createContext();
  const [user, setUser] = useState('John Doe');


  const CompA = () => {

    return <div className='Box'>
      <h1>compA</h1>
      <CompB></CompB>
    </div>
  }

  const CompB = () => {
    return <div className='Box'>
      <h1>compB</h1>
      <CompC></CompC>
    </div>
  }

  const CompC = () => {
    const [user, setUser] = useContext(userContext);
    // setUser('Jane Doe')
    console.log(useContext(userContext));
    return <div className='Box'>
      <h1 onMouseEnter={setUser((u) => {
        console.log(u);
        return u == "jane" ? "jone" : "jane"
      })}>{user}</h1>
    </div >

  }
  return (
    <>
      <h1>{user}</h1>
      <div className="">
        <userContext.Provider value={[user, setUser]}>
          <CompA></CompA>
        </userContext.Provider>
      </div>
    </>
  )
}

export default App
