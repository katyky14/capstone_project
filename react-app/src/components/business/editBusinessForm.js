import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { authenticate } from '../../store/session'
import { getOneBusinessThunk, editBusinessThunk, addOneBusinessThunk } from '../../store/business'

const phoneRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

function EditBusinessForm() {

    const { businessId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory()

    //console.log('the business id', businessId)

    const ownerObj = useSelector(state => state.session.user)
    //console.log('the ownerobj', ownerObj)

    const businessObj = useSelector(state => state.businessState[businessId])
    //console.log('the business obj in compon', businessObj)


    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [description, setDescription] = useState("")
    const [phone, setPhone] = useState("")
    const [preview_image, setPreviewImage] = useState("")
    const [validationeErrors, setValidationeErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const updatedName = e => setName(e.target.value)
    const updatedAddress = e => setAddress(e.target.value)
    const updatedCity = e => setCity(e.target.value)
    const updatedState = e => setState(e.target.value)
    const updatedDescription = e => setDescription(e.target.value)
    const updatedPhone = e => setPhone(e.target.value)
    const updatedPreviewImage = e => setPreviewImage(e.target.value)

    useEffect(() => {
        dispatch(getOneBusinessThunk(+businessId)).then(() => setIsLoaded(true))
    }, [dispatch])

    useEffect(() => {
        if (businessObj) {
            setName(businessObj.name)
            setAddress(businessObj.address)
            setCity(businessObj.city)
            setState(businessObj.state)
            setDescription(businessObj.description)
            setPhone(businessObj.phone)
            setPreviewImage(businessObj.previewImage)
        }

    }, [businessObj])


    const onSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)

        if (validationeErrors.length) return alert('Cannot edit form')

        const businessInformation = {
            id: businessId,
            owner_id: ownerObj.id,
            name,
            address,
            city,
            state,
            phone,
            description,
            preview_image
        }


        let editedBusiness = await dispatch(editBusinessThunk(businessInformation))

        if (editedBusiness) {
            history.push(`/business/${editedBusiness.editedBusiness.id}`)
        }

    }

    useEffect(() => {
        const valerrors = [];


        // if (businessObj != undefined && businessId) {

            if (name.length < 2 || name.length > 50) valerrors.push('Name must be between 2 and 50 characters')
            if (!phone.match(phoneRegEx)) valerrors.push('Please enter a valid phone number ex. 000-000-0000')
            if (!preview_image?.match(/\.(jpg|jpeg|png|gif)$/)) valerrors.push('Please provide a valid image extension [png/jpg/jpeg/gif]')
            setValidationeErrors(valerrors)

        // }
    }, [name, preview_image, phone, businessId, businessObj])





    if (businessObj == undefined) return null;

    return businessObj && (
        <>
            <h2>Edit Form</h2>

            <form onSubmit={onSubmit} >
                {hasSubmitted && validationeErrors.length > 0 && (
                    <ul>
                        {validationeErrors.map(error =>
                            <li key={error}>{error}</li>)}
                    </ul>
                )}

                <label>
                    <input
                        placeholder='Business Name'
                        type='text'
                        value={name}
                        onChange={updatedName}
                        required
                    />
                </label>

                <label>
                    <input
                        placeholder='Address'
                        type='text'
                        value={address}
                        onChange={updatedAddress}
                        required
                    />
                </label>

                <label>
                    <input
                        placeholder='City'
                        type='text'
                        value={city}
                        onChange={updatedCity}
                        required
                    />
                </label>

                <label>
                    <input
                        placeholder='State'
                        type='text'
                        value={state}
                        onChange={updatedState}
                        required
                    />
                </label>

                <label>
                    <input
                        placeholder='Description'
                        type='text'
                        value={description}
                        onChange={updatedDescription}
                        required
                    />
                </label>

                <label>
                    <input
                    placeholder='Phone Number'
                    type='text'
                    value={phone}
                    onChange={updatedPhone}

                    />
                </label>

                <label>
                    <input
                        placeholder='Image should be format jpg, jpeg, png'
                        type='string'
                        value={preview_image}
                        onChange={updatedPreviewImage}
                    />
                </label>

                <button onClick={() => history.push(`/business/${businessId}`)}> Edit Business</button>

            </form>

        </>
    )

}

export default EditBusinessForm;
