import {} from '@mantine/core';
import {useState} from 'react';
import type { FormEvent } from 'react';
import instance from '../Instances/AxiosInstance';
import { validateSignUp } from '../ValidatorsForms/SignUpValidators';
import type { SignUpFormValues } from '../ValidatorsForms/SignUpValidators';



// read about events
// document

export function SignUp() {


  const[response,setResponse]=useState(null);
  const [errors, setErrors] = useState<Partial<Record<keyof SignUpFormValues, string>>>({});

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    const values: SignUpFormValues = { name, email, password };
    const errors = validateSignUp(values);

    if (Object.keys(errors).length > 0) {
      console.error('Validation errors found:', errors);
      setErrors(errors);
      return;
    }

    setErrors({});

    try {
      const response = await instance.post('/auth/register', {
        name,
        email,
        password
      });
      setResponse(response.data);
      console.log('User registered successfully:', response.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
   // Sign up page with name, email and password fields
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Create an Account</h1>
      <p>Please sign up to get started</p>
      <form onSubmit={handleSignUp} style={{ marginTop: '20px' }}>

        <div style={{ marginBottom: '10px' }}>
          <input type="text" name="name" placeholder="Name" required />
          {errors.name && <div style={{color:'red'}}>{errors.name}</div>}

        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="email" name="email" placeholder="Email" required />
          {errors.email && <div style={{color:'red'}}>{errors.email}</div>}
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="password" name="password" placeholder="Password" required />
          {errors.password && <div style={{color:'red'}}>{errors.password}</div>}
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {response && (
        <div style={{ marginTop: '20px' }}>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
