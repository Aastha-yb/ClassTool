import React from 'react';
import "../../styles/featuredInfo.css"

export default function FeaturedInfo(){
    return (
        <div className="featured"> 
            <div className="featuredItem">
                <span className="featuredTitle"> Group Name</span>
                <div className = "featuredContentContainer">
                <span className="featuredContent"> Instructor name</span>
                <span className="featuredContent"> Description</span>
                </div>
            </div>   
        </div>
    )
}