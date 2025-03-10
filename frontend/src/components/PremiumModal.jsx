import ReactDom from "react-dom";
import './premiumModal.css'


export default function PremiumModal(props) {
    const {children, closedPremModal, setClosedPremModal} = props

    return ReactDom.createPortal(
        <div className='modal-container'>
            <button onClick={() => {
                setClosedPremModal(true)
            }}  className='modal-underlay'></button>
            <div className='modal-content w-100 md:w-50 mr-auto ml-auto'>
                {children}
            </div>
        </div>,

        document.getElementById('portal')
    )
}