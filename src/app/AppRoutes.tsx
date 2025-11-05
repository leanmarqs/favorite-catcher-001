import { Routes, Route } from 'react-router-dom'
import { HelloWeirdo, Home } from '@/pages'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/weirdo' element={<HelloWeirdo />} />
      {/* Your routes goes here! */}
    </Routes>
  )
}

export default AppRoutes
