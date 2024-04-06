import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { IconButton } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes, deleteObject } from "firebase/storage";

const db = SQLite.openDatabase('coinDatabase1');

const AddImg = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [Country, setCountryValue] = useState('');
  const [image, setImage] = useState(null);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists coins (id integer primary key not null, uid text, name text, country text, imagePath text);'
      );
      tx.executeSql('select * from coins', [], (_, { rows }) => {
        const coins = rows._array.map((item) => ({
          uid: item.uid,
          name: item.name,
          country: item.country,
          imagePath: item.imagePath,
        }));
        setCoins(coins);
      });
    });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const saveCoinToDatabase = async () => {
    if (!image) {
      alert('Please select an image');
      return;
    }

    const newCoin = {
      uid: Date.now().toString(),
      name: textInputValue,
      country: Country,
    };

    try {
      // Upload image to Firebase Storage
      const imageRef = ref(storage, `images/${newCoin.uid}`);
      const response = await fetch(image);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const imageUrl = await getDownloadURL(imageRef);

      // Save coin data to SQLite with image URL
      setCoins([...coins, { ...newCoin, imagePath: imageUrl }]);
      db.transaction((tx) => {
        tx.executeSql(
          'insert into coins (uid, name, country, imagePath) values(?, ?, ?, ?)',
          [newCoin.uid, newCoin.name, newCoin.country, imageUrl]
        );
      });

      setTextInputValue('');
      setCountryValue('');
      setImage(null);
    } catch (error) {
      console.error('Error saving coin to database:', error);
      // You can add additional error handling logic here, such as showing an alert
    }
  };

  const deleteCoin = async (coin) => {
    // Delete from SQLite
    db.transaction((tx) => {
      tx.executeSql('delete from coins where uid = ?', [coin.uid]);
    });

    // Delete from Firebase Storage (if imagePath is present)
    if (coin.imagePath) {
      const imageRef = ref(storage, coin.imagePath);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error('Error deleting image from Firebase Storage:', error);
      }
    }

    // Update state to reflect deletion
    setCoins((prevCoins) => prevCoins.filter((c) => c.uid !== coin.uid));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Add your coin here</Text>

      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imagePickerContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePickerPreview} />
          ) : (
            <Text>Select Image</Text>
          )}
        </View>
      </TouchableOpacity>

      <TextInput
        placeholder="Enter coin name"
        value={textInputValue}
        onChangeText={(data) => setTextInputValue(data)}
        underlineColorAndroid="transparent"
        style={styles.textInputStyle}
      />
      <TextInput
        placeholder="Country"
        value={Country}
        onChangeText={(data) => setCountryValue(data)}
        underlineColorAndroid="transparent"
        style={styles.textInputStyle}
      />

      <TouchableOpacity
        disabled={!textInputValue}
        onPress={saveCoinToDatabase}
        style={styles.buttonStyle}>
        <Text style={styles.buttonTextStyle}> Save Coin </Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.customerName}>Coins: </Text>
        {coins.map((coin) => (
          <View key={coin.uid} style={styles.coin}>
            <Text style={styles.coinName}>{coin.name}</Text>
            <View style={styles.icons}>
              <IconButton icon="delete" size={24} onPress={() => deleteCoin(coin)} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  imagePickerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePickerPreview: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  coin: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  coinName: {
    fontSize: 18,
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    marginTop: 32,
    minWidth: 250,
    marginBottom: 16,
  },
  buttonTextStyle: {
    padding: 5,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    fontSize: 18,
    width: '100%',
    borderWidth: 1,
    borderColor: 'green',
  },
  icons: {
    flexDirection: 'row',
  },
});

export default AddImg;



// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { IconButton } from 'react-native-paper';
// import * as ImagePicker from 'expo-image-picker';
// import { database } from '../firebase'; // Update this import statement
// import storage from '../firebase'; // Import storage as default import


// const AddImg = () => {
//   const [textInputValue, setTextInputValue] = useState('');
//   const [Country, setCountryValue] = useState('');
//   const [Denomination, setDenomination] = useState('');
//   const [Year, setYear] = useState('');
//   const [Mint, setMintValue] = useState('');
//   const [Condition, setConditionValue] = useState('');
//   const [Rarity, setRarityValue] = useState('');
//   const [image, setImage] = useState(null);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };

//   const saveCoinToDatabase = async () => {
//     if (!image) {
//       alert('Please select an image');
//       return;
//     }

//     const newCoin = {
//       uid: Date.now().toString(),
//       name: textInputValue,
//       country: Country,
//       denomination: Denomination,
//       year: Year,
//       mint: Mint,
//       condition: Condition,
//       rarity: Rarity,
//     };

//     try {
//       // Upload image to Firebase Storage
//       const imageRef = storage.ref().child(`images/${newCoin.uid}`);
//       const response = await fetch(image);
//       const blob = await response.blob();
//       await imageRef.put(blob);

//       // Get the download URL for the image
//       const imageUrl = await imageRef.getDownloadURL();

//       // Save coin data to Firebase Realtime Database
//       await database.ref('coins').child(newCoin.uid).set({
//         name: newCoin.name,
//         country: newCoin.country,
//         denomination: newCoin.denomination,
//         year: newCoin.year,
//         mint: newCoin.mint,
//         condition: newCoin.condition,
//         rarity: newCoin.rarity,
//         imagePath: imageUrl,
//       });

//       setTextInputValue('');
//       setCountryValue('');
//       setDenomination('');
//       setYear('');
//       setMintValue('');
//       setConditionValue('');
//       setRarityValue('');
//       setImage(null);
//     } catch (error) {
//       console.error('Error saving coin to database:', error);
//       // You can add additional error handling logic here, such as showing an alert
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.titleText}>Add your coin here</Text>

