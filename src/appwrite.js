import { Client, Databases, ID, Query } from 'appwrite'

// التحقق من وجود متغيرات البيئة
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';

// فحص وجود المتغيرات المطلوبة
if (!PROJECT_ID || !DATABASE_ID || !COLLECTION_ID) {
  console.error('Missing required Appwrite environment variables:', {
    PROJECT_ID: !!PROJECT_ID,
    DATABASE_ID: !!DATABASE_ID,
    COLLECTION_ID: !!COLLECTION_ID
  });
}

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm, movie) => {
  // التحقق من وجود المتغيرات المطلوبة
  if (!DATABASE_ID || !COLLECTION_ID || !PROJECT_ID) {
    console.error('Appwrite configuration is missing. Skipping search count update.');
    return;
  }

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ]);

    if (result.documents.length > 0) {
      const doc = result.documents[0];
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error('Appwrite error:', error);
  }
};

export const getTrendingMovies = async () => {
  // التحقق من وجود المتغيرات المطلوبة
  if (!DATABASE_ID || !COLLECTION_ID || !PROJECT_ID) {
    console.error('Appwrite configuration is missing. Returning empty trending movies.');
    return [];
  }

  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ]);
    return result.documents;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};