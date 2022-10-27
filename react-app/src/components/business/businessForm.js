import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { addOneBusinessThunk } from '../../store/business'

function CreateBusinessForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [description, setDescription] = useState('')
    const [preview_image, setPreviewImage] = useState('')
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
            preview_image
        }

        let createdBusiness = await dispatch(addOneBusinessThunk(businessInformation))

        //console.log('the created business in component', createdBusiness)
        if (createdBusiness) {
            history.push(`/business/${createdBusiness.business.id}`)
        }
    }


    useEffect(() => {
        const errors = [];

        if (name.length < 2 || name.length > 50) errors.push('Name must be between 2 and 50 characters')
        if (description.length < 5 || description.length > 255) errors.push('Description must be between 5 and 255 characters')
        if (!preview_image.match(/\.(jpg|jpeg|png)$/)) errors.push('Please provide a valid image extension [png/jpg/jpeg]')

        setValidationErrors(errors)
    }, [name, description, preview_image])



    return (
        <>
            <h1>Business Form</h1>

            <form onSubmit={onSubmit} >
                {hasSubmitted && validationErrors.length > 0 && (
                    <ul>
                        {validationErrors.map(error =>
                            <li key={error}>{error}</li>)}
                    </ul>
                )}

                <label>
                    <input
                        placeholder='Business Name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>

                <label>
                    <input
                        placeholder='Address'
                        type='text'
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        required
                    />
                </label>

                <label>
                    <input
                        placeholder='City'
                        type='text'
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        required
                    />
                </label>

                <label>
                    <input
                        placeholder='State'
                        type='text'
                        value={state}
                        onChange={e => setState(e.target.value)}
                        required
                    />
                </label>

                <label>
                    <input
                        placeholder='Description'
                        type='text'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                </label>

                <label>
                    <input
                        placeholder='Image should be format jpg, jpeg, png'
                        type='string'
                        value={preview_image}
                        onChange={e => setPreviewImage(e.target.value)}
                    />
                </label>

                <button> Create New Business</button>

            </form>

        </>
    )
}

export default CreateBusinessForm;
