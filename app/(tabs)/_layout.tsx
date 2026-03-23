import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, StyleSheet, Text } from 'react-native'

const _Layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <>
              <ImageBackground
                source={images.highlight}
                className='flex flex-row w-full flex-1 min-w-[90px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden '
              >
                <Image
                  source={icons.home}
                  tintColor='#151312'
                  resizeMode='contain'
                  style={styles.tabIcon}
                />

                <Text
                  className='text-secondary text-base font-semibold ml-2'
                >
                  Home
                </Text>

              </ImageBackground>
            </>
          )
        }}
      />

      <Tabs.Screen
        name='search'
        options={{
          headerShown: false,
          title: 'Search',
        }}
      />

      <Tabs.Screen
        name='saved'
        options={{
          headerShown: false,
          title: 'Saved',
        }}
      />

      <Tabs.Screen
        name='movies/[id]'
        options={{
          headerShown: false,
          title: 'Movie Details',
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          title: 'Profile',
        }}
      />
    </Tabs>
  )
}

export default _Layout

const styles = StyleSheet.create({
  tabIcon: {
    width: 16,
    height: 16,
  },
})