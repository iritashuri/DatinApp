import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import PageTitle from '../PageTitle';
import UserBarMap from './UserBarMap';

const ResultsPage: React.FC = () => {
  const users = useSelector((state: RootState) => {
    return state.meetCute.userMatches;
  });

  return (
    <div>
      <div>
        <PageTitle title='Results' />
      </div>
      <div>
        <UserBarMap users={users} />
      </div>
    </div>
  );
};

export default ResultsPage;