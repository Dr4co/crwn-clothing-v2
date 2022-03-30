import {useState} from 'react'

import { 
    signInWithGooglePopup,
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'

import FormInput from '../form-input/form-input.component'
import './sign-in-form.styles.scss'

const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields) // Will have the default values from the const above!
    const { email, password } = formFields;

    console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log(email); // Abel to print the e-mail field text in the console! :)

        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetFormFields();
        }
        catch(error){
            switch(error.code){
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                case 'auth/too-many-requests':
                    alert('Too many failed password attempts, Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again');
                    break;
                default:
                    console.log(error);                    
            }
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    };

    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign up with email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="E-mail" type="text" required onChange={handleChange} name="email" value={email}/>

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type="button" onClick={signInWithGooglePopup} buttonType={'google'}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;