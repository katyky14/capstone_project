import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './searchBusiness.css'

function SearchBusiness() {
    const searchArr = useSelector(state => state.searchState)
    // console.log('the search for bz', searchArr)

    // console.log('DO YOU SEE ME IN SEARCH BZ COMPO')
    const isEmptyObj = (obj) => {
        return JSON.stringify(obj) === '{}';
    }


    if (isEmptyObj(searchArr)) {
        return (
            <div className="no-results-header">
                <h2>No Results Found</h2>
            </div>
        )
    }

    const averageRate = (reviews) => {
        let total = 0;
        for (let  i = 0; i < reviews.length; i++) {
            total += reviews[i].rating
        }

        return (total/ reviews.length).toFixed(2);
    }

    if (!searchArr) return null;

    return (
        <div className="search-business-page">
            <div className="search-page-header">
                <h2>Best results </h2>
            </div>

            <div className="search-business-page-container">
                {searchArr.map((result) => (
                    <div className="search-business-card-div">
                        <Link to={`/business/${result.id}`} className="search-business-card-link">
                            <div className="search-business-card-base">
                                <div className="search-business-image-div">
                                    <img className="search-business-image"
                                    src={result.previewImage}
                                    onError={e => { e.currentTarget.src = 'https://static.vecteezy.com/system/resources/previews/005/276/530/original/set-of-cute-kawaii-breakfast-food-and-beverages-free-vector.jpg'; e.currentTarget.className ='error-img-all-bz' }}
                                    />
                                </div>
                                <div className="search-business-card-text-div">
                                    <div className="search-business-card-text-name">{result.name}</div>
                                    <div className="search-business-card-rate"><i className="fa-solid fa-star"></i> {result.reviews.length ? averageRate(result.reviews) : "No Reviews Yet!"}</div>
                                    <div className="search-business-card-address">{result.address}, {result.city}</div>
                                    <div className="search-business-card-description">{result.description}</div>
                                    <div className="search-business-card-review"><i class="fa-regular fa-message"></i> {result.reviews.map(rev => rev.review)} </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )


}

export default SearchBusiness;
