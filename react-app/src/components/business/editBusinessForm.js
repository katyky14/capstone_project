import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { authenticate } from '../../store/session'
import { getOneBusinessThunk, editBusinessThunk, addOneBusinessThunk } from '../../store/business'


import './businessForm.css'

const phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
const websiteRegEx = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

function EditBusinessForm() {


    const { businessId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory()
    const ownerObj = useSelector(state => state.session.user)
    const businessObj = useSelector(state => state.businessState[businessId])

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const [phone, setPhone] = useState("")
    const [preview_image, setPreviewImage] = useState("")
    const [website, setWebsite] = useState("")
    const [validationeErrors, setValidationeErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    // aws
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false)


    const updatedName = e => setName(e.target.value)
    const updatedAddress = e => setAddress(e.target.value)
    const updatedCity = e => setCity(e.target.value)
    const updatedState = e => setState(e.target.value)
    const updatedDescription = e => setDescription(e.target.value)
    const updatedPhone = e => setPhone(e.target.value)
    const updatedPreviewImage = e => setPreviewImage(e.target.value)
    const updatedWebsite = e => setWebsite(e.target.value)

    useEffect(() => {
        dispatch(getOneBusinessThunk(+businessId)).then(() => setIsLoaded(true))

    }, [dispatch, businessId])

    useEffect(() => {
        if (businessObj) {
            setName(businessObj.name)
            setAddress(businessObj.address)
            setCity(businessObj.city)
            setState(businessObj.state)
            setDescription(businessObj.description)
            setPhone(businessObj.phone)
            setPreviewImage(businessObj.previewImage)
            setWebsite(businessObj.website)
        }

    }, [businessObj])


    const onSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        if (validationeErrors.length > 0) {

            // return alert('Cannot edit form')
            return

        }

        const businessInformation = {
            id: businessId,
            owner_id: ownerObj.id,
            name,
            address,
            city,
            state,
            phone,
            description,
            preview_image,
            website
        }


        let editedBusiness = await dispatch(editBusinessThunk(businessInformation, +businessId))

        if (editedBusiness) {
            history.push(`/business/${businessId}`)
        }

    }

    useEffect(() => {
        const valerrors = [];


        // if (businessObj != undefined && businessId) {

        if (name.length < 2 || name.length > 50) valerrors.push('Name must be between 2 and 50 characters')
        if (address.length < 5 || address.length > 35) valerrors.push("Address must be between 5 and 35 characters")
        if (city.length < 2 || city.length > 18) valerrors.push("City must be between 2 and 18 characters")
        if (state.length < 2 || state.length > 14) valerrors.push("State must be between 2 and 14 characters")
        if (description.length < 5 || description.length > 255) valerrors.push('Description must be between 5 and 255 characters')

        // if (!phone.match(phoneRegEx)) valerrors.push('Please enter a valid phone number ex. 000-000-0000')
        if (phone.length > 12) valerrors.push("Phone Number must be 10 digit (ex. 000-000-0000)")
        if (!phone.match('[0-9]{3}-[0-9]{3}-[0-9]{4}')) valerrors.push('Please enter a valid phone number ex. 000-000-0000')

        if (!website.match(websiteRegEx)) valerrors.push("Business website mus be a valid url ex.(http://example.com)")
        if (website.length < 3) valerrors.push("Business website must be greater than 2 characters")
        if (!preview_image?.match(/\.(jpg|jpeg|png|gif)$/)) valerrors.push('Please provide a valid image extension [png/jpg/jpeg/gif]')


        setValidationeErrors(valerrors)

        // }
    }, [name, preview_image, phone, businessId, city, address, website, description, state])


    // aws image
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
            //console.log("error");
            alert("Cannot upload your image")
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }



    if (businessObj == undefined) return null;

    return businessObj && (
        <div className='bz-form-container-main'>

            <div className='bz-left-form'>

                <form onSubmit={onSubmit} className='bz-form-div'>
                    <h2 className='h2-bz-form'>Edit My Business</h2>
                    {hasSubmitted && validationeErrors.length > 0 && (
                        <ul className='ul-error-bz-form'>
                            {validationeErrors.map(error =>
                                <li key={error} className='li-bz-form-errors'>{error}</li>)}
                        </ul>
                    )}

                    <div>

                        <label className='bz-form-label'> Business Name *
                        </label>
                        <input
                            className='bz-input-form'
                            // placeholder='Business Name'
                            type='text'
                            value={name}
                            onChange={updatedName}
                            required
                        />
                    </div>
                    <div>
                        <label className='bz-form-label'> Address *
                        </label>

                        <input
                            className='bz-input-form'
                            // placeholder='Address'
                            type='text'
                            value={address}
                            onChange={updatedAddress}
                            required
                        />
                    </div>
                    <div>
                        <label className='bz-form-label'> City *
                        </label>
                        <input
                            className='bz-input-form'
                            // placeholder='City'
                            type='text'
                            value={city}
                            onChange={updatedCity}
                            required
                        />
                    </div>

                    <div>

                        <label className='bz-form-label'> State *
                        </label>
                        <input
                            className='bz-input-form'
                            // placeholder='State'
                            type='text'
                            value={state}
                            onChange={updatedState}
                            required
                        />
                    </div>

                    <div>

                        <label className='bz-form-label'>Description *
                        </label>
                        <input
                            className='bz-input-form'
                            // placeholder='Description'
                            type='text'
                            value={description}
                            onChange={updatedDescription}
                            required
                        />
                    </div>

                    <div>

                        <label className='bz-form-label'>Phone Number * (ex.888-888-8888)
                        </label>
                        <input
                            className='bz-input-form'
                            // placeholder='Phone Number'
                            type='text'
                            value={phone}
                            onChange={updatedPhone}

                        />
                    </div>

                    <div>
                        <label className='bz-form-label'>Website * (ex. https://example.com)</label>
                        <input
                            className='bz-input-form'
                            type='string'
                            value={website}
                            onChange={updatedWebsite}

                        />
                    </div>


                    {/* <div>
                        <label className='bz-form-label'>Preview Image *
                        </label>
                        <input
                            className='bz-input-form'
                            // placeholder='Image should be format jpg, jpeg, png'
                            type='string'
                            value={preview_image}
                            onChange={updatedPreviewImage}
                        />
                    </div> */}

                    <div className='form-fields-upload'>
                        <label>Preview Image *</label>
                        <div className='upload-image'>
                            <div className='inner-upload-img'>
                                <input
                                    className='input-upload'
                                    type='file'
                                    accept="image/*"
                                    onChange={updateImage}
                                    id='file-input'
                                />

                            </div>
                            <div>
                                <button
                                    className='file-upload-button'
                                    type='submit'
                                    onClick={handleSubmit}
                                >Upload</button>
                            </div>
                            {(imageLoading) && <p>Loading...</p>}
                        </div>
                    </div>

                    <button className='button-style' type="submit"> Edit Business</button>

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

export default EditBusinessForm;
