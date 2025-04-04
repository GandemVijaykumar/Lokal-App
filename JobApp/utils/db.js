import AsyncStorage from '@react-native-async-storage/async-storage';

const BOOKMARKS_KEY = 'bookmarks';

// Store a bookmark
export const storeBookmark = async (job) => {
  try {
    const bookmarks = await getBookmarks();
    if (!bookmarks.some((b) => b.id === job.id)) {
      bookmarks.push(job);
      await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    }
  } catch (err) {
    console.error(err);
  }
};

// Remove a bookmark
export const removeBookmark = async (jobId) => {
  try {
    const bookmarks = await getBookmarks();
    const updatedBookmarks = bookmarks.filter((b) => b.id !== jobId);
    await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
  } catch (err) {
    console.error(err);
  }
};

// Get all bookmarks
export const getBookmarks = async () => {
  try {
    const bookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (err) {
    console.error(err);
    return [];
  }
};

// Check if a job is bookmarked
export const isBookmarked = async (jobId) => {
  try {
    const bookmarks = await getBookmarks();
    return bookmarks.some((b) => b.id === jobId);
  } catch (err) {
    console.error(err);
    return false;
  }
};