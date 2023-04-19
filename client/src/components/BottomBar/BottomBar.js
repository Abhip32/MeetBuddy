import React, { useCallback,useState,useEffect } from 'react';
import styled from 'styled-components';
import {ImPhoneHangUp} from 'react-icons/im'

const BottomBar = ({
  clickChat,
  clickCameraDevice,
  goToBack,
  toggleCameraAudio,
  userVideoAudio,
  clickScreenSharing,
  screenShare,
  videoDevices,
  showVideoDevices,
  setShowVideoDevices,
  users
}) => {
  const handleToggle = useCallback(
    (e) => {
      setShowVideoDevices((state) => !state);
    },
    [setShowVideoDevices]
  );

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <Bar>
      <Left>
        <h6 style={{fontSize: 'calc(8px + 1vmin)',fontWeight:"900"}}>{time.toLocaleTimeString()} | {formattedDate}</h6>
      </Left>
           <Center>
        <CameraButton onClick={toggleCameraAudio} data-switch='video'>
          <div>
            {userVideoAudio.video ? (
              <FaIcon className='fas fa-video'></FaIcon>
            ) : (
              <FaIcon className='fas fa-video-slash'></FaIcon>
            )}
          </div>
        </CameraButton>

        <CameraButton onClick={toggleCameraAudio} data-switch='audio'>
          <div>
            {userVideoAudio.audio ? (
              <FaIcon className='fas fa-microphone'></FaIcon>
            ) : (
              <FaIcon className='fas fa-microphone-slash'></FaIcon>
            )}
          </div>
        </CameraButton>


        <ChatButton onClick={clickChat}>
          <div>
            <FaIcon className='fas fa-comments'></FaIcon>
          </div>
        </ChatButton>
        <ScreenButton onClick={clickScreenSharing}>
          <div>
            <FaIcon
              className={`fas fa-desktop ${screenShare ? 'sharing' : ''}`}
            ></FaIcon>
          </div>
        </ScreenButton>
        <StopButton onClick={goToBack}>
        <div>
            <ImPhoneHangUp
              className={`fas fa-phone ${screenShare ? 'sharing' : ''}`}
              size={30}
            ></ImPhoneHangUp>
          </div>
        </StopButton>
      </Center>
    </Bar>
  );
};

const Bar = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  background-color: black;
  color:white;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-left:-3%;
`;

const Right = styled.div``;

const ChatButton = styled.div`
  border-radius:60px;
  padding:20px;
  margin:5px;
  text-align:center;
  border: none;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #525252;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }
`;

const ScreenButton = styled.div`
border-radius:60px;
padding:30px;
margin:5px;
text-align: center;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #525252;
    cursor: pointer;
    border-radius: 15px;
  }

  .sharing {
    color: #ee2560;
  }
`;

const FaIcon = styled.i`
  width: 30px;
  font-size: calc(16px + 1vmin);
`;

const StopButton = styled.div`
border-radius:60px;
padding:5px;
margin:5px;
text-align: center;
  font-size: 0.9375rem;

  :hover {
    background-color: #f25483;
    cursor: pointer;
  }
`;

const CameraButton = styled.div`
border-radius:60px;
padding:20px;
margin:5px;
text-align:center;
  font-size: 0.9375rem;
  padding: 5px;

  :hover {
    background-color: #525252;
    cursor: pointer;
    border-radius: 15px;
  }

  * {
    pointer-events: none;
  }

  .fa-microphone-slash {
    color: #ee2560;
  }

  .fa-video-slash {
    color: #ee2560;
  }
`;



export default BottomBar;