import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import { getSearchBzThunk } from '../../store/search';




function SearchBar() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {

        let searchData = true;

        const fetchData = async (search) => {
            const data = await fetch('/api/search/', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ search })
            })
            const dataResponse = await data.json()
            console.log('the response', dataResponse)
            if (searchData) {
                setSearchResults(dataResponse.business)
            }
        }

        fetchData(search);


        return () => searchData = false

    }, [search])

    //to handle the empty object that comes from be?
    const isEmptyObj = (obj) => {
        return JSON.stringify(obj) === '{}';
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        if (search === '') return; // handle empty searches
        if (isEmptyObj(searchResults)) return // searchResults === []

        const searchButton = await dispatch(getSearchBzThunk(search))

        if (searchButton) {
            history.push(`/search/?searchbar=${search}`)
        }

        setSearch('')

    }

    return (
        <>
            <form className='search-main-div'>
                <div>
                    <input
                        name='searchbar'
                        type='search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button
                        onClick={(onSubmit)}
                    ><i className='fa-solid fa-magnifying-glass'></i> </button>
                </div>
            </form>

            {search && searchResults && searchResults.length > 0 && (
                <ul>
                    {
                        searchResults.map(result => (
                            <li key={result.id}>
                                <NavLink to={`/business/${result.id}`}
                                    onClick={() => setSearch('')}
                                >
                                    <p>{result.name}</p>
                                </NavLink>
                            </li>
                        ))
                    }
                </ul>
            )}

            {search && isEmptyObj(searchResults) && search.length > 0 && (
                <ul>
                    <li>No Results Found</li>
                </ul>
            )
            }
        </>
    )


}

export default SearchBar;
