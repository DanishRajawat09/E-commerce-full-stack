
import "./casualStyle.css"

import CasualProduct from '../../components/casualPageCompo/casualProductArea/CasualProduct'
import Filter from '../../components/casualPageCompo/filterComp/Filter'
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
