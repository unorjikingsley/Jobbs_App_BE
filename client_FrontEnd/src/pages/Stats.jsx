import { ChartsContainer, StatsContainer } from '../components';
import customFetch from '../utils/customFetch';
import { useLoaderData } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const loader = async () => {
  return null;
  // try {
  //   const response = await customFetch.get('/jobs/stats');
  //   return response.data;
  // } catch (error) {
  //   return error;
  // }

  const response = await customFetch.get('/jobs/stats')
  return response.data;
}

const Stats = () => {
  // const { defaultStats, monthlyApplications } = useLoaderData();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['stats'],
    queryFn: () => customFetch.get('/jobs/stats')
  });

  if (isLoading) return <h4>Loading...</h4>
  if (isError) return <h4>Error...</h4>

  const { defaultStats, monthlyApplications } = data.data;

  return <h1>react query</h1>

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
