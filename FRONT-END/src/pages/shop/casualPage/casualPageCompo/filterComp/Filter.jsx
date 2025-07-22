import React, { useState } from 'react'
import "./filterStyle.css"
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import{ filterOpen} from "../../../../../features/stateSlice"


const Filter = () => {
    const [slctSize , setSize] = useState("")
    const [rangeVal, setRangeVal] = useState(0)
    const {filOpen} = useSelector((state) => state.sideBarState)
    const dispatch = useDispatch()
    return (
        <aside className={filOpen ? " filterSection show" : "filterSection"}>
            <div className="filterHeadingArea flexContainer">
                <h2 className='filterHeadings'>Filters</h2>
                <img className='filterArrowLeft'  onClick={() => { dispatch(filterOpen({filOpen : false}))}} width={30} height={30} src="arrowLeft.svg" alt="arrow" />
            </div>
            <hr className='filterLine' />
            <div className="filterLinks flexContainer">
                <div className='tShirt'>T-Shirts</div>
                <div className='shorts'>Shorts</div>
                <div className='shirts'>Shirts</div>
                <div className='Jeans'>Jeans</div>
                <div className='hoodie'>Hoodie</div>
            </div>
            <hr className='filterLine' />
            <div className="filterHeadingArea flexContainer">
                <h2 className='filterHeadings'>Price</h2>
            </div>
            <div className="rangeContainer">
                <input type="range" className="customRange" min={100} max={10000}
                    onChange={(e) => setRangeVal(e.target.value)} />
                <p className='rangeValue'>${rangeVal}</p>
            </div>
            <hr className='filterLine' />
            <div className="filterHeadingArea flexContainer">
                <h2 className='filterHeadings'>Colors</h2>
            </div>
            <hr className='filterLine' />
            <div className="filterHeadingArea flexContainer">
                <h2 className='filterHeadings'>Size</h2>
            </div>
            <div className="sizeSelectArea ">
<button onClick={() => setSize("xxSmall")} className={`sizeBtn ${slctSize === "xxSmall" && "xxSmall"}`}>XX-Small</button>
<button onClick={() => setSize("xSmall")} className={`sizeBtn ${slctSize === "xSmall" && "xSmall"}`}>X-Small</button>
<button onClick={() => setSize("small")} className={`sizeBtn ${slctSize === "small" && "small"}`}>Small</button>
<button onClick={() => setSize("mdm")} className={`sizeBtn ${slctSize === "mdm" && "mdm"}`}>Medium</button>
<button onClick={() => setSize("large")} className={`sizeBtn ${slctSize === "large" && "large"}`}>Large</button>
<button onClick={() => setSize("xl")} className={`sizeBtn ${slctSize === "xl" && "xl"}`}>X-Large</button>
<button onClick={() => setSize("xxl")} className={`sizeBtn ${slctSize === "xxl" && "xxl"}`}>xx-Large</button>
<button onClick={() => setSize("xxxl")} className={`sizeBtn ${slctSize === "xxxl" && "xxxl"}`}>3X-Large</button>
<button onClick={() => setSize("xxxxl")} className={`sizeBtn ${slctSize === "xxxxl" && "xxxxl"}`}>4X-Large</button>
            </div>
            <hr className='filterLine' />
            <div className="filterHeadingArea flexContainer">
                <h2 className='filterHeadings'>Dress Style</h2>
            </div>
            <div className="filterLinks flexContainer">
             <NavLink to={""} className={({isActive}) => {`${isActive && ""}`}}>
             <button className='casualBtn'>Casual</button>
             </NavLink>   
             <NavLink to={""} className={({isActive}) => {`${isActive && ""}`}}>
             <button className='formalBtn'>Formal</button>
             </NavLink>   
             <NavLink to={""} className={({isActive}) => {`${isActive && ""}`}}>
             <button className='PartyBtn'>Party</button>
             </NavLink>   
             <NavLink to={""} className={({isActive}) => {`${isActive && ""}`}}>
             <button className='gymBtn'>Gym</button>
             </NavLink>   
            
            </div>
          <button className='apllyFilterBtn'>Apply Filter</button>
        </aside>
    )
}

export default Filter
