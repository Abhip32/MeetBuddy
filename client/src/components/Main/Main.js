import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components';
import socket from '../../socket';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./main.css";

const Main = (props) => {
    const roomRef = useRef();
    const userRef = useRef();
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {

        socket.on('FE-error-user-exist', ({error}) => {
            if (!error) {
                const roomName = roomRef.current.value;
                const userName = userRef.current.value;

                sessionStorage.setItem('user', userName);
                props.history.push(`/room/${roomName}`);
            } else {
                setErr(error);
                setErrMsg('User name already exist');
            }
        });
    }, [props.history]);

    function clickJoin(e) {
        e.preventDefault();
        const roomName = roomRef.current.value;
        const userName = userRef.current.value;

        if (! roomName || ! userName) {
            setErr(true);
            setErrMsg('Enter Room Name or User Name');
        } else {
            socket.emit('BE-check-user', {
                roomId: roomName,
                userName
            });
        }
    }

    return (
        <body>
            <div className="content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" alt="Image" className="img-fluid"/>
                        </div>
                        <div className="col-md-6 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className="mb-4">
                                        <h3>Welcome to Meet Buddy</h3>
                                        <p className="mb-4 text-black">Meet like never before.</p>
                                    </div>
                                    <form method="post">
                                        <div className="form-group first">
                                            <input type="text" className="form-control" id="roomName" ref={roomRef} placeholder='Meet ID'/>

                                        </div>
                                        <div className="form-group last mb-4">
                                            <input type="text" className="form-control" id="userName" ref={userRef} placeholder='Your Name'/>
                                        </div>
                                        
                                        <input value="Log In" style={{width:"100%"}} onClick={clickJoin} className="btn btn-block btn-primary"/>

                                        {err ? <Error>{errMsg}</Error> : null}
                                       
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v2b4487d741ca48dcbadcaf954e159fc61680799950996" integrity="sha512-D/jdE0CypeVxFadTejKGTzmwyV10c1pxZk/AqjJuZbaJwGMyNHY3q/mTPWqMUnFACfCTunhZUVcd4cV78dK1pQ==" data-cf-beacon='{"rayId":"7b93e7b908be89df","token":"cd0b4b3a733644fc843ef0b185f98241","version":"2023.3.0","si":100}' crossorigin="anonymous"></script>
        </body>
    );
};


export default Main;

const Error = styled.div`
  margin-top: 10px;
  font-size: 20px;
  color: #e85a71;
`;
