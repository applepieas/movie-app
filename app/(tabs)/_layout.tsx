import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import React from 'react'
import { Image, ImageBackground, ImageSourcePropType, StyleSheet, Text } from 'react-native'

type TabIconProps = {
  source: ImageSourcePropType
  title: string
  focused: boolean
}

const TabIcon = ({ source, title, focused }: TabIconProps) => {
  return (
    <ImageBackground
      source={images.highlight}
      className='flex flex-row w-full flex-1 min-w-[100px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden '
      imageStyle={{ opacity: focused ? 1 : 0 }}
    >
      <Image
        source={source}
        tintColor={focused ? '#151312' : '#A8B5DB'}
        resizeMode='contain'
        style={styles.tabIcon}
      />

      {focused && (
        <Text style={[styles.tabText, focused ? styles.tabTextFocused : styles.tabTextUnfocused]}>
          {title}
        </Text>
      )}

    </ImageBackground>)
}

const _Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#0f032d',
          borderRadius: 50,
          marginHorizontal: 12,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f032d',
        }
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          headerShown: false,
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <>
              <TabIcon focused={focused} source={icons.home} title='Home' />
            </>
          )
        }}
      />

      <Tabs.Screen
        name='search'
        options={{
          headerShown: false,
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.search} title='Search' />
          )
        }}

      />

      <Tabs.Screen
        name='saved'
        options={{
          headerShown: false,
          title: 'Saved',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.save} title='Saved' />
          )
        }}
      />

      <Tabs.Screen
        name='profile'
        options={{
          headerShown: false,
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.person} title='Profile' />
          )
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
  tabText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  tabTextFocused: {
    color: '#151312',
  },
  tabTextUnfocused: {
    color: '#A8B5DB',
  },
})