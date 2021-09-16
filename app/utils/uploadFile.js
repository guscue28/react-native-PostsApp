// @ts-ignore
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { View, FlatList, Text, TextInput, Image, TouchableOpacity, Modal, Platform } from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import Crypto from 'crypto-js';
import RNFetchBlob from 'rn-fetch-blob';
const fs = RNFetchBlob.fs

// @ts-ignore
const fetchBlob = (uri) => {
  // @ts-ignore
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

    console.log('uploadUri', uploadUri);

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        resolve(data)
      })
      .catch((err) => {
        console.log('err', err);
      })
  })
}

const isIOS = Platform.OS === 'ios';

const UploadFile = () => {
  launchImageLibrary({ mediaType: 'mixed' }, (file) => {
    file.assets.forEach(image => {
      const uri = image.uri;
      const type = image.type;
      const name = image.fileName;


      const photo = { uri, type, name }
      const ts = Math.round((new Date()).getTime() / 1000);
      const apiKey = '297614838253396';
      const apiSecret = '9mwO8PonOGPrOwWUO-gre2t1gQU';
      const hash = `timestamp=${ts}${apiSecret}`;
      const signature = Crypto.SHA1(hash).toString();
      const url = 'https://api.cloudinary.com/v1_1/guscue28/image/upload';

      fetchBlob(uri).then(blob => {
        console.log('imageBlob', blob);
        const file = encodeURIComponent('data:image/png;base64' + blob)
        const bodyR = {
          file,
          file_name: photo.name,
          timestamp: String(ts),
          api_key: apiKey,
          signature: signature,
        }

        let formBody = [];
        for (var property in bodyR) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(bodyR[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        console.log('formBody', formBody);

       return fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: formBody
        })
         .then(res => res.json())
         .then(res => console.log({ res }))
          .catch(err => console.log(err))
      })
    })

  });

  // const ts = Math.round((new Date()).getTime() / 1000);
  // const uri = file.uri;
  // const type = file.type;
  // const arr = file.uri.split('.');
  // const ext = arr[arr.length - 1];

  // const name = isIOS ? `${ts}.${ext}` : file.name;


  // const photo = { uri, type, name }

  // const apiKey = '297614838253396';
  // const apiSecret = '9mwO8PonOGPrOwWUO-gre2t1gQU';
  // const hash = `timestamp=${ts}${apiSecret}`;
  // // @ts-ignore
  // const signature = Crypto.SHA1(hash).toString();
  // // @ts-ignore
  // const url = 'https://api.cloudinary.com/v1_1/guscue28/image/upload';

  // const formData = new FormData();

  // // @ts-ignore
  // formData.append('file', photo);
  // // @ts-ignore
  // formData.append('timestamp', ts);
  // formData.append('api_key', apiKey);
  // formData.append('signature', signature);

  // return fetch(url, {
  //   method: 'POST',
  //   body: formData,
  // })
  //   .then(res => res.json())
  //   .then(res => console.log({ res }))
  //   .catch(err => console.log({ err }))

}

export default UploadFile;