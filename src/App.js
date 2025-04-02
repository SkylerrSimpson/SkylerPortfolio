import './App.css';
import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Root from './Layout/Root';
import { lazy } from 'react';
const Home = lazy(() => import('./Pages/Home'));
const AboutMe = lazy(() => import('./Pages/AboutMe'));
const MyProjects = lazy(() => import('./Pages/MyProjects'));
const Contact = lazy(() => import('./Pages/Contact'));
const Resume = lazy(() => import('./Pages/Resume'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root/>,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path: 'about-me',
        element: <AboutMe />,
      },
      {
        path: 'my-projects',
        element: <MyProjects />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'resume',
        element: <Resume />,
      },
      {
        path: '*',
        element: <div>404 Not Found</div>
      }
    ]
  }
])

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router = {router} />
      </Suspense>
    </div>
  )

}



export default App;