//       <TouchableOpacity onPress={pickImage}>
//         <View style={styles.imagePickerContainer}>
//           {image ? (
//             <Image source={{ uri: image }} style={styles.imagePickerPreview} />
//           ) : (
//             <Text>Select Image</Text>
//           )}
//         </View>
//       </TouchableOpacity>

//       <TextInput
//         placeholder="Enter coin name"
//         value={textInputValue}
//         onChangeText={(data) => setTextInputValue(data)}
//         underlineColorAndroid="transparent"
//         style={styles.textInputStyle}
//       />
//       <TextInput
//         placeholder="Country"
//         value={Country}
//         onChangeText={(data) => setCountryValue(data)}
//         underlineColorAndroid="transparent"
//         style={styles.textInputStyle}
//       />
//       <TextInput
//         placeholder="Denomination"
//         value={Denomination}
//         onChangeText={(data) => setDenomination(data)}
//         underlineColorAndroid="transparent"
//         style={styles.textInputStyle}
//       />
//       <TextInput
//         placeholder="Year"
//         value={Year}
//         onChangeText={(data) => setYear(data)}
//         underlineColorAndroid="transparent"
//         style={styles.textInputStyle}
//       />
//       <TextInput
//         placeholder="Mint"
//         value={Mint}
//         onChangeText={(data) => setMintValue(data)}
//         underlineColorAndroid="transparent"
//         style={styles.textInputStyle}
//       />
//       <TextInput
//         placeholder="Condition"
//         value={Condition}
//         onChangeText={(data) => setConditionValue(data)}
//         underlineColorAndroid="transparent"
//         style={styles.textInputStyle}
//       />
//       <TextInput
//         placeholder="Rarity"
//         value={Rarity}
//         onChangeText={(data) => setRarityValue(data)}
//         underlineColorAndroid="transparent"
//         style={styles.textInputStyle}
//       />

//       <TouchableOpacity
//         disabled={!textInputValue}
//         onPress={saveCoinToDatabase}
//         style={styles.buttonStyle}>
//         <Text style={styles.buttonTextStyle}> Save Coin </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: 'white',
//   },
//   titleText: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     paddingVertical: 20,
//   },
//   imagePickerContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   imagePickerPreview: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover',
//     marginBottom: 10,
//   },
//   buttonStyle: {
//     fontSize: 16,
//     color: 'white',
//     backgroundColor: 'green',
//     padding: 5,
//     marginTop: 32,
//     minWidth: 250,
//     marginBottom: 16,
//   },
//   buttonTextStyle: {
//     padding: 5,
//     fontSize: 18,
//     color: 'white',
//     textAlign: 'center',
//   },
//   textInputStyle: {
//     textAlign: 'center',
//     height: 40,
//     fontSize: 18,
//     width: '100%',
//     borderWidth: 1,
//     borderColor: 'green',
//   },
// });

// export default AddImg;
