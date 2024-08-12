import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import micImg from './assets/images/image.png';
import Lottie from 'react-lottie';
import animationData from './assets/Animation/Animation.json';
import AudioPlayer from './assets/components/audioPlayer';
import './style.css';
import UserPlayer from './assets/components/Userplayer';

const VoiceChat = () => {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [chatName, setChatName] = useState('VERA');
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [silenceTimer, setSilenceTimer] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    useEffect(() => {
        if (recording) {
            startRecording();
        } else {
            stopRecording();
        }

        return () => {
            if (mediaRecorder) {
                mediaRecorder.stop();
            }
        };
    }, [recording]);

    useEffect(() => {
        // Retrieve the audio URL from local storage when the component mounts
        const storedAudioUrl = localStorage.getItem('audioUrl');
        if (storedAudioUrl) {
            setAudioUrl(storedAudioUrl);
        }
    }, []);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const context = new AudioContext();
                const analyserNode = context.createAnalyser();
                const source = context.createMediaStreamSource(stream);
                source.connect(analyserNode);

                setAudioContext(context);
                setAnalyser(analyserNode);

                const recorder = new MediaRecorder(stream, { mimeType: 'audio/mp3' });
                setMediaRecorder(recorder);

                recorder.ondataavailable = event => {
                    setAudioChunks(prevChunks => [...prevChunks, event.data]);
                };

                recorder.onstop = () => {
                    const blob = new Blob(audioChunks, { type: 'audio/mp3' });
                    setAudioBlob(blob);
                    const url = URL.createObjectURL(blob);
                    setAudioUrl(url);
                    localStorage.setItem('audioUrl', url); // Save the URL in local storage
                    setAudioChunks([]);
                    analyserNode.disconnect();
                    context.close();
                };

                recorder.start();
                console.log('Recording started...');
                monitorSilence(analyserNode);
            })
            .catch(error => {
                console.error('Error accessing audio devices:', error);
            });
    };

    const monitorSilence = (analyserNode) => {
        const dataArray = new Uint8Array(analyserNode.fftSize);
        const checkSilence = () => {
            analyserNode.getByteTimeDomainData(dataArray);
            const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
            if (average < 128.5) {
                if (!silenceTimer) {
                    const timer = setTimeout(() => {
                        setRecording(false);
                    }, 2000); // Stop after 2 seconds of silence
                    setSilenceTimer(timer);
                }
            } else {
                clearTimeout(silenceTimer);
                setSilenceTimer(null);
            }
            if (recording) {
                requestAnimationFrame(checkSilence);
            }
        };
        checkSilence();
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            console.log('Recording stopped');
        }
        if (silenceTimer) {
            clearTimeout(silenceTimer);
            setSilenceTimer(null);
        }
    };

    const handleMicClick = () => {
        setClickCount(1);
        setRecording(!recording);
    };

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = () => {
        if (chatName.trim() === '') {
            setChatName('VERA');
        }
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setChatName(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (chatName.trim() === '') {
                setChatName('VERA');
            }
            setIsEditing(false);
        }
    };

    return (
        <div className="voice-chat-container">
            <div className="left-panel">
                <Button
                    variant="none"
                    className={`mic-button ${recording ? 'recording' : ''}`}
                    onClick={handleMicClick}
                >
                    <img src={micImg} alt="Mic Icon" className="mic-icon" />
                </Button>
            </div>
            <div className={`right-panel ${clickCount === 0 ? 'show-animation' : ''}`}>
                {clickCount === 0 ? (
                    <div className="animation">
                        <Lottie options={defaultOptions} />
                    </div>
                ) : (
                    <>
                        <div className="chat-header">
                            <div className="chat-header-left">
                                <div className="animation-circle" style={{ marginRight: 25 }}>
                                    <Lottie
                                        options={defaultOptions}
                                        style={{ height: '185%', width: '100%' }}
                                    />
                                </div>
                            </div>
                            <div className="chat-header-right">
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={chatName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                        className="chat-name-input"
                                    />
                                ) : (
                                    <h1 onDoubleClick={handleDoubleClick} className="chat-name">
                                        {chatName} <i className="fa fa-pencil edit-icon" aria-hidden="true" onClick={handleDoubleClick}></i>
                                    </h1>
                                )}
                            </div>
                        </div>
                        <div className="voice-chats">
                            <div className='d-flex align-items-center gap-2'>
                                {/* <div className="animation-circle">
                                    <Lottie
                                        options={defaultOptions}
                                        style={{ height: '185%', width: '100%' }}
                                    />
                                </div> */}
                                <div className='w-100'>
                                    <AudioPlayer audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                                </div>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <div className='d-flex justify-content-end w-100'>
                                    <UserPlayer audioUrl="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VoiceChat;