import { useState } from 'react';
import { AuthenticationTitle } from './AuthenticationTitle';
import { SignUp } from './SignUp';



export function Switch() {

    const [active, setActive] = useState<'login' | 'signup'>('signup');
    // switch component between login and signup by clicking on the button
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <button onClick={() => setActive('login')} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: active === 'login' ? '#007bff' : '#ccc', color: '#fff', marginRight: '10px' }}>Login</button>
                <button onClick={() => setActive('signup')} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: active === 'signup' ? '#007bff' : '#ccc', color: '#fff' }}>Sign Up</button>
            </div>
            {active === 'login' ? <AuthenticationTitle /> : <SignUp />}
        </div>
    );
    
}
