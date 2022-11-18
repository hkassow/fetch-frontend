import { useNavigate } from "react-router-dom"

const ThankYou = () => {
    const navigate = useNavigate()
    return (
        <div id='confirmation-box'> 
            <h1>Congratulations! </h1>
            Your account has been created!
            <button id='create-another-button' onClick={() => navigate('/')}>Create another?</button>
        </div>
    )
}

export default ThankYou