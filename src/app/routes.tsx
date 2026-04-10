import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { TripDetails } from './pages/TravelDetails';
import { TravelDiary } from './pages/TravelDiary';
import { MyTrips } from './pages/MyTrips';
import { Places } from './pages/Places';
import { PlaceDetails } from './pages/PlaceDetails';
import { SavedPlaces } from './pages/SavedPlaces';
import { AIPlanner } from './pages/AIPlanner';
import { AdminLayout } from './pages/Admin/AdminLayout';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { AdminUsers } from './pages/Admin/AdminUsers';
import { AdminPlaces } from './pages/Admin/AdminPlaces';
import { AdminReviews } from './pages/Admin/AdminReviews';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      {
        path: 'dashboard',
        Component: AdminDashboard,
      },
      {
        path: 'users',
        Component: AdminUsers,
      },
      {
        path: 'places',
        Component: AdminPlaces,
      },
      {
        path: 'reviews',
        Component: AdminReviews,
      },
      {
        index: true,
        Component: () => {
          // Redirect to dashboard by default
          window.location.href = '/admin/dashboard';
          return null;
        }
      }
    ]
  },
  {
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'places',
        Component: Places,
      },
      {
        path: 'places/:id',
        Component: PlaceDetails,
      },
      {
        path: 'saved',
        Component: SavedPlaces,
      },
      {
        path: 'trip/:id',
        Component: TripDetails,
      },
      {
        path: 'travel-diary',
        Component: TravelDiary,
      },
      {
        path: 'my-trips',
        Component: MyTrips,
      },
      {
        path: 'ai-planner',
        Component: AIPlanner,
      },
    ],
  },
]);
 
