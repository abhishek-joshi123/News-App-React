import './css/Spinner.css'
import React from 'react'
import loading from './loading.gif'

export default function Spinner() {
  return (
    <div>
      <div className="spin">
      <     img src={loading} alt="loading" />
      </div>
    </div>
  )
}
