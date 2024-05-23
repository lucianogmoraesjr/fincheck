import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthLayout } from '../layouts/AuthLayout';
import { Dashboard } from '../pages/Dashboard';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

import { AuthGuard } from './AuthGuard';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
