import React from 'react';
import { Text, TextInput } from 'react-native';
import { styles } from './styles';

const Input = ({title, custom}) => {
  return (
    <>
     <Text style={styles.title}>{title}</Text>
     <TextInput
       secureTextEntry
        style={styles.text}
       {...custom}
      />
    </>  
  );
}

export default Input;