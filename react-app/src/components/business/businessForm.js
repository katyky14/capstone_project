import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { addOneBusinessThunk } from '../../store/business'

import './businessForm.css'

const phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const websiteRegEx = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

function CreateBusinessForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [phone, setPhone] = useState('')
    const [preview_image, setPreviewImage] = useState('')
    const [website, setWebsite] = useState('')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)


    const ownerObj = useSelector(state => state.session.user)
    //console.log('the user obj in form', ownerObj)

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);


        if (validationErrors.length) return alert("Cannot Submit Form, please fill out the required fields")

        const businessInformation = {
            owner_id: ownerObj.id,
            name,
            address,
            city,
            state,
            description,
            phone,
            preview_image,
            website
        }

        let createdBusiness = await dispatch(addOneBusinessThunk(businessInformation))

        //console.log('the created business in component', createdBusiness)
        if (createdBusiness) {
            history.push(`/business/${createdBusiness.id}`)
        }
    }


    useEffect(() => {
        const errors = [];

        if (name.length < 2 || name.length > 50) errors.push('Name must be between 2 and 50 characters')
        if (description.length < 5 || description.length > 255) errors.push('Description must be between 5 and 255 characters')
        if (!phone.match(phoneRegEx)) errors.push('Please enter a valid phone number ex. 000-000-0000')
        if (!preview_image.match(/\.(jpg|jpeg|png|gif)$/)) errors.push('Please provide a valid image extension [png/jpg/jpeg/gif]')
        if (address.length > 35 || address.length < 5) errors.push("Address must be between 5 and 35 characters")
        if (city.length > 18 || city.length < 3) errors.push("City must be between 3 and 18 characters")
        if (state.length > 14 || state.length < 2) errors.push("State must be between 2 and 14 characters")
        if (website.length < 2 || !website.match(websiteRegEx)) errors.push("Business website mus be a valid url ex.(http://example.com)")


        setValidationErrors(errors)
    }, [name, description, phone, preview_image, address, city, state, website])




    return (

        <div className='form-container-main'>

            <div className='left-form left-bz-form'>


                <form onSubmit={onSubmit} >
                    <h2 className='h2-bz-form'>Create Business</h2>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul className='ul-error-bz-form'>
                            {validationErrors.map(error =>
                                <li key={error} className='li-bz-form-errors'>{error}</li>)}
                        </ul>
                    )}

                    <div>

                        <div>
                            <label>Business Name *</label>

                        </div>
                        <input
                            className='input-form'
                            // placeholder='Business Name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>

                        <label>Address *</label>
                        <input
                            className='input-form'
                            // placeholder='Address'
                            type='text'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        />

                    </div>

                    <div>

                        <label>City *</label>
                        <input
                            className='input-form'
                            // placeholder='City'
                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div>

                        <label>State *</label>
                        <input
                            className='input-form'
                            // placeholder='State'
                            type='text'
                            value={state}
                            onChange={e => setState(e.target.value)}
                            required
                        />
                    </div>

                    <div>

                        <label>Description *</label>
                        <input
                            className='input-form'
                            // placeholder='Description'
                            type='text'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div>

                        <label>Phone Number * (ex. 000-000-0000)</label>
                        <input
                            className='input-form'
                            // placeholder='Phone Number (ex 000-000-0000)'
                            type='text'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>website * (ex. https://example.com)</label>
                        <input
                            className='input-form'
                            type='string'
                            value={website}
                            onChange={e => setWebsite(e.target.value)}

                        />
                    </div>

                    <div>

                        <label>Preview Image *
                            <span>
                                (format jpg, jpeg, png, gif)
                            </span>
                        </label>
                        <input
                            className='input-form'
                            // placeholder='Image should be format jpg, jpeg, png'
                            type='string'
                            value={preview_image}
                            onChange={e => setPreviewImage(e.target.value)}
                        />
                    </div>

                    <div>
                        <button className='button-style'> Create New Business</button>
                    </div>

                </form>
            </div>
            <div className='right-form '>
                <img
                className='bz-img'
                    src='https://64.media.tumblr.com/034135208d1b91f579ee5582c19cd0be/tumblr_pw50rmClPW1ufm3tmo2_500.jpg' alt='login-img'
                    style={{
                        width: '300px',
                        height: '300px',
                        borderRadius: '170px'
                    }}
                ></img>
            </div>

        </div>

    )
}

export default CreateBusinessForm;
