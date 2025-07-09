import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { registerRequest } from "../redux/reducers/authSlice";




const Register = ()=>{

  const dispatch = useDispatch();
// 1 step 

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    role:'',
  });

  const [message, setMessage] = useState();

// 2 step 

 const handleCahnge = (e) => {
  const {name, value} = e.target;

  setFormData((prevFormData) =>({
    ...prevFormData,
    [name]: value,
  }));

 }

//  3

const handleSubmit = (e) => {
  e.preventDefault();


  const {name, email, password, confirmPassword, role } = formData;

  if(!name || !email || !password || !confirmPassword || !role){
    setMessage(`all feilds are required `);
    return;
  }

  if(password !== confirmPassword){
    setMessage(`password do not matched `);
  }
 
  dispatch(registerRequest({  name: formData.name,
  email: formData.email,
  password: formData.password,
  role: formData.role,}));
   
   setMessage('registration success full');
   console.log('user data:'+ formData);

   setFormData({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    role:'',
   })
}

  
    return(
<div className="min-h-screen flex border-spacing-1 rounded-lg w-screen  items-center   justify-center text-center">
    <form onSubmit={handleSubmit}>
  <div className=" w-96  rounded-lg  p-6 bg-slate-200 shadow space-y-4">
 <h2 className="font-sans font-bold pb-4">Register</h2>
  <input type="text" name="name" value={formData.name} onChange={handleCahnge} placeholder="Full Name" className="w-full p-2 rounded-md border " />
  <input type="text" name="email" value={formData.email} onChange={handleCahnge} placeholder="Email" className="w-full p-2 rounded-md border " />
  <input type="password"  name="password" value={formData.password} onChange={handleCahnge} placeholder="password" className=" w-full p-2 rounded-md border" />
    <input type="password"  name="confirmPassword" value={formData.confirmPassword} onChange={handleCahnge} placeholder="Confirm Password" className=" w-full p-2 rounded-md border" />
  <input type="text"  name="role" value={formData.role} onChange={handleCahnge} placeholder="Role" className="w-full p-2 rounded-md border"/>

  <button type="submit" className="h-20 w-36 border-spacing-2 rounded-md bg-slate-500"> register</button>
  </div>
  </form>
    {message && (
        <p className={`mt-4 text-center ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
</div>
    )
}

export default Register;