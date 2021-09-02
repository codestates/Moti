import React ,{useState} from 'react';

export default function SingleContent ({tittle, snippet, link, imageUrl}) {
    const [likeClicked, setLikeClicked] = useState(false);

    const likeHandler = () => {
        setLikeClicked(!likeClicked);
    }

    return(
        <div className = 'single-content-box'>
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
            <img
                className='single-content-like'
                src={likeClicked? "https://img.icons8.com/material-rounded/24/000000/like--v1.png":"https://img.icons8.com/material-outlined/24/000000/like--v1.png"}
                onClick={likeHandler}>
            </img>
        </div>
    )
}