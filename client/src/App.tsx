import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing"
import Auth from "./pages/Auth"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route index element={<Landing />}/>
          <Route path="/auth" element={<Auth />}/>

        </Route>
      </Routes>
      
    </div>
  )
}

export default App
