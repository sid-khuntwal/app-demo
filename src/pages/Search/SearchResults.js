import React from 'react'
import "./Search.css"

const SearchResults = ({ products, query }) => {
    return (
        <>
            <div className="heading-container">
                <div className="heading">
                    Search Results
                </div>
                <div className="sub-heading">
                    Showing {products.length} results for "{query}"
                </div>
            </div>
        </>
    )
}

export default SearchResults