import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import {setVideos} from "../Store/Slices/appSlice"
import { useDispatch, useSelector } from "react-redux";

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY; // Corrected key reference

const VideoContainer = () => {

  const videos = useSelector((state)=>state.appSlice.videos);
  const dispatch = useDispatch();
  const url = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key={APIKEY}";

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setVideos(data.items));
     
    } catch (error) {
      console.error("Error fetching data:", error.message);
      alert("Unable to fetch data. Please check your internet connection or API key.");
    }
  }



  return (
    <div>
      {
        videos?(<div className="flex mt-16 flex-wrap  bg-[#0f0f0f]   gap-1 justify-evenly">
          {
            videos.map((ele)=>(     
              <Link to={"\watch?v="+ele.id} key={ele.id}>
                <VideoCard key={ele.id} info={ele}/>
              </Link>
            ))
          }
        </div>):(
          <div>

          </div>
        )
      }

    </div>
  )
};

export default VideoContainer;
