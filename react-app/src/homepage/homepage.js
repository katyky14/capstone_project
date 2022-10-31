import Navigation from '../components/Navigation';

import asianFood from '../components/images-all/asianFood.webp'
import githubLogo from '../components/images-all/githubLogo.jpeg'
import linkedin from '../components/images-all/linkendLogo.png'
import './homepage.css'



function HomePage() {

    // HEADER


    return (
        <div className='homepage-main-container'>
            <div className='home-pic-container'>
                <img
                    className='homepage-img-div'
                    src={asianFood} alt='homepage' />
                <div className='welcome-div'>Welcome to Relp!</div>
            </div>

            <div className='homepage-links homepage-button'>
                <div className='homepage-my-name'>Katy Kam</div>
                <div>
                    <a href='https://github.com/katyky14/capstone_project' target='_blank'>
                        <img className='homepage-github' src={githubLogo} />
                    </a>
                    <a href='' target='_blank'>
                        <img
                        className='homepage-linkedin'
                        src={linkedin} />
                    </a>


                </div>
            </div>


        </div>





    )

    // return (
    //     <>
    //         <div className='homepage-container '
    //             style={{
    //                 backgroundImage: `url(${asianFood})`,
    //                 backgroundPosition: 'center',
    //                 backgroundSize: 'no-repeat',
    //                 width: '100%',
    //                 height: '100vh',
    //                 overflow: 'hidden',
    //                 objectFit: 'cover'

    //             }}
    //         >

    //             {/* <Navigation home={true}/> */}

    //             <div className='welcome-div'>Welcome to Relp!</div>
    //             <div>Katy Kam</div>

    //         </div>

    //     </>
    // )


}

export default HomePage;
