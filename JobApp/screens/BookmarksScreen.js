// screens/BookmarksScreen.js
import React, { useCallback, useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import JobCard from '../components/JobCard';
import { getBookmarks, removeBookmark } from '../utils/db';

export default function BookmarksScreen({ navigation }) {
  const [bookmarks, setBookmarks] = useState([]);

  // Fetch bookmarks whenever the screen comes into focus
  useFocusEffect(
    useCallback(() => {
      const loadBookmarks = async () => {
        const savedBookmarks = await getBookmarks();
        setBookmarks(savedBookmarks);
      };
      loadBookmarks();
    }, [])
  );

  const handleRemoveBookmark = async (jobId) => {
    await removeBookmark(jobId);
    const updatedBookmarks = bookmarks.filter((b) => b.id !== jobId);
    setBookmarks(updatedBookmarks);
  };

  return (
    <View style={{ flex: 1 }}>
      {bookmarks.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>No bookmarks yet</Text>
      ) : (
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <JobCard
                job={item}
                onPress={() => navigation.navigate('JobDetails', { job: item })}
              />
              <TouchableOpacity
                onPress={() => handleRemoveBookmark(item.id)}
                style={{
                  backgroundColor: '#FF4500',
                  padding: 8,
                  marginHorizontal: 16,
                  borderRadius: 4,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: '#fff', textAlign: 'center' }}>Unbookmark</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}