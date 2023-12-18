import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
// import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const statsQuery = {
  queryKey: ['stats'],
  queryFn: async () => {
    const response = await customFetch.get('/jobs/stats')
    return response.data
  }
};

export const loader = (queryClient) => async () => {
  // return null;
  // const response = await customFetch.get('/jobs/stats')
  // return response.data;

  const data = await queryClient.ensureQueryData(statsQuery)
  return data;
  // return null;
}

const Stats = () => {
  // const { defaultStats, monthlyApplications } = useLoaderData();

  const { data } = useQuery(statsQuery);

  const { defaultStats, monthlyApplications } = data;

  return (
    <>
      <StatsContainer defaultStats = { defaultStats } />
      {monthlyApplications?.length > 1 && (
        <ChartsContainer data = { monthlyApplications } />
      )}
    </>
  );
};

export default Stats;
