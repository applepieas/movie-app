import MovieCard from '@/components/MovieCard'
import SearchBar from '@/components/SearchBar'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchMovies } from '@/services/api'
import { updateSearchCount } from '@/services/appwrite'
import useFetch from '@/services/useFetch'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const searchMoviesByQuery = useCallback(() => fetchMovies({
    query: searchQuery
  }), [searchQuery])

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: searchMovies,
    reset: resetSearch
  } = useFetch(searchMoviesByQuery, false)

  useEffect(() => {
    const query = searchQuery.trim()

    if (!query || !movies?.length) return

    updateSearchCount(query, movies[0]).then(() => {
      console.log('Search count updated for:', query)
    }).catch((error) => {
      console.warn('Failed to update search count in Appwrite:', error);
    });
  }, [movies, searchQuery])

  useEffect(() => {

    const query = searchQuery.trim()

    if (!query) {
      resetSearch()
      return
    }

    const timeoutId = setTimeout(() => {
      searchMovies()
    }, 400) // change to 300/400/700 as you prefer

    return () => clearTimeout(timeoutId)
  }, [searchQuery, searchMovies, resetSearch])

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='absolute w-full z-0 flex-1' resizeMode='cover' />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        className='px-5'
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{ paddingBottom: 100 }}

        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20 items-center'>
              <Image source={icons.logo} className='w-12 h-10' />
            </View>

            <View className='my-4'>
              <SearchBar
                placeholder='Search movies...'
                value={searchQuery}
                onChange={(text: string) => setSearchQuery(text)}
              />

              {moviesLoading && (
                <ActivityIndicator size='large' color='#ab8bff' className='my-3' />
              )}

              {moviesError && (
                <Text className='text-red-500 px-5 my-3'>
                  Error: {moviesError?.message}
                </Text>
              )}

              {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                <Text className='text-xl text-white mt-4'>
                  Results for{' '}
                  <Text className='text-accent'>
                    {searchQuery}
                  </Text>
                </Text>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <Text className='text-white text-center mt-10'>
              {searchQuery.trim() ? 'No movies found.' : 'Start typing to search for movies...'}
            </Text>
          ) : null
        }
      />

    </View>
  )
}

export default Search