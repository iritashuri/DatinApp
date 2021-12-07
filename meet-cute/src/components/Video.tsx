import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchVideo } from '../store/meetCuteSlice';

const Video = () => {
  const dipatch = useDispatch();
  dipatch(fetchVideo);

  //todo hook
  const video = useSelector((state: RootState) => {
    return state.meetCute.video;
  });
  // fetch video from server
  return <iframe width='560' height='315' src={video} title='brand'></iframe>;
};

export default Video;
