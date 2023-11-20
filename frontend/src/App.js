import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Main from './components/Main'

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
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  )
}

export default App
