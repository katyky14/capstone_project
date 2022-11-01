
import { NavLink } from 'react-router-dom';


import './notFound.css'


function NotFound() {


    return (
        <div className='page-not-found-container'>
            <div>
                <h1 className='h1-not-found'>404 PAGE NOT FOUND</h1>
            </div>
            {/* <NavLink to='/' >Return to Homepag</NavLink> */}
            <div>
                <img
                className='img-404-gif'
                src='https://media3.giphy.com/media/sQaiDja8BI01IfJrrT/giphy.gif?cid=790b761160394d7a0e49abbc934bc03c3b9f8273578b9ab4&rid=giphy.gif'></img>
            </div>


        </div>
    )
}

export default NotFound;
