import { useState } from 'react';
import './App.css';
import Navbaar from './components/Navbaar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import State from './Contexts/State';

function App() {

  const [progress, setprogress] = useState(0)

  function setProgress(progress){
    setprogress(progress)
  }
  
  const apiKey = process.env.REACT_APP_NEWS_API
  return (
    <>
    <State> 
      <Router>
        <Navbaar/>
        <LoadingBar
          color = '#f11946'
          progress={progress}
        />

        <Routes>
          <Route path="*" element = {<Navigate to= "/" />} />
          <Route exact path='/' element = {<News setProgress = {setProgress} key = 'general' apiKey = {apiKey} pageSize = {11} country = 'in' category = 'general'/>}></Route>
          <Route exact path='/business' element = {<News setProgress = {setProgress} key = 'business' apiKey = {apiKey} pageSize = {11} country = 'in' category = 'business'/>}></Route>
          <Route exact path='/entertainment' element = {<News setProgress = {setProgress} key = 'entertainment' apiKey = {apiKey} pageSize = {11} country = 'in' category = 'entertainment'/>}></Route>
          <Route exact path='/general' element = {<News setProgress = {setProgress} key = 'general' apiKey = {apiKey} pageSize = {11} country = 'in' category = 'general'/>}></Route>
          <Route exact path='/health' element = {<News setProgress = {setProgress} key = 'health' apiKey = {apiKey} pageSize = {11} country = 'in' category = 'health'/>}></Route>
          <Route exact path='/science' element = {<News setProgress = {setProgress} key = 'science' apiKey = {apiKey} pageSize = {11} country = 'in' category = 'science'/>}></Route>
          <Route exact path='/sports' element = {<News setProgress = {setProgress} key = 'sports' apiKey = {apiKey} pageSize = {11} country = 'in' category = 'sports'/>}></Route>
          <Route exact path='/technology' element = {<News setProgress = {setProgress} key = 'technology' apiKey = {apiKey} pageSize = {11} country = 'in' category = 'technology'/>}></Route>
          <Route path='/search' element = {<News setProgress = {setProgress} apiKey = {apiKey} pageSize = {11} />}></Route>
        </Routes>

      </Router>
    </State>
    </>
  );
}

export default App;
