import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProtectedRoute from "./features/auth/components/ui/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
            />
            <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
