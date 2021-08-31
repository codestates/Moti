import React from 'react';

export default function SingleContent ({tittle, snippet, link, imageUrl}) {
    return(
        <a className='single-content' href=''>
            {!!(imageUrl)? 
                <img
                    className='single-content__image'
                    src={imageUrl}
                />
            :''}
            <div className='single-content__text-content'>
                <div className='single-content__tittle'>
                    {tittle}
                </div>
                <div className='single-content__explain'>
                    {snippet}
                </div>
            </div>
        </a>
    )
}