import {Switch, Route, Redirect} from 'react-router-dom'

import Comments from './pages/Comments';
import Home from './pages/Home';
import Routes from './components/Routes';

const App = () => {
  return (
    <>
      <Routes/>
      <header style={{height: 300, backgroundColor: 'red'}}/>
      <Switch>
        <Route path={'/home'} component={Home}/>
        <Route path={'/comments'} component={Comments}/>
        <Redirect to={'/home'}/>
      </Switch>
    </>
  );
}

export default App;
