import React , {useState} from 'react';

export default function SearchForm () {
    const [searchValue, setSearchValue] = useState('')
    const [errorVisible, setErrorVisible] = useState(false);

    const handleInputValue = (key) => (e) => {
        setErrorVisible(false);
        setSearchValue(e.target.value);
    }

    const googleSearchHandler = () => {
        setErrorVisible(true);
    }

    return(
        <div className = 'search-form'>
            <input
                type='text'
                className='search-form__value'
                name='searchValue'
                onChange={handleInputValue('searchValue')}
            />
            <button
                className='search-form__on-search'
                onClick={googleSearchHandler}
            >
                Search
            </button>
            <div
                className={errorVisible? 'search-form__not-available' : 'search-form__not-available hide'}
            >
                아직 검색 서비스를 이용할 수 없습니다.
            </div>
        </div>
    )
}

// useEffect(() => {
//     searchValue.current.focus(); // 렌더링되면 저절로 서치바에 포커스됨
//   }, []);
// const handleSubmit = (e) => {
//     e.preventDefault(); // 아무 인풋없이 엔터를 칠수 없도록!
//   };