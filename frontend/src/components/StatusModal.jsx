import ReactDom from "react-dom";
import './StatusModal.css'
import {useStatusStore} from "../store/useStatusStore.js";


export default function StatusModal(props) {
    const {children} = props
    const {createStatus, setCreateStatus} = useStatusStore()
    return ReactDom.createPortal(
        <div className='modal-container'>
            <button onClick={() => {
                setCreateStatus(false)
            }}  className='modal-underlay'></button>
            <div className='modal-content w-100 md:w-50 mr-auto ml-auto'>
                {children}
            </div>
        </div>,

        document.getElementById('status')
    )
}