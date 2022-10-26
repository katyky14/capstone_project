import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { authenticate } from '../../store/session'
import { getOneBusinessThunk, editBusinessThunk, addOneBusinessThunk } from '../../store/business'

function EditBusinessForm() {

    const { businessId } = useParams()
    const dispatch = useDispatch();
    const history = useHistory()

    //console.log('the business id', businessId)

    const ownerObj = useSelector(state => state.session.user)
    //console.log('the ownerobj', ownerObj)

    // const buz = useSelector(state => state.businessState)
    // const buzArr = Object.values(buz)
    // const buzValues = buzArr.find(b => b.id === Number(businessId))
    // console.log('the buz', buz)
    // console.log('the buz arr', buzArr)
    // console.log('the values', buzValues)

    const businessObj = useSelector(state => state.businessState[businessId])
    console.log('the business obj in compo', businessObj)


    const [name, setName] = useState(businessObj?.name)
    const [address, setAddress] = useState(businessObj?.address)
    const [city, setCity] = useState(businessObj?.city)
    const [state, setState] = useState(businessObj?.state)
    const [description, setDescription] = useState(businessObj?.description)
    const [preview_image, setPreviewImage] = useState(businessObj?.previewImage)
    const [validationeErrors, setValidationeErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const updatedName = e => setName(e.target.value)
    const updatedAddress = e => setAddress(e.target.value)
    const updatedCity = e => setCity(e.target.value)
    const updatedState = e => setState(e.target.value)
    const updatedDescription = e => setDescription(e.target.value)
    const updatedPreviewImage = e => setPreviewImage(e.target.value)

    useEffect(() => {
        dispatch(getOneBusinessThunk(businessId))
        dispatch(authenticate())
    }, [dispatch, businessId])


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
            description,
            preview_image
        }


        let editedBusiness = await dispatch(editBusinessThunk(businessInformation))

        console.log('edited info', editedBusiness)

    }

    useEffect(() => {
        const valerrors = [];


        if (businessObj) {

            if (name.length < 2 || name.length > 50) valerrors.push('Name must be between 2 and 50 characters')
            if (!preview_image.match(/\.(jpg|jpeg|png)$/)) valerrors.push('Please provide a valid image extension [png/jpg/jpeg]')
            setValidationeErrors(valerrors)

        }
    }, [name, preview_image])





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
                        placeholder='Image should be format jpg, jpeg, png'
                        type='string'
                        value={preview_image}
                        onChange={updatedPreviewImage}
                    />
                </label>

                <button> Create New Business</button>

            </form>

        </>
    )

}

export default EditBusinessForm;
