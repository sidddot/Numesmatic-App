import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import ImgContainer from './ImgContainer';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  
  

  const handleSearch = (text) => {
    setSearchText(text);

    // Filter the data based on the search text
    const filtered =coinList.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search..."
        onChangeText={handleSearch}
        value={searchText}
      />

    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default Search;
