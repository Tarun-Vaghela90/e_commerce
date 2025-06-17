import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigator = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/user/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      console.log(data)
      if (res.ok) {
        login(data.token);
        setMsg('Login successful');
        navigator('/home')
      } else {
        setMsg(data.error || 'Login failed');
      }
    } catch (err) {
      setMsg('Something went wrong');
    }

    setValidated(true);
  };

  return (
    <div className='flex justify-center items-center h-screen'>

      <div className='w-full max-w-md border-2 rounded-xl p-5 shadow-md'>
      <h2 className='text-center'>Login</h2>
        {msg && <p className="text-center text-danger mb-3">{msg}</p>}

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your password.
            </Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className='w-full'>
            Submit
          </Button><br />
          <Link to={"/signup"} variant="primary" type="submit" className='w-full'>
            Create  Account
          </Link>
        </Form>
      </div>
    </div>
  );
}
