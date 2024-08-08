import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import micImg from './assets/images/image.png';
import Lottie from 'react-lottie';
import animationData from './assets/Animation/Animation.json';
import AudioPlayer from './assets/components/audioPlayer';
import './style.css';

const VoiceChat = () => {
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState(null);
    const [audioUrl, setAudioUrl] = useState('');
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);
    const [silenceTimer, setSilenceTimer] = useState(null);
    const [animationPaused, setAnimationPaused] = useState(true);
    const [clickCount, setClickCount] = useState(0);

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
            setAnimationPaused(false);
            setClickCount(1);
        } else {
            stopRecording();
            setAnimationPaused(true);
            setClickCount(0);
        }

        return () => {
            if (mediaRecorder) {
                mediaRecorder.stop();
            }
        };
    }, [recording]);

    useEffect(() => {
        // Force reflow to trigger the animation
        if (clickCount === 0) {
            const animationElement = document.querySelector('.animation');
            if (animationElement) {
                animationElement.classList.remove('animation');
                void animationElement.offsetWidth; // Trigger reflow
                animationElement.classList.add('animation');
            }
        }
    }, [clickCount]);

    const startRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const context = new AudioContext();
                const analyserNode = context.createAnalyser();
                const source = context.createMediaStreamSource(stream);
                source.connect(analyserNode);

                setAudioContext(context);
                setAnalyser(analyserNode);

                const recorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });
                setMediaRecorder(recorder);

                recorder.ondataavailable = event => {
                    setAudioChunks(prevChunks => [...prevChunks, event.data]);
                };

                recorder.onstop = () => {
                    const blob = new Blob(audioChunks, { type: 'audio/wav' });
                    setAudioBlob(blob);
                    setAudioUrl(URL.createObjectURL(blob));
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
        setRecording(!recording);
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
                                <h1>VERA</h1>
                            </div>
                        </div>
                        <div className="voice-chats">
                            {audioUrl && <AudioPlayer audioUrl={audioUrl} />}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default VoiceChat;