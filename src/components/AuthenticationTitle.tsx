import {} from '@mantine/core';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../Instances/AxiosInstance';
import { validateLogin } from '../ValidatorsForms/LoginValidators';
import type { LogingFormValues } from '../ValidatorsForms/LoginValidators';
import type { ErrorsType as ErrorType } from '../ValidatorsForms/LoginValidators';


// read about events
// document



export function AuthenticationTitle() {
  const navigate = useNavigate();

  const [response,setResponse]=useState(null);
  const [errors, setErrors] = useState<ErrorType>({});
  const [submitting,setSubmitting]=useState("");

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const values: LogingFormValues = { email, password };
    const  valErrors = validateLogin(values);
    if (Object.keys(valErrors).length > 0) {
      console.error('Validation errors found:', valErrors);
      setErrors(valErrors);
      return;
    }
    setErrors({});
    setSubmitting("Loading...");

    try {
      const res = await instance.post('/auth/login', { email, password });
      setResponse(res.data);

      if (res.data?.accessToken) {
        localStorage.setItem('accessToken', res.data.accessToken);
      }
      setSubmitting("Login successful!");
      // Navigate to dashboard after successful login
      navigate('/dashboard')
    } catch (error) {
      console.error('Error logging in user:', error);
      setSubmitting("Login failed.");
    }
  };

  return (
   // login page with email and password fields using mantine components
   <div style={{ textAlign: 'center', marginTop: '50px' }}>
     <h1>Welcome Back!</h1>
     <p>Please log in to your account</p>


      <form onSubmit={handleLogin} style={{ marginTop: '20px' }}>
        <div style={{ marginTop: '20px' }}>
          <input type="email" name="email" placeholder="Email" style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        {errors.email && <div style={{ marginTop: '10px', color: 'red' }}>{errors.email}</div>}

        <div style={{ marginTop: '20px' }}>
          <input type="password" name="password" placeholder="Password" style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
        {errors.password && <div style={{ marginTop: '10px', color: 'red' }}>{errors.password}</div>}

        <button type="submit">Log In</button>
      </form>
      <div style={{ marginTop: '20px', color: submitting === "Login successful!" ? 'green' : 'red' }}>{submitting}</div>
    </div>


    
  );
}
