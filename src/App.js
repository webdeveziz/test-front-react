import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Lists from './components/lists'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Lists />
      </div>
    </BrowserRouter>
  )
}

export default App
