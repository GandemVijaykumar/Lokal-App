import { decodeUnicode, processJobs } from './helpers';

export const fetchJobs = async (page = 1) => {
  try {
    const url = `https://testapi.getlokalapp.com/common/jobs?page=${page}`;
    const response = await fetch(url);
    const rawResponse = await response.text();
    console.log('Raw API Response:', rawResponse); // Debugging

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = JSON.parse(rawResponse);
    return processJobs(data.results || []);
  } catch (error) {
    console.error('Error fetching jobs:', error.message);
    return [];
  }
};



