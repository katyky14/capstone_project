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


    //added for aws
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);


    const ownerObj = useSelector(state => state.session.user)
    //console.log('the user obj in form', ownerObj)

    const onSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);


        if (validationErrors.length > 0) {

            // return alert("Cannot Submit Form, please fill out the required fields")
            return
        }

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

        // if (name.length < 2 || name.length > 50) errors.push({message: 'Name must be between 2 and 50 characters', key: 'name'})
        if (name.length < 2 || name.length > 50) errors.push('Name must be between 2 and 50 characters')
        if (address.length > 35 || address.length < 5) errors.push("Address must be between 5 and 35 characters")
        if (city.length < 2 || city.length > 18) errors.push("City must be between 2 and 18 characters")
        if (state.length < 2 || state.length > 14) errors.push("State must be between 2 and 14 characters")
        if (description.length < 5 || description.length > 255) errors.push('Description must be between 5 and 255 characters')

        if (phone.length > 12) errors.push("Phone Number must be 10 digit (ex. 000-000-0000)")
        if (!phone.match('[0-9]{3}-[0-9]{3}-[0-9]{4}')) errors.push('Please enter a valid phone number ex. 000-000-0000')


        if (!website.match(websiteRegEx)) errors.push("Business website must be a valid url ex.(http://example.com)")
        if (website.length < 3) errors.push("Business website must be greater than 2 characters")
        if (!preview_image.match(/\.(jpg|jpeg|png|gif)$/)) errors.push('Please provide a valid image extension [png/jpg/jpeg/gif]')


        setValidationErrors(errors)
    }, [name, description, phone, preview_image, address, city, state, website])


    //aws image

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/business/upload', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            const data = await res.json();

            setPreviewImage(data.url)

            setImageLoading(false);
            // history.push("/business");
            alert("Successfully uploaded")
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
            alert("Cannot upload your image")
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (

        <div className='bz-form-container-main'>

            <div className='bz-left-form'>


                <form onSubmit={onSubmit} className='bz-form-div'>
                    <h2 className='h2-bz-form'>Hello! Let's start with your Business</h2>
                    {hasSubmitted && validationErrors.length > 0 && (
                        <ul className='ul-error-bz-form'>
                            {validationErrors.map(error =>
                                typeof error === "string" && <li key={error} className='li-bz-form-errors'>{error}</li>)}
                        </ul>
                    )}

                    <div>

                        <div>
                            <label className='bz-form-label'>Business Name *</label>
                        </div>
                        <input
                            className='bz-input-form'
                            // placeholder='Business Name'
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        {/*{validationErrors.find(error => error.key === "name")?.message} */}
                    </div>

                    <div>

                        <label className='bz-form-label'>Address *</label>
                        <input
                            className='bz-input-form'
                            // placeholder='Address'
                            type='text'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        />

                    </div>

                    <div>

                        <label className='bz-form-label'>City *</label>
                        <input
                            className='bz-input-form'
                            // placeholder='City'
                            type='text'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div>

                        <label className='bz-form-label'>State *</label>
                        <input
                            className='bz-input-form'
                            // placeholder='State'
                            type='text'
                            value={state}
                            onChange={e => setState(e.target.value)}
                            required
                        />
                    </div>

                    <div>

                        <label className='bz-form-label'>Description *</label>
                        <input
                            className='bz-input-form'
                            // placeholder='Description'
                            type='text'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div>

                        <label className='bz-form-label'>Phone Number * (ex. 000-000-0000)</label>
                        <input
                            className='bz-input-form'
                            // placeholder='Phone Number (ex 000-000-0000)'
                            type='text'
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className='bz-form-label'>Website * (ex. https://example.com)</label>
                        <input
                            className='bz-input-form'
                            type='string'
                            value={website}
                            onChange={e => setWebsite(e.target.value)}

                        />
                    </div>

                    {/* <div>

                        <label className='bz-form-label'>Preview Image *
                            <span>
                                (format jpg, jpeg, png, gif)
                            </span>
                        </label>
                        <input
                            className='bz-input-form'
                            // placeholder='Image should be format jpg, jpeg, png'
                            type='string'
                            value={preview_image}
                            onChange={e => setPreviewImage(e.target.value)}
                        />
                    </div> */}
                    {/* image aws upload */}

                    <div>
                        <label>Preview Image *</label>
                        <div className='upload-image'>
                            <div className='inner-upload-img'>
                                    <input
                                        className='input-upload'
                                        type='file'
                                        accept="image/*"
                                        onChange={updateImage}
                                        id='file'
                                    />

                            </div>
                            <div>
                                <button
                                    type='submit'
                                    onClick={handleSubmit}
                                >Upload</button>
                            </div>
                            {(imageLoading) && <p>Loading...</p>}
                        </div>
                    </div>




                    <div>
                        <button className='button-style'> Create New Business</button>
                    </div>

                </form>
            </div>
            <div className='bz-right-form '>
                <img
                    className='bz-img'
                    src='https://lolwildriftbuild.com/wp-content/uploads/2021/01/Teemo-Portrait.jpg' alt='bz-img'
                ></img>
            </div>

        </div>

    )
}

export default CreateBusinessForm;
