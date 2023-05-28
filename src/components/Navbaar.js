import './css/Navbar.css'
import Searchicon from './Searchicon.png';
import React, { useState, useEffect, useContext } from "react";
import Context from '../Contexts/Context';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbaar() {

  const navigate = useNavigate()
  const context = useContext(Context)
  const {Click, setClick} = context
  
  const [search, setSearch] = useState('')
  const [Height, setHeight] = useState('50px')
  const [SearchWidth, setSearchWidth] = useState('280px')
  const [SearchbarWidth, setSearchbarWidth] = useState('200px')
  const [Mode, setMode] = useState('none')
 
  const handle = () => {
    if(Click === false){
      setMode('none')
      setHeight('50px')
     
      if(window.innerWidth <= 1230 && window.innerWidth > 590){
        setSearchWidth('60%')
        setSearchbarWidth('300px')
      }
      else 
      setSearchWidth('50%')
      setSearchbarWidth('180px')
    }
    else{
      setMode('inline')
      setSearchWidth('100%')
      setSearchbarWidth('200px')
      if(window.innerWidth <= 1230 && window.innerWidth > 590){
          setHeight('220px')
        }
        else 
          setHeight('300px')
    }

    setClick(!Click)
  }

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1230 && window.innerWidth > 590) {
        setMode(Click ? "none" : "inline");
        setHeight(Click ? "50px" : "220px");
        setSearchWidth(Click ? '60%' : '100%')
        setSearchbarWidth(Click ? '300px' : '70%')
      } 
      else if (window.innerWidth <= 590) {
        setMode(Click ? "none" : "inline");
        setHeight(Click ? "50px" : "300px");
        setSearchWidth(Click ? '50%' : '100%')
        setSearchbarWidth(Click ? '180px' : '70%')
      } 
      else {
        setMode("inline-block");
        setHeight("50px");
        setSearchWidth('280px')
        setSearchbarWidth('200px')
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [Click]);

  const handleSearch= (e) =>{
      e.preventDefault()
      search && navigate(`/search?q=${search}`)
      setSearch('')
  }

  return (
    <div>
      
      <nav className="navbar" style={{height: Height}}>
        <div className="nav-container">

          <Link className="navbar-brand" to="/">NewsMonkey</Link>

          <button className="navbar-toggler" type="button" onClick={handle}>
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="navbar-collapse" style={{display: window.innerWidth<=1230?Mode:'inline-block'}}>
            <ul>
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/business">Business</Link>
              </li>
              <li className="nav-item">
                <Link to="/entertainment">Entertainment</Link>
              </li>
              <li className="nav-item">
                <Link to="/general">General</Link>
              </li>
              <li className="nav-item">
                <Link to="/health">Health</Link>
              </li>
              <li className="nav-item">
                <Link to="/science">Science</Link>
              </li>
              <li className="nav-item">
                <Link to="/sports">Sports</Link>
              </li>
              <li className="nav-item">
                <Link to="/technology">Technology</Link>
              </li>
            </ul>
          </div>
            <form className="search" style={{width: SearchWidth}} onSubmit={handleSearch}>
                <input className="searchbar" style={{width: SearchbarWidth}} type="text" value={search} placeholder="Get the latest news from here" onChange={(e) => {setSearch(e.target.value)}}/>
                <button onClick={handleSearch}><img src={Searchicon} alt="failed"/></button>
            </form>
        </div> 
      </nav>
    </div>
  );
}
 