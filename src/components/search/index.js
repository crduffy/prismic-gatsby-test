// Search.js

import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

export default function Search() {

    return (
        <InstantSearch
            indexName={process.env.ALGOLIA_INDEX_NAME}
            searchClient={searchClient}
        >
            <div className="search-bar">
            <SearchBox />
            <Hits />
            </div>
        </InstantSearch>
    )
}