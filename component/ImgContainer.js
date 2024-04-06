import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const db = SQLite.openDatabase('coinDatabase1');

const ImgContainer = () => {
  const isFocused = useIsFocused(); // Use useIsFocused hook
  const [coinList, setCoinList] = useState([]);
  const [imageURIs, setImageURIs] = useState({});

  const refreshPage = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from coins', [], (_, { rows }) => {
        const coins = rows._array;
        setCoinList(coins);
        fetchImageURIs(coins);
      });
    });
  };

  const fetchImageURIs = async (coins) => {
    const uris = {};
    for (const coin of coins) {
      if (coin.imagePath) {
        const imageRef = ref(storage, coin.imagePath);
        try {
          const url = await getDownloadURL(imageRef);
          uris[coin.id] = url;
        } catch (error) {
          console.error('Error fetching image URL:', error);
          uris[coin.id] = null;
        }
      }
    }
    setImageURIs(uris);
  };

  useEffect(() => {
    if (isFocused) {
      refreshPage();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {coinList.map((coin) => (
          <View key={coin.id} style={styles.contimg}>
            {imageURIs[coin.id] ? (
              <Image source={{ uri: imageURIs[coin.id] }} style={styles.img} />
            ) : (
              <Text>Loading image...</Text>
            )}
            <Text>{coin.name}</Text>
            <Text>ID: {coin.id}</Text>
            <Text>Country: {coin.country}</Text>
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
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  contimg: {
    width: 150,
    padding: 15,
    borderWidth: 0.001,
    borderRadius: 20,
    backgroundColor: '#D6C426',
    alignItems: 'center',
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 20,
  },
});

export default ImgContainer;

// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, StyleSheet } from 'react-native';
// import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused
// import { database } from '../firebase';
// import storage from '../firebase'; // Import storage as default import

// const ImgContainer = () => {
//   const isFocused = useIsFocused(); // Use useIsFocused hook
//   const [coinList, setCoinList] = useState([]);
//   const [imageURIs, setImageURIs] = useState({});

//   const refreshPage = () => {
//     const coinsRef = database.ref('coins');
//     coinsRef.once('value', (snapshot) => {
//       const coins = [];
//       snapshot.forEach((childSnapshot) => {
//         const coin = childSnapshot.val();
//         coin.id = childSnapshot.key;
//         coins.push(coin);
//       });
//       setCoinList(coins);
//       fetchImageURIs(coins);
//     });
//   };

//   const fetchImageURIs = async (coins) => {
//     const uris = {};
//     for (const coin of coins) {
//       if (coin.imagePath) {
//         try {
//           const url = await storage.ref(coin.imagePath).getDownloadURL();
//           uris[coin.id] = url;
//         } catch (error) {
//           console.error('Error fetching image URL:', error);
//           uris[coin.id] = null;
//         }
//       }
//     }
//     setImageURIs(uris);
//   };
  

//   useEffect(() => {
//     if (isFocused) {
//       refreshPage();
//     }
//   }, [isFocused]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.row}>
//         {coinList.map((coin) => (
//           <View key={coin.id} style={styles.contimg}>
//             {imageURIs[coin.id] ? (
//               <Image source={{ uri: imageURIs[coin.id] }} style={styles.img} />
//             ) : (
//               <Text>Loading image...</Text>
//             )}
//             <Text>{coin.name}</Text>
//             <Text>Country: {coin.country}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     justifyContent: 'space-between',
//   },
//   contimg: {
//     width: 150,
//     padding: 15,
//     borderWidth: 0.001,
//     borderRadius: 20,
//     backgroundColor: '#D6C426',
//     alignItems: 'center',
//   },
//   img: {
//     height: 150,
//     width: 150,
//     borderRadius: 20,
//   },
// });

// export default ImgContainer;
