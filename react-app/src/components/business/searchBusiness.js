import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from 'react-router-dom';


function SearchBusiness() {


    const search = useSelector(state => state.searchState);
    console.log('search', search)

    const isEmptyObject = (obj) => {
        return JSON.stringify(obj) === '{}'
    }

    if (isEmptyObject(search)) {
        return  (
            <div>
                <h2>No results found</h2>
            </div>
        )
    }




    if (!search) return null;

    return (
        <div>
            <div>
                <h2>Search Results: </h2>
            </div>


            <div>
                {search.map(res => (
                    <div key={res.id}>
                        <Link to={`/business/${res.id}`}>
                            <div>
                                <div>Image</div>
                                <div>{res.name}</div>
                            </div>



                        </Link>


                    </div>
                ))}



            </div>





        </div>
    )


}


export default SearchBusiness;
