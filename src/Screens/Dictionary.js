import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

import Header from '../Components/Header';

import Icon from 'react-native-vector-icons/FontAwesome5';

const deviceWidth = Dimensions.get('window').width;

const Dictionary = () => {
  const [word, setWord] = useState('');
  const [searchedWord, setSearchedWord] = useState('');
  const [data, setData] = useState([]);
  const [definitions, setDefinitions] = useState([]);

  const renderItemComponent = ({item}) => {
    return (
      <View>
        <View style={{backgroundColor: '#4978EE', margin: 10, padding: 10}}>
          <Text style={{fontSize: 18, color: '#fff'}}>{item.definition}</Text>
          {item.example ? (
            <View
              style={{
                backgroundColor: 'orangered',
                margin: 12,
                padding: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#fff',
                  fontStyle: 'italic',
                }}>
                Example:{'\n'}
                {item.example}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    );
  };

  const searchWord = () => {
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(response => {
        console.log('data ---> ', response.data[0].meanings);
        setSearchedWord(response.data[0].word);
        setDefinitions(response.data[0].meanings[0].definitions);
      })
      .catch(err => {
        console.error(err);
        Alert.alert('Error!', 'No such word found. Try entering another word.');
      });
  };

  return (
    <View style={styles.container}>
      <Header title="Dictionary" />
      <View>
        <View
          style={{
            backgroundColor: '#4997EC',
            width: deviceWidth,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={styles.inputBox}
            placeholder="Search for a word"
            value={word}
            onChangeText={value => {
              setWord(value);
            }}
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={() => searchWord()}>
            <Icon name="search" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#DFDFDF',
          margin: 10,
          width: deviceWidth - 20,
        }}>
        <Text style={{fontSize: 20, margin: 12, color: '#000000'}}>
          Word: {searchedWord}
        </Text>
      </View>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>Definition(s):</Text>
      {definitions.length === 0 ? null : (
        <FlatList
          contentContainerStyle={{paddingBottom: 130}}
          data={definitions}
          renderItem={item => renderItemComponent(item)}
        />
      )}
    </View>
  );
};

export default Dictionary;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputBox: {
    width: deviceWidth - 60,
    height: 50,
    paddingLeft: 20,
    margin: 12,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 40,
    backgroundColor: '#FEFEFE',
  },
});
