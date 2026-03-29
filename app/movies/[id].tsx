import { icons } from '@/constants/icons'
import { fetchMovieDetails } from '@/services/api'
import useFetch from '@/services/useFetch'
import { router, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface MovieInfoProps {
  label: string
  value: string | number | null | undefined
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  return (
    <View className='flex-col items-start justify-center mt-5 w-full'>
      <Text className='text-light-200 font-normal text-sm'>
        {label}
      </Text>
      <Text className='text-light-100 font-bold text-sm mt-1 w-full shrink'>
        {value || 'N/A'}
      </Text>


    </View>
  )
}

const MovieDetails = () => {
  const { id } = useLocalSearchParams()
  const movieId = Number(Array.isArray(id) ? id[0] : id)

  const { data: movie, loading, error } = useFetch(
    () => fetchMovieDetails(movieId),
    Number.isFinite(movieId)
  )

  if (!Number.isFinite(movieId)) {
    return (
      <View className='bg-primary flex-1 items-center justify-center px-4'>
        <Text className='text-white text-base'>Invalid movie id.</Text>
      </View>
    )
  }

  if (loading) {
    return (
      <View className='bg-primary flex-1 items-center justify-center'>
        <ActivityIndicator size='large' color='#ffffff' />
      </View>
    )
  }

  if (error || !movie) {
    return (
      <View className='bg-primary flex-1 items-center justify-center px-4'>
        <Text className='text-white text-base text-center'>Unable to load movie details.</Text>
      </View>
    )
  }

  const posterUri = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/600x900/1a1a1a/ffffff.png'

  return (
    <View className='bg-primary flex-1'>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <View>
          <Image
            source={{ uri: posterUri }}
            className='w-full h-[550px]'
            resizeMode='stretch'
          />
        </View>

        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>

          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>

          </View>

          <View className='flex-row items-center bg-dark-200 px-2 py-1 rounded-md mt-3 gap-x-1'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white font-bold text-sm'>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>

            <Text className='text-light-200 text-sm'>
              ({movie?.vote_count} votes)
            </Text>
          </View>

          <MovieInfo
            label='Overview'
            value={movie?.overview}
          />
          <MovieInfo
            label='Genres'
            value={movie?.genres?.map((g) => g.name).join(', ') || 'N/A'}
          />

          <View className='flex flex-row justify-between w-1/2'>
            <MovieInfo
              label='Budget'
              value={`$${movie?.budget / 1_000_000} million`}
            />

            <MovieInfo
              label='Revenue'
              value={`$${Math.round(movie?.revenue / 1_000_000)} million`}
            />
          </View>

          <MovieInfo
            label={'Production Companies'}
            value={movie?.production_companies.map((c) => c.name).join(', ') || 'N/A'}
          />

        </View>
      </ScrollView>

      <TouchableOpacity
        className='absolute bottom-5 left-0 right-0 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50 mx-5'
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className='size-5 mr-1 mt-0.5 rotate-180'
          tintColor='#fff'

        />

        <Text className='text-white font-semibold text-base'>
          Go Back
        </Text>
      </TouchableOpacity>
    </View >
  )
}

export default MovieDetails