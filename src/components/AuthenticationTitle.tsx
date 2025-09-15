import {} from '@mantine/core';


// read about events
// document

export function AuthenticationTitle() {
  return (
   // login page with email and password fields using mantine components
   <div style={{ textAlign: 'center', marginTop: '50px' }}>
     <h1>Welcome Back!</h1>
     <p>Please log in to your account</p>
     <div style={{ marginTop: '20px' }}>
       <input type="email" placeholder="Email" style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }} />
     </div>
     <div style={{ marginTop: '20px' }}>
       <input type="password" placeholder="Password" style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }} />
     </div>
     <div style={{ marginTop: '20px' }}>
       <button style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff' }}>Log In</button>
     </div>
   </div>


    
  );
}
