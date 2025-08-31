
import CasualProduct from '../../components/casualPageCompo/casualProductArea/CasualProduct'
import Filter from '../../components/casualPageCompo/filterComp/Filter'

const CasualPage = () => {
  return (
    <main className="pageCasual">
      <div
        className="
          max-w-[var(--containers-max)] mx-auto 
          grid xl:grid-cols-[295px_1fr] gap-5 
          grid-cols-1 xl:justify-items-center 
          max-[405px]:justify-items-start
        "
      >
        <Filter />
        <CasualProduct />
      </div>
    </main>
  )
}

export default CasualPage


