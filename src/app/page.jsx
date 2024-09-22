'use client'
import { useEffect, useState, useRef } from "react";
import { call_videos_data } from "./helpers/functions"

export default function Home() {
  const effectRan = useRef(false);
  const [userQuery, setUserQuery] = useState();
  const [videoData, setVideoData] = useState();
  const [videoId, setVideoId] = useState();


  useEffect(() => {

    if (effectRan.current === false) {

      const videoDataWant = async () => {
        const data_of_videos = await call_videos_data('Sunflower Slowed + Reverb')
        setVideoData(data_of_videos?.items)
        console.log(data_of_videos)
      }
      videoDataWant();

      return () => {
        console.log("run once!")
        effectRan.current = true
      }

    }

  }, [])

  const run_user_query = async () => {
    if (!userQuery) return null
    setVideoData()
    const data_of_videos = await call_videos_data(userQuery)
    setVideoData(data_of_videos?.items)
  }

  return (
    <>
      {/* container */}
      <div className="bg-opacity-98 w-full min-h-screen bg-[#21201efa] flex flex-col justify-center items-center ">

        <div className="bg-[#302e2a94] rounded-[8px] p-2 mb-3 w-[1020px] flex justify-center items-center">
          <div className="h-[40px] bg-[#000000] w-full rounded-md flex items-center space-x-2">

            <div>
              <button onClick={() => run_user_query()} className="py-2 pl-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 0 24 24" width="24" focusable="false" aria-hidden="true" className="pointer-none inherit; w-[24px] h-[24px]"><path clipRule="evenodd" d="M16.296 16.996a8 8 0 11.707-.708l3.909 3.91-.707.707-3.909-3.909zM18 11a7 7 0 00-14 0 7 7 0 1014 0z" fillRule="evenodd"></path></svg>
              </button>
            </div>

            <div className="w-full h-full">
              <input onChange={(e) => setUserQuery(e.target.value)} className="w-full h-full bg-transparent text-[13px] outline-none" type="text" placeholder="Search..." />
            </div>
          </div>
        </div>

        {/* box */}
        <div className="px-[8px] py-[24px] bg-[#302e2a94] rounded-[8px] flex justify-center items-center w-[1020px] h-[440px] overflow-hidden">

          <div className={videoData ? `grid grid-cols-2 md:grid-cols-3 gap-4 h-[400px] overflow-y-scroll px-[14px]` : `grid grid-cols-2 md:grid-cols-3 gap-4 h-[400px] px-[14px]`}>

            {videoData && videoData?.map((r) => (
              <>
                <div
                  onClick={() => { setVideoId(r?.id?.videoId) }}
                  className="">
                  <img draggable="false" className="h-auto max-w-full rounded-lg hover:opacity-75 cursor-pointer transition-all hover:scale-90 active:scale-100 active:opacity-100" src={r?.snippet?.thumbnails?.high?.url} alt="" />
                  <div className="w-full flex justify-start items-center opacity-75 text-[12px] p-2">
                    <span className="truncate">{r?.snippet?.title}</span>
                  </div>
                </div>
              </>
            ))}

          </div>

        </div>
        {/* box */}

        <div className="bg-[#302e2a94] rounded-[8px] p-2 mt-3 w-[1020px] flex justify-center items-center">

          {videoId && <iframe allow="autoplay" className="min-w-full h-[40px] relative z-10" src={`https://mthaniyahs.co.za/player.php?id=${videoId}`} frameborder="0"></iframe>}

        </div>

        {/* container */}
      </div>

    </>
  );
}
