import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import {AppActions }from "../../api/AppActions";


const Header = () => {
    const [name, setname] = useState(null);


    const logout = async () => {
        try {
            // Get the Cognito logout URL from the backend
            const response = await api.get("auth/logout");
            const logoutUrl = response.data; // Backend returns the full URL
            AppActions.setAuthToken(null);
            console.log(AppActions.getLocalStorageAuthToken());
            // Redirect user to Cognito logout page
            window.location.href = logoutUrl;
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get("code");

        if (code) {
            api.get(`/auth/callback`, {
                params: { code } // Pass as query parameter
            })
            .then(response => {
                AppActions.setAuthToken(response.data.token);


                api.get(`/name`)
                .then(response => {
                    console.log(response);
                    setname(response.data.message);
                })
                .catch(error => {
                    console.error("err:", error);
        });
            })
            .catch(error => {
                console.error("OAuth callback failed:", error);
            });
        }
    }, []);


    const [cognitoUrl, setCognitoUrl] = useState('');

    useEffect(() => {
        api.get("/auth/url")
            .then(response => {
                setCognitoUrl(response.data.url); // Assuming response contains { url: "..." }
                console.log(response);
            })
            .catch(error => {
                console.error("Error fetching Cognito URL:", error);
            })
        
    }, []);
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/" style={{"color":'gold'}}>
                    <FontAwesomeIcon icon ={faVideoSlash}/>Gold
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                        <NavLink className ="nav-link" to="/">Home</NavLink>
                        <NavLink className ="nav-link" to="/watchList">Watch List</NavLink>
                        {name ? <NavLink className ="nav-link" >Welcome back <b> {name}</b>!</NavLink>: null}
                              
                    </Nav>
                    <Button onClick={() => {window.location.href = cognitoUrl;}} variant="outline-info" className="me-2">Login</Button>
                    <Button onClick={() => logout()} variant="outline-info">Logout</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
      )
}
export default Header;