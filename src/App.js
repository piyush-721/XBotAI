import './App.css';
import AppLayout from './AppLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home/Home';
import PastConversations from './pages/PastConversations/PastConversations';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "history",
        element: <PastConversations />
      },
    ]
  },
])

