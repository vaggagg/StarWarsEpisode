import Image from 'next/image'
import Logo from '../../../../public/eLogo.png'
import './_Header.scss'
export default function Header() {
    return (
        <div className="header-container">
            <div className='center-container'>
                <div className="logo-container">
                    <Image src={Logo} alt="Logo" />
                </div>
            </div> </div>
    )
}