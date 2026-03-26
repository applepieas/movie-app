// track the searches made by a user

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const TMDB_POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  // check if a record of that search query already exists in the database
  // if it does simply increment the count
  // if no then create a new record with count 1
  const trimmedQuery = query.trim();

  if (!trimmedQuery || !movie) {
    console.log("Skipping search count update: missing query or movie");
    return;
  }

  if (!DATABASE_ID || !COLLECTION_ID) {
    throw new Error(
      "Missing Appwrite config: set EXPO_PUBLIC_APPWRITE_DATABASE_ID and EXPO_PUBLIC_APPWRITE_COLLECTION_ID in .env"
    );
  }

  if (COLLECTION_ID === "searches") {
    console.warn(
      "Skipping Appwrite search tracking: EXPO_PUBLIC_APPWRITE_COLLECTION_ID is still set to 'searches'. Replace it with your real collection ID from the Appwrite console."
    );
    return;
  }

  try {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", trimmedQuery),
      Query.limit(1),
    ]);

    if (res.documents.length > 0) {
      const existing = res.documents[0] as { $id: string; count?: number };

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, existing.$id, {
        count: (existing.count ?? 0) + 1,
      });
      console.log("Incremented search count for:", trimmedQuery);
      return;
    }

    await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      searchTerm: trimmedQuery,
      count: 1,
      movie_id: movie.id,
      title: movie.title,
      poster_url: `${TMDB_POSTER_BASE_URL}${movie.poster_path}`,
    });
    console.log("Created new search count for:", trimmedQuery);
  } catch (error) {
    console.error("Failed to update search count in Appwrite:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const res = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(100),
      Query.orderDesc("count"),
    ]);

    const docs = res.documents as unknown as TrendingMovie[];
    const byMovieId = new Map<number, TrendingMovie>();

    for (const movie of docs) {
      const existing = byMovieId.get(movie.movie_id);

      if (!existing) {
        byMovieId.set(movie.movie_id, { ...movie });
        continue;
      }

      byMovieId.set(movie.movie_id, {
        ...existing,
        count: existing.count + movie.count,
      });
    }

    return Array.from(byMovieId.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  } catch (error) {
    console.error("Failed to fetch trending movies from Appwrite:", error);
    return undefined;
  }
}