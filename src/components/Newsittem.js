import './css/NewsItem.css'
import React from 'react'

export default function Newsittem(props) {

  const {title, description, newsurl, imgUrl, author, date, source} = props;
  return (
    <div> 
        <div className="card">
          <span className="Source"><strong>{source}</strong></span>
          <img src={imgUrl?imgUrl:"http://cdn.wionews.com/sites/default/files/2023/04/05/343322-untitled-design-2023-04-05t110829364.png"} className="card-img" alt="..." />
          <div className="card-body">
            <h3 className="card-title">{title}...</h3>
            <p className="card-text">{description}...</p>
            <p className='card-author'><small>By <strong>{author?author:"Unknown"}</strong> <br/> on {new Date(date).toGMTString()}</small></p>
            <div className="link">
              <a href= {newsurl} target='_blank' rel="noreferrer">Read More</a>
            </div>
          </div>
        </div>
    </div>
  )
}
