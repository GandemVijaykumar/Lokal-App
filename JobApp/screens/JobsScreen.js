// screens/JobsScreen.js
import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import JobCard from '../components/JobCard';
import { fetchJobs } from '../utils/api';
import { storeBookmark, removeBookmark, isBookmarked } from '../utils/db';

export default function JobsScreen({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch jobs when the screen mounts
  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newJobs = await fetchJobs(page);
      if (newJobs.length === 0) {
        console.log('No more jobs to load.');
        return;
      }
      setJobs((prevJobs) => [...prevJobs, ...newJobs]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  // Handle bookmark toggling
  const handleBookmarkToggle = async (job) => {
    const isCurrentlyBookmarked = await isBookmarked(job.id);
    if (isCurrentlyBookmarked) {
      await removeBookmark(job.id); // Remove bookmark
    } else {
      await storeBookmark(job); // Add bookmark
    }

    // Update the local state to reflect the change instantly
    setJobs((prevJobs) =>
      prevJobs.map((j) =>
        j.id === job.id ? { ...j, isBookmarked: !isCurrentlyBookmarked } : j
      )
    );
  };

  // Render error message if there's an error
  if (error) {
    return <Text style={{ textAlign: 'center', marginTop: 20 }}>{error}</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Render the list of jobs */}
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <JobCard
            job={item} // Pass the job object
            onPress={() => navigation.navigate('JobDetails', { job: item })} // Navigate to details screen
            onBookmark={() => handleBookmarkToggle(item)} // Toggle bookmark status
            isBookmarked={item.isBookmarked || false} // Pass whether the job is bookmarked
          />
        )}
        onEndReached={loadJobs} // Load more jobs when reaching the end
        onEndReachedThreshold={0.5} // Trigger loading when halfway through the list
        ListFooterComponent={loading && <ActivityIndicator />} // Show loading indicator
      />
    </View>
  );
}