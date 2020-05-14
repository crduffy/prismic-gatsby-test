// Search.js

import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import {
    InstantSearch,
    Hits,
    SearchBox,
    Highlight,
    ClearRefinements,
    RefinementList,
    PoweredBy,
} from 'react-instantsearch-dom';
import { RichText } from 'prismic-reactjs'

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID,
    process.env.GATSBY_ALGOLIA_SEARCH_KEY
)
const defaultTitle = "Untitled"

class AlgoliaResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayResults: false,
        };
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.toggleViewable(false)
        }
    }

    toggleViewable(viewable) {

        this.setState({displayResults: viewable})

    }



    render() {
        return (
        <div ref={this.setWrapperRef} className="ais-InstantSearch" >
            <InstantSearch
                indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
                searchClient={searchClient}
            >
                <div className="top">
                    <SearchBox
                        onFocus={() => this.toggleViewable(true)}
                    />
                </div>
                <div className={this.state.displayResults ? 'algolia-results results-on' : 'algolia-results results-off'}>
                    <div className="left-panel">
                        <ClearRefinements />
                        <h2>Categories</h2>
                        <RefinementList attribute="tags" />
                    </div>
                    <div className="right-panel">
                        <Hits hitComponent={Hit} />
                        <PoweredBy />
                    </div>
                </div>
            </InstantSearch>
        </div>
        )
    }
}

export default function Search() {

    return (
        <AlgoliaResults />
    )
}

function Hit(props) {
    return (
        <div>
            <div className="hit-name">
                title: { RichText.asText(props.hit.title).length !== 0 ? RichText.asText(props.hit.title) : defaultTitle }
            </div>
            <div className="hit-description">
                body: <Highlight attribute="body" hit={props.hit} /> {firstParagraph(props.hit)}
            </div>

        </div>
    );
}

const firstParagraph = (hit => {

    // Find the first text slice of post's body
    let firstTextSlice = hit.body.find(slice => slice.type === 'text');
    if (firstTextSlice != null) {
        // Set the character limit for the text we'll show in the homepage
        const textLimit = 300
        let text = RichText.asText(firstTextSlice.primary.text)
        let limitedText = text.substring(0, textLimit)

        if (text.length > textLimit) {
            // Cut only up to the last word and attach '...' for readability
            return (
                <p>{ limitedText.substring(0, limitedText.lastIndexOf(' ')) + '...' }</p>
            );
        } else {
            // If it's shorter than the limit, just show it normally
            return <p>{ text }</p>;
        }
    } else {
        // If there are no slices of type 'text', return nothing
        return null;
    }
})
