import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Modal } from 'react-native';

// @ts-ignore
import close from '../../assets/icons/close.png';
import { styles } from './styles';

const Mod = ({onDismiss = () => null, onShow = () => null, visible, children, onClose }) => {

  return (
    <Modal
      animationType="slide"
      onDismiss={() => onDismiss}
      onShow={() => onShow}
      transparent
      visible={visible}
    >
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={onClose}
            >
              <Image source={close} style={styles.btnClose} />
            </TouchableOpacity>
          </View>

          {children}
        </View>
      </View>
    </Modal>
  )

}

export default Mod;