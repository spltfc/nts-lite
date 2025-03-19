import './App.scss'

import { useCallback, useState } from 'react'
import NTSLogo from './NtsLogo'
import {live, infinite} from './stations'
import GithubLogo from './GithubLogo'

const LiveBtn = ({isActive, title, streamUrl, onClick}) => {
    return <div className="live-btn-w">
        <div className={`live-btn ${isActive ? '__active' : ''}`} onClick={() => onClick(streamUrl)}>
            <div className="live-btn-title">
                {title}
            </div>
        </div>
    </div>
}

const InfiniteBtn = ({isActive, title, description, color, streamUrl, onClick}) => {
    return <div style={{backgroundColor: color}} className="mixtape-w">
        <div className={`mixtape ${isActive ? '__active' : ''}`} onClick={() => onClick(streamUrl)}>
            <div className="mixtape-title">
                {title}
            </div>
            <div className="mixtape-desc">
                {description}
            </div>
        </div>
    </div>
}

const Player = ({url}) => {
    return <audio autoPlay controls src={url} className="player" />
}

function App() {
    const [nowPlaying, setNowPlaying] = useState(null)

    const onStationClick = useCallback((streamUrl) => {
        if (nowPlaying === streamUrl) {
            setNowPlaying(null)
        } else {
            setNowPlaying(streamUrl)
        }
    }, [nowPlaying, setNowPlaying])

    return (
        <div className="container">
            <div className="player-w">
                <Player url={nowPlaying} />
            </div>
            <div className="header">
                <div className="logo-w">
                    <div className="nts-logo">
                        <a href="https://nts.live" target="_blank" rel="noopener noreferrer">
                            <NTSLogo />
                        </a>
                    </div>
                    <div className="logo-w-text">
                        lite
                    </div>
                </div>
                <div className="github">
                    <a class="" target="_blank" rel="noreferrer noopener" aria-label="Check on GitHub" href="https://github.com/spltfc/nts-lite">
                        <GithubLogo />
                    </a>
                </div>
            </div>
            <div className="live-streams">
                {Object.keys(live).map((stationKey) => {
                    const {title, streamUrl} = live[stationKey]
                    return <LiveBtn
                        key={stationKey}
                        isActive={nowPlaying === streamUrl}
                        {...{title, streamUrl}}
                        onClick={onStationClick}
                    /> 
                })}
            </div>
            <div className="infinite-mixtapes">
                {Object.keys(infinite).map((stationKey) => {
                    const {title, description, color, streamUrl} = infinite[stationKey]
                    return <InfiniteBtn
                        key={stationKey}
                        isActive={nowPlaying === streamUrl}
                        onClick={onStationClick}
                        {...{title, description, color, streamUrl}}
                    />
                })}
            </div>
            <div className="footer">
                <a href="https://www.nts.live/about" target="_blank" rel="noopener noreferrer">About NTS</a>
                <a href="https://www.nts.live/supporters" target="_blank" rel="noopener noreferrer">Support NTS</a>
            </div>
        </div>
    )
}

export default App
