import React from 'react'
import "./casualStyle.css"
import Filter from './casualPageCompo/filterComp/Filter'
import CasualProduct from './casualPageCompo/casualProductArea/CasualProduct'
const CasualPage = () => {
  return (
    <main className='pageCasual'>
 <div className='container grid casualContainer'>
  <Filter/>
  <CasualProduct/>
 </div>
    </main>
  )
}

export default CasualPage
