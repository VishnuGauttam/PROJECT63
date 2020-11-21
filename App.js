import * as React from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import  {Header}  from  'react-native-elements'
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
    };
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/%22+searchKeyword+%22.json';

    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((Response) => {
        var responseObject = Response;
        if (responseObject) {
          var wordData = responseObject.definition[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;

          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            lexicalCategory: 'CANT FIND A MATCH',
            definition: 'NO RESULTS',
          });
        }
      });
  };
  render() {
    return (
      <View style={styles.container}>
      <Header
  placement="left"
  leftComponent={{ icon: 'menu', color: '#fff',size:24 }}
  centerComponent={{ text: 'FIND ANY WORD', style: { color: '#fff' ,fontSize:30 } }}
  rightComponent={{ icon: 'home', color: '#fff',size:27 }}
/>
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'loading..',
              lexicalCategory: '',
              examples: [],
              definition: '',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({ displayText: this.state.text });
            this.setState({ isSearchPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>
        <Text style={styles.displayText}>{this.state.displayText}</Text>

        <Text style={styles.title1}>WORD:{''}</Text>
        <Text style={styles.word12}>{this.state.word}</Text>

        <Text style={styles.title2}>TYPE:{''}</Text>
        <Text style={styles.wor12}>{this.state.lexicalCategory}</Text>

        <Text style={styles.title3}>DEFINITION:{''}</Text>
        <Text style={styles.wo12}>{this.state.definition}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#C471ED',
  },

  word12: {
    fontSize: 27,
    marginBottom: -40,
    marginLeft: 130,
    color: '#FFFF00',
  },
  wor12: {
    fontSize: 27,
    marginBottom: -50,
    color: '#FF9900',
  },

  wo12: {
    fontSize: 27,
    marginTop: 10,
    color: '#FF3300',
  },
  title1: {
    fontSize: 40,
    marginTop: 40,
    color: '#FFFF00',
  },
  title2: {
    fontSize: 40,
    marginTop: 40,
    color: '#FF9900',
  },
  title3: {
    fontSize: 40,
    marginTop: 40,
    color: '#FF3300',
  },
  inputBox: {
    marginTop: 130,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  button: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  displayText: {
    textAlign: 'center',
    fontSize: 30,
  },
});
