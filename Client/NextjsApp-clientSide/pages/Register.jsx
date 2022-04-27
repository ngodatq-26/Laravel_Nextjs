import React from 'react'
import dynamic from 'next/dist/shared/lib/dynamic';
import RegisterForm from '../modules/auth/components/RegisterForm'
import { fetchAPI } from '../utils/fetch';
import { API_PATHS } from '../configs/apiConfigs';
import Snackbarcustom from '../modules/common/components/SnackbarCustom';
const Register = () =>{

    const [loading,setLoading] = React.useState(false);
    const [error,setError] = React.useState();

    const onRegister = async (email,password,confirmPassword,name) =>{
        setLoading(true);
        await fetchAPI(API_PATHS.register,'POST',{email : email,name : name,password : password},true)
        .then((user) =>{
            if(user.data.success == true) {
                alert('ok');
            }
            else {
                setError(user.data.message)
            }
        })
        setLoading(false);
        return;
    }

    return(
        <div>
            { error ?<Snackbarcustom title={error} alert="error"/> : null }
        <div className="w-full h-screen font-sans bg-cover bg-landscape" style={{maxWidth : "100%",padding : 100,paddingLeft : 550}}>    
           <RegisterForm onRegister={onRegister} loading={loading}/>
        </div>
        </div>
    )
}

export default Register;