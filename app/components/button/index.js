import React from 'react';
import { TouchableOpacity, Text } from "react-native";

//Styles
import { styles } from './styles';

const Button = ({title, action}) => {
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={action}
    >
      <Text style={styles.btnTxt} >{title}</Text>
    </ TouchableOpacity>
  );
}

export default Button;

