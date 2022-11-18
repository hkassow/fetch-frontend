import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import SelectSearch from 'react-select-search';
import 'react-select-search/style.css'


const CreateUserForm = () => {
    const navigate = useNavigate();
    const [occupations, setOccupations] = useState([])
    const [states, setStates] = useState([])
    const [duplicatePass, setDuplicatePass] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        occupation: '',
        state: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        duplicatePass: '',
        occupation: '',
        state: ''
    })


    useEffect(() => {
        fetch('https://frontend-take-home.fetchrewards.com/form')
        .then(response => response.json())
        .then(data => {
            if (data['occupations']) {
                setOccupations(data['occupations'].map(occupation => ({value: occupation, name: occupation}) ))
                setStates(data['states'].map(state => ({value: state['name'], name: state['name']}) ))
            }
        })
      },[])

      const changeFormData = (target) => {
        const [id, value] = [target.id, target.value]
        setErrors({...errors, [id]: ''})
        setFormData({...formData, [id]:value})
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (isValidForm()) {
            fetch('https://frontend-take-home.fetchrewards.com/form', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
                }
            )
            .then(response => {

                if (response.ok) {
                    response.json()
                    navigate('/congratulations')
                }
            })
        }
    }

    const isValidForm = () => {
        let valid = true
        let newErrors = {}
        if (!formData['name']) {
            valid = false
            newErrors['name'] = 'Please enter your name'
        }
        if (!formData['email']) {
            valid = false
            newErrors['email'] = 'Please enter your email'
        } else if (!formData['email'].match(/^\S+@\S+$/)) {
            valid = false
            newErrors['email'] = 'Please enter a valid email'
        }
        if (!formData['password']) {
            valid = false
            newErrors['password'] = 'Please enter your password'
        } else if (formData['password'] != duplicatePass) {
            valid = false
            newErrors['password'] = 'Passwords must match'
        }
        if (!formData['occupation']) {
            valid = false
            newErrors['occupation'] = 'Please select your occupation'
        }
        if (!formData['state']) {
            valid = false
            newErrors['state'] = 'Please select your state'
        }
        setErrors(newErrors)
        return valid
    }

    return (
        <>
        <div className='create-form-container'>
            <div className='form-header'> Create an account</div>
            <form className='create-form' onSubmit={handleFormSubmit}>
                {errors['name'] && <span className='error'>{errors['name']}</span>}
                <div className='select-search-container' >
                    <input className='select-search-input' placeholder='Full name' id='name' value={formData['name']} onChange={(e) => changeFormData(e.target)}></input>
                </div>
                {errors['email'] && <span className='error'>{errors['email']}</span>}
                <div className='select-search-container'  >
                    <input className='select-search-input' placeholder='Email' id='email' value={formData['email']} onChange={(e) => changeFormData(e.target)}></input>
                </div>
                {errors['password'] && <span className='error'>{errors['password']}</span>}
                <div className='select-search-container'  >
                    <input className='select-search-input' placeholder='Password' type='password' id='password' value={formData['password']} onChange={(e) => changeFormData(e.target)}></input>
                </div>
                <div className='select-search-container'  >
                    <input className='select-search-input' placeholder='Confirm Password' type='password' value={duplicatePass} onChange={(e) => setDuplicatePass(e.target.value)}></input>
                </div>
                {errors['occupation'] && <span className='error'>{errors['occupation']}</span>}
                <SelectSearch options={occupations} id='occupation' value={formData['occupation']} search placeholder='Select your occupation' onChange={(value) => (setFormData({...formData, occupation: value}), setErrors({...errors, occupation: ''}))}/>
                {errors['state'] && <span className='error'>{errors['state']}</span>}
                <SelectSearch options={states} id='state' value={formData['state']} search placeholder='Select your state' onChange={(value) => (setFormData({...formData, state: value}), setErrors({...errors, state: ''}))}/>
                <input className='submit-button' type='submit'/>
            </form>
        </div>
        </>
    )
}



export default CreateUserForm