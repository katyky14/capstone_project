
import asianFood from '../components/images-all/asianFood.webp'
import './homepage.css'

function HomePage() {



    return (
        <>
            <div className='homepage-container'
                style={{
                    backgroundImage: `url(${asianFood})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'no-repeat',
                    width: '100vw',
                    height: '100vh',
                   
                }}
            >


            </div>



        </>
    )


}

export default HomePage;
