import { useNavigate } from 'react-router-dom';



export function Switch() {
    
    const navigate = useNavigate();

    // switch component between login and signup by clicking on the button
    return (
        <div>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <button onClick={() => navigate('/login')} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', marginRight: '10px' }}>Login</button>
                <button onClick={() => navigate('/signup')} style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff' }}>Sign Up</button>
            </div>
        </div>
    );
    
}

// box model
