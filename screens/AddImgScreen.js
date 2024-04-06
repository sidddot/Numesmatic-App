// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, Image } from 'react-native';
// import { v4 as uuidv4 } from 'uuid';
// import { storage } from '../firebase';
// import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';

// function AddImgScreen() {
//   const [imageUpload, setImageUpload] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);

//   const uploadFile = async () => {
//     if (!imageUpload) return;

//     const manipResult = await ImageManipulator.manipulateAsync(
//       imageUpload.uri,
//       [{ resize: { width: 200, height: 200 } }],
//       { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
//     );

//     const response = await fetch(manipResult.uri);
//     const blob = await response.blob();

//     const imageRef = ref(storage, `images/${uuidv4()}`);
//     await uploadBytes(imageRef, blob);

//     const url = await getDownloadURL(imageRef);
//     setImageUrls((prev) => [...prev, url]);
//   };

//   const selectImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImageUpload(result);
//     }
//   };

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
//     })();
//   }, []);

//   return (
//     <View>
//       <Text style={{ paddingTop: 100 }}>oo</Text>
//       <Button title="Select Image" onPress={selectImage} />
//       <Button title="Upload Image" onPress={uploadFile} />
//       {imageUrls.map((url, index) => (
//         <Image key={index} source={{ uri: url }} style={{ width: 200, height: 200 }} />
//       ))}
//     </View>
//   );
// }

// export default AddImgScreen;
