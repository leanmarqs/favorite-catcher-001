import { Routes, Route } from 'react-router-dom'
import { HelloWeirdo } from '@/pages'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HelloWeirdo />} />
      {/* Your routes goes here! */}
    </Routes>
  )
}

export default AppRoutes
