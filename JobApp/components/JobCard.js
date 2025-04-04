// components/JobCard.js
import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';

export default function JobCard({ job, onPress, onBookmark, isBookmarked }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Job Title */}
      <Text style={styles.title}>{job.title}</Text>

      {/* Company Name */}
      <Text style={styles.company}>{job.company || 'Not specified'}</Text>

      {/* Bookmark Button */}
      <TouchableOpacity onPress={onBookmark} style={styles.bookmarkButton}>
        <Text style={styles.bookmarkText}>
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  company: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  bookmarkButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#0E56A8',
    padding: 8,
    borderRadius: 4,
  },
  bookmarkText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});