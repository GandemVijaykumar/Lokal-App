// screens/JobDetailsScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

export default function JobDetailsScreen({ route }) {
  const { job } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Job Title */}
      <Text style={styles.title}>{job.title}</Text>

      {/* Job Image (if available) */}
      {job.image && (
        <Image source={{ uri: job.image }} style={styles.image} resizeMode="cover" />
      )}

      {/* Job Description */}
      <Text style={styles.label}>Description:</Text>
      <Text style={styles.description}>{job.description || 'No description available'}</Text>

      {/* Additional Details */}
      <Text style={styles.label}>Company:</Text>
      <Text style={styles.detail}>{job.company || 'Not specified'}</Text>

      <Text style={styles.label}>Location:</Text>
      <Text style={styles.detail}>{job.location || 'Not specified'}</Text>

      <Text style={styles.label}>Salary:</Text>
      <Text style={styles.detail}>{job.salary ? `$${job.salary}` : 'Not specified'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
});