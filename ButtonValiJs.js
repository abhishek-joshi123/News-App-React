import React, { useEffect, useState } from 'react'
import Newsittem from './Newsittem';
import Spinner from './Spinner';


export default function News(props) {

  const [articles, setarticles] = useState([])
  const [page, setpage] = useState(1)
  const [loading, setloading] = useState(false)
  const [totalResults, settotalResults] = useState(0)

  const Capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const loadNews = async() => {
      document.title = `News App - ${Capitalize(props.category)} related News`
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
      setloading(true)
      let data = await fetch(url)
      let parsedData = await data.json()
      setarticles(parsedData.articles)
      settotalResults(parsedData.totalResults)
      setloading(false)
    }
    
    useEffect (() => {
      loadNews();
    }, []);
    
    const handlePrevClick = async () => {
      setpage(page-1)
      loadNews();
    }
    
    const handleNextClick = async () => {
      setpage(page+1)
      loadNews();
  }

  const giveStyle = {
    opacity: 0.5,
    cursor: 'not-allowed'
  }
  
  return (
    <div className='news-container'>
      <h1>NewsMonkey - Top {Capitalize(props.category)} Headlines</h1>
      {loading && <Spinner/>}
      <div className="row">
        
        {!loading && articles.map((element)=>{
            return <div className="col" key = {element.url}>
              <Newsittem title = {element.title?element.title.slice(0, 40):""} description = {element.description?element.description.slice(0, 80):""} imgUrl = {element.urlToImage} newsurl = {element.url} author = {element.author} date = {element.publishedAt}/>
            </div>

        })}
        
      </div>

      <div className="btn">
        <button type='button' disabled={page <= 1} style={page<=1?giveStyle:{}} onClick={handlePrevClick}>&larr; Previous</button>
        <button type='button' disabled = {page >= Math.ceil(totalResults/props.pageSize)} style={page >= Math.ceil(totalResults/props.pageSize)?giveStyle:{}} onClick={handleNextClick}>Next &rarr;</button>
      </div>
        
    </div>
  )
}
