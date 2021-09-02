import React from 'react';

import SearchForm from './SeachForm';
import SingleContent from './SingleContent';

import { searchResult } from './searchResultExample';


export default function GoogleSearch () {

    return(
        <div className='search'>
            <SearchForm />
            {
                searchResult? searchResult.map((search, idx) => {
                    return(
                        <SingleContent
                            key={idx}
                            tittle={search.tittle}
                            snippet={search.snippet}
                            link={search.link}
                            imageUrl={search.imageUrl}
                        />
                    )
                })
                :''
            }
        </div>
    )

}

