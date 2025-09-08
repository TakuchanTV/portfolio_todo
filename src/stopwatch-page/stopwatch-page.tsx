import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./stopwatch-page.module.css"
export const Stopwatch_Page = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);


    const navigate = useNavigate();

    const navigateHome = () => {
        navigate("/")
    }

    useEffect(() => {
        if (!isRunning) return;

        const id = window.setInterval(() => {
            setTime(prevTime => prevTime + 10)
        }, 10);
        return () => clearInterval(id);

    }, [isRunning])

    const handleStart = () => setIsRunning(true);
    const handlePause = () => setIsRunning(false);


    const handleReset = () => {
        setIsRunning(false);
        setTime(0);
    }

    const ms = `0${Math.floor((time % 1000) / 10)}`.slice(-2);
    const s = `0${Math.floor(time / 1000) % 60}`.slice(-2);
    const m = `0${Math.floor(time / 60000) % 60}`.slice(-2);
    const h = `0${Math.floor(time / 3600000)}`.slice(-2);
    return (
        <div className={styles.StopwatchContainer}>
            <div className={styles.Display}>
                {h}:{m}:{s}:{ms}
            </div>

            <div className={styles.ButtonGroup}>
                {isRunning ? (
                    <button
                        type="button"
                        className={styles.ControlButton}
                        onClick={handlePause}
                    >
                        Pause
                    </button>
                ) : (
                    <button
                        type="button"
                        className={styles.ControlButton}
                        onClick={handleStart}
                       
                    >
                        Start
                    </button>
                )}

                <button
                    type="button"
                    className={styles.ControlButton}
                    onClick={handleReset}
                   
                >
                    Reset
                </button>

                <button
                    type="button"
                    className={styles.ControlButton}
                    onClick={navigateHome}
                >
                    Home
                </button>
            </div>
        </div>
    )
}
