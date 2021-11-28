import React from 'react';
import Link from 'react-router-dom'
import NoShow from '../../public/3024051.jpg'

export default function NoData({page}){
    return(
        <div> 
            <div style={{textAlign:"center" , padding:"30px"}}>
                <img style={{height:"250px"}} src={NoShow} alt="No data to show" />
            </div>
            <div style ={{
                fontSize: "25px", 
                letterSpacing: "1px", 
                fontWeight: "450", 
                textAlign: "center", 
                color: "#d7d1d1"}}>
             No {page} to show.  
            </div>
        </div>
    )
}