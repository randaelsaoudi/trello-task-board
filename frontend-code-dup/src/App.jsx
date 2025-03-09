import { Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import './App.css'
import Loader from './components/loaders/Loader';

const Board = lazy(() => import('./components/board/Board'));

function App() {

  return (
      <div className="w-full">
        <Routes>
          <Route 
          path="/" 
          element={(
            <Suspense fallback={<Loader />}>
              <Board />
            </Suspense>
          )} 
          />
        </Routes>
      </div>
    
  )
}

export default App
