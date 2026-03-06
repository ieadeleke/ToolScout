import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppShell } from '../shared/layout/AppShell'
import { HomePage } from '../routes/HomePage'
import { SearchPage } from '../routes/SearchPage'
import { ToolPage } from '../routes/ToolPage'
import { QuizPage } from '../routes/QuizPage'
import { LoginPage } from '../routes/LoginPage'
import { RegisterPage } from '../routes/RegisterPage'
import { MyListPage } from '../routes/MyListPage'
import { RequireAuth } from '../routes/RequireAuth'

const router = createBrowserRouter([
  // Full-bleed auth routes (no AppShell)
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  // App routes wrapped in the shell
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'tools/:id', element: <ToolPage /> },
      { path: 'quiz', element: <QuizPage /> },
      { path: 'my-list', element: (
        <RequireAuth>
          <MyListPage />
        </RequireAuth>
      ) },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
