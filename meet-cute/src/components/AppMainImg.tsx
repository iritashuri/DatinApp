import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { fetchVideo } from '../store/meetCuteSlice';

const AppMainImg: React.FC = () => {
  const dipatch = useDispatch();
  dipatch(fetchVideo);

  //todo hook
  const video = useSelector((state: RootState) => {
    return state.meetCute.video;
  });

  return <img src={video} alt='logo' />;
};

export default AppMainImg;
