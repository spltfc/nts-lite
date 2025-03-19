import { useCallback, useState } from 'react'
import NTSLogo from './NtsLogo'
import {live, infinite} from './stations'
import GithubLogo from './GithubLogo'

const LiveBtn = ({isActive, title, streamUrl, onClick}) => {
    return <div className={`flex h-[120px] items-center justify-center border-1 border-white ${isActive ? 'bg-white text-black' : 'text-white'} cursor-pointer`} onClick={() => onClick(streamUrl)}>
        <div className="text-3xl font-bold">
            {title}
        </div>
    </div>
}

const InfiniteBtn = ({isActive, title, description, color, streamUrl, onClick}) => {
    return <div style={{backgroundColor: color}} className="border-1 border-white">
        <div className={`flex flex-col h-[150px] gap-[12px] items-center justify-center ${isActive ? 'bg-white text-black' : 'text-white'} cursor-pointer`} onClick={() => onClick(streamUrl)}>
            <div className="text-xl uppercase font-bold text-center">
                {title}
            </div>
            <div className="text-xs max-w-2/3 text-center font-light">
                {description}
            </div>
        </div>
    </div>
}

const Player = ({url}) => {
    if (!url) return null
    return <audio controls autoPlay src={url} type="audio/mpeg" className="h-[20px] w-full"></audio>
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
        <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-center h-[80px]">
                <Player url={nowPlaying} />
            </div>
            <div className="flex justify-between items-center">
                <div className="flex gap-[24px] h-[80px] items-center">
                    <div className="w-[80px]">
                        <a href="https://nts.live" target="_blank" rel="noopener noreferrer">
                            <NTSLogo />
                        </a>
                    </div>
                    <div className="text-[32px] font-thin italic text-white uppercase">
                        lite
                    </div>
                </div>
                <div>
                    <a class="flex items-center justify-center w-24 h-24 text-white" target="_blank" rel="noreferrer noopener" aria-label="Check on GitHub" href="https://github.com/spltfc/nts-lite">
                        <GithubLogo />
                    </a>
                </div>
            </div>
            <div className="grid grid-cols-2">
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
            <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2">
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
            <div className="flex gap-24 py-4 text-sm text-white">
                <a href="https://www.nts.live/about" target="_blank" rel="noopener noreferrer">About NTS</a>
                <a href="https://www.nts.live/supporters" target="_blank" rel="noopener noreferrer">Support NTS</a>
            </div>
        </div>
    )
}

export default App
