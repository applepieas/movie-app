
import { icons } from '@/constants/icons';
import React from 'react';
import { Image, Pressable, TextInput, View } from 'react-native';

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChange?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChange }: Props) => {
  return (
    <Pressable onPress={onPress}>
      <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className='size-5'
          resizeMode='contain' tintColor={"#ab8bff"}
        />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          editable={!onPress}
          className='flex-1 text-white'
          style={{ marginLeft: 8 }}
          placeholderTextColor='#ab8bff'
        />

      </View >
    </Pressable>
  )
}

export default SearchBar