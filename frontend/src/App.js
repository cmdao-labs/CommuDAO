import './App.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Main from './components/Main'
import Jusdt from './components/tBridge-JUSDT.js'

const App = () => {
  const queryClient = new QueryClient()
  
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App">
          <Routes>
            <Route index element={<Main />}/>
            <Route path="/:modeText" element={<Main />}/>
            <Route path="/:modeText/:subModeText" element={<Main />}/>
            <Route path="/:modeText/:subModeText/:intrasubModetext" element={<Main />}/>
            <Route path="tbridge-jusdt" element={<Jusdt />}/>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
