
import './App.css';

// Pages
import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Header from './component/Header/Header'
// component
import Sidebar from './component/Sidebar';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className='flex flex-row flex-nowrap page-root'>
        <Sidebar />

        <div className="w-11/12">
          <Header />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            {/* <Route exact path='/dashboard' component={Dashboard} /> */}

            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
