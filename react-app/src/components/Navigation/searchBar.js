import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getSearchBzThunk } from '../../store/search';

import './searchBar.css'


function SearchBar() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

        let searchData = true;

        const fetchData = async (search) => {
            // console.log('inside fetchdata')
            // console.log('the search before fetch', search)
            const data = await fetch('/api/search/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ search })
            })

            // console.log('the respnse in fetchdata', data)
            // console.log('the search in fetch data', search)
            const dataResponse = await data.json()
            // console.log('the dataResponse in fetchdata', dataResponse)
            if (searchData) {
                setSearchResults(dataResponse.business)
            }
        }

        fetchData(search);

        // console.log('the function fetchdata', fetchData(search))

        return () => searchData = false

    }, [search])



    const onSubmitSearch = async (e) => {
        e.preventDefault();

        // console.log('IS THE BUTTON WOEKIN?')
        if (search === '') return; // handle empty searches
        if (isEmptyObj(searchResults)) return; // searchResults === []

        //console.log('the search in search bar', typeof search)
        const searchButton = await dispatch(getSearchBzThunk(search))

        // console.log('the dispatch without await', dispatch(getSearchBzThunk(search)))
        // console.log('the dispatch', await dispatch(getSearchBzThunk(search)))
        // console.log('search inside button', searchButton)

        if (searchButton) {
            //history.push('/search')
            history.push(`/search/?searchbar=${search}`)
        }

        setSearch('')



    }

    //to handle the empty object that comes from be?
    const isEmptyObj = (obj) => {
        return JSON.stringify(obj) === '{}';
    }
    return (
        <>
            <form className='search-main-form'>
                <div className='search-inner-div'>
                    <input
                        className='search-input'
                        name='searchbar'
                        type='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    {/* here another input for search in maps */}
                    <button
                        className='search-button'
                        onClick={onSubmitSearch}
                    ><i className='fa-solid fa-magnifying-glass'></i> </button>
                </div>
            </form>

            {search && searchResults && searchResults.length > 0 && (
                <ul className='search-result-ul'>
                    {
                        searchResults.map(result => (
                            <li
                                className='search-result-li'
                                key={result.id}>
                                <NavLink to={`/business/${result.id}`}
                                    onClick={() => setSearch('')}
                                    className='search-result-navlink'
                                >
                                    <p className='search-result-p'>{result.name}</p>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            )}

            {search && isEmptyObj(searchResults) && search.length > 0 && (
                <ul className='search-result-ul'>
                    <li className='search-result-not-found'>No Results Found</li>
                </ul>
            )
            }
        </>
    )


}

export default SearchBar;
