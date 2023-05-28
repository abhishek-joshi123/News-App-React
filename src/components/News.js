import './css/News.css'
import React, { useEffect, useState, useContext } from 'react'
import Newsittem from './Newsittem';
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import Context from '../Contexts/Context';
import { useLocation } from 'react-router-dom';


export default function News(props) {

  let url = ''
  const [articles, setarticles] = useState([])
  const [page, setPage] = useState(1)
  const [totalResults, settotalResults] = useState(0)
  const [loading, setloading] = useState(true)
  const [Margin, setMargin] = useState('80px 30px 30px')

  const context = useContext(Context)
  const {Click} = context

  const Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const query = queryParams.get('q') || ''
 
  const loadNews = async() => {
      props.setProgress(10) 
      document.title = `News App - ${query? Capitalize(query) : Capitalize(props.category)} related News`
      if(!query){
        url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      }
      else{
        url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&apiKey=${props.apiKey}`
      }
      setloading(true)
      let data = await fetch(url)
      props.setProgress(30)
      let parsedData = await data.json()
      props.setProgress(70)
      setarticles(parsedData.articles)
      settotalResults(parsedData.totalResults > 100 ? 100 : parsedData.totalResults)
      setloading(false)
      props.setProgress(100)
    }
    
    const fetchMoreData = async() => {
      if(!query){
        url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`
      }
      else{
        url = `https://newsapi.org/v2/everything?q=${query}&page=${page+1}&apiKey=${props.apiKey}`
      }
      let data = await fetch(url)
      let parsedData = await data.json()
      setarticles(articles.concat(parsedData.articles))
      setPage(page+1);
    }
    
    useEffect (() => {
      loadNews();
    }, [query]);

    useEffect(() => {
      function handleResize() {
        if (window.innerWidth <= 1230 && window.innerWidth > 590) {
          setMargin(!Click?'220px 30px 30px': '80px 30px 30px')
        } 
        else if (window.innerWidth <= 590) {
          setMargin(!Click?'320px 30px 30px': '80px 30px 30px')
        } 
        else {
          setMargin('80px 30px 30px')
        }
      }
  
      window.addEventListener("resize", handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [Click]);
    
  
  return (
    <div className='news-container'>
      <h1 style={{margin: Margin}}>NewsMonkey - Top {!query ? Capitalize(props.category) : Capitalize(query)} Headlines</h1>
      {loading && <Spinner/>}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={!loading && <Spinner/>}
      > 
      
      <div className="row">
        {articles.map((element) =>{ 
            return <div className="col" key = {element.url  }>
              <Newsittem title = {element.title?element.title.slice(0, 40):""} description = {element.description?element.description.slice(0, 80):""} imgUrl = {element.urlToImage} newsurl = {element.url} author = {element.author} date = {element.publishedAt} source = {element.source.name}/>
            </div>  

        })}
      </div>
      </InfiniteScroll>
        
    </div>
  )
}
