import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoutes'
import TournamentCreatePage from '../pages/TournamentCreatePage'
import { UserRole } from '../store/UserRole.ts'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="tournament/create" element={<TournamentCreatePage />} />
      {/* Другие админские маршруты */}
    </Routes>
  )
}