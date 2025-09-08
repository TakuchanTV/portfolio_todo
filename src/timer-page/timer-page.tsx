import React, { useEffect, useRef, useState } from 'react'
import styles from "./timer-page.module.css"
import { useNavigate } from 'react-router-dom';
import alarmUrl from "../sound/alarm.mp3";

const ONE_Hours: number = 3600000;
const ONE_Minutes: number = 60000;
const ONE_Seconds: number = 1000;

const Min_Count: number = 0;
const Max_Count: number = 86400000;


export const Timer_Page = () => {
    const navigate = useNavigate()

    const navigateHome = () => {
        navigate("/")
    }
    const [timeCount, setTimeCount] = useState<number>(0)
    const timerIdRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const alarmIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const plus = (plusCount: number) => {
        if (timeCount + plusCount <= Max_Count) {
            setTimeCount((prevCount) => prevCount + plusCount)
        }
    }

    const minus = (minusCount: number) => {
        if (timeCount - minusCount >= Min_Count) {
            setTimeCount((prevCount) => prevCount - minusCount)
        }
    }

    const [timerState, setTimerState] = useState<string>("standby")

    const start = () => {
        setTimerState("active")
    }

    const stop = () => {
        setTimerState("standby")
    }

    const reset = () => {
        setTimerState("standby")
        setTimeCount(0)
    }


    const hh = Math.floor(timeCount / ONE_Hours);
    const mm = Math.floor((timeCount % ONE_Hours) / ONE_Minutes);
    const ss = Math.floor((timeCount % ONE_Minutes) / ONE_Seconds)


    useEffect(() => {
        if (timerState !== "active") {
            return;
        }
        if (timeCount > 0) {
            timerIdRef.current = setInterval(() => {
                setTimeCount((prevCount) => prevCount - ONE_Seconds);
            }, ONE_Seconds);
        } else {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = null;
            }
            setTimerState("end");
            playSound();
        }
        return () => {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = null;
            }
        }
    }, [timerState, timeCount])

    useEffect(() => {
        audioRef.current = new Audio(alarmUrl);
        return () => {
            // アンマウント時はリソース解放
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
    if (timerState === 'end') {
      playSound();
      alarmIntervalRef.current = setInterval(playSound, 2000);
    } else {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
    }
    return () => {
      if (alarmIntervalRef.current) {
        clearInterval(alarmIntervalRef.current);
        alarmIntervalRef.current = null;
      }
    };
  }, [timerState]);

    const playSound = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    // タイマー停止 & アラーム停止
    const stopSound = () => {
        setTimerState('standby');       // タイマー状態もリセット
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return (
        // <div>
        //     <div>{timeCount}</div>
        //     <div>
        //         <button onClick={() => plus(ONE_Seconds)}>+1秒</button>
        //         <button onClick={() => minus(ONE_Seconds)}>-1秒</button>
        //         <button onClick={() => plus(ONE_Minutes)}>+1分</button>
        //         <button onClick={() => minus(ONE_Minutes)}>-1分</button>
        //         <button onClick={() => plus(ONE_Hours)}>+1時間</button>
        //         <button onClick={() => minus(ONE_Hours)}>-1時間</button>
        //         <button onClick={start}>start</button>
        //         <button onClick={stop}>stop</button>
        //         <button onClick={reset}>reset</button>
        //     </div>
        // </div>

        <div className={styles.TimerContainer}>
            <div className={styles.TimePicker}>
                <div className={styles.TimeUnit}>
                    <button className={styles.ArrowButton} onClick={() => plus(ONE_Hours)}>▲</button>
                    <div className={styles.TimeValue}>{String(hh).padStart(2, "0")}</div>
                    <button className={styles.ArrowButton} onClick={() => minus(ONE_Hours)}>▼</button>
                </div>
                <div className={styles.TimeUnit}>
                    <button className={styles.ArrowButton} onClick={() => plus(ONE_Minutes)}>▲</button>
                    <div className={styles.TimeValue}>{String(mm).padStart(2, "0")}</div>
                    <button className={styles.ArrowButton} onClick={() => minus(ONE_Minutes)}>▼</button>
                </div>
                <div className={styles.TimeUnit}>
                    <button className={styles.ArrowButton} onClick={() => plus(ONE_Seconds)}>▲</button>
                    <div className={styles.TimeValue}>{String(ss).padStart(2, "0")}</div>
                    <button className={styles.ArrowButton} onClick={() => minus(ONE_Seconds)}>▼</button>
                </div>
            </div>
            <div className={styles.Controls}>
                <button className={styles.ControlButton} onClick={start}>start</button>
                <button className={styles.ControlButton} onClick={stop}>stop</button>
                <button className={styles.ControlButton} onClick={reset}>reset</button>
                <button className={styles.ControlButton} onClick={navigateHome}>Home</button>
            </div>
            {/* タイマーが end 状態のときだけ表示 */}
            {timerState === 'end' && (
                <div className="flex justify-center space-x-2" style={{ marginTop: '1rem' }}>
                    <button onClick={stopSound} className={styles.ControlButton}>
                        Stop Alarm
                    </button>
                </div>
            )}
            
        </div>
    )
}
