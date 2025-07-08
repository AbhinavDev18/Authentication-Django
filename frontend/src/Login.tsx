import { useState, useEffect } from "react";
import * as Components from "./Components.tsx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./styles.css";

export function Authentication() {
  const [signIn, toggle] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('isLoggedin') === 'true') navigate('/profile');
  }, []);

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signup/', {
        username,
        email,
        password
      });
      if (response.status == 200 || response.status == 201) {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('email', response.data.email);
        navigate('/profile');
        alert(`Welcome, ${response.data.user}!`);
      } else {
        //setError('Invalid email or password');
      }
    } catch (err) {
      //setError('Login failed. Please try again.');
    }
  };

  const handleSignin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        email,
        password
      });
      if (response.status == 200 || response.status == 201) {
        localStorage.setItem('isLoggedin', 'true');
        localStorage.setItem('email', response.data.email);
        navigate('/profile');
        alert(`Welcome, ${response.data.user}!`);
      } else {
        //setError('Invalid email or password');
      }
    } catch (err) {
      //setError('Login failed. Please try again.');
    }
  };

  return (
    <Components.Container>
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSignup}>
          <Components.Title>Create Account</Components.Title>
          <Components.Input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Components.Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Components.Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Components.Button type="submit">Sign Up</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSignin}>
          <Components.Title>Sign in</Components.Title>
          <Components.Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Components.Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button type="submit">Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>
              To keep connected with us please login with your personal info
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Friend!</Components.Title>
            <Components.Paragraph>
              Enter your personal details and start journey with us
            </Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}