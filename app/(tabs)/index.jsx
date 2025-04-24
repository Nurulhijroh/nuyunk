import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData: "",
      dataMovie: [],
    };
  }

  ambilData = () => {
    fetch("http://www.omdbapi.com/?apikey=3d3bad48&s=loved")
      .then((response) => response.json())
      .then((json) =>
        this.setState({ dataMovie: json.Search }, () => console.log(json))
      )
      .catch((eror) => console.log(eror));
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            Movie IMDB
          </Text>
        </View>

        <View style={{ flex: 7 }}>
          <View
            style={{
              backgroundColor: "#aaa",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
            <View>
              <TextInput
                placeholder="Input Search Movie"
                onChangeText={(value) => this.setState({ searchData: value })}
                style={{
                  marginHorizontal: 20,
                  paddingHorizontal: 30,
                  borderBottomColor: "#000",
                  borderBottomWidth: 2,
                  width: 200,
                }}
              ></TextInput>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#000",
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderRadius: 10,
                  elevation: 5,
                }}
                onPress={() => this.ambilData()}
              >
                <Text style={{ color: "#fff" }}>Cari</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <FlatList
          data={this.state.dataMovie}
          keyExtractor={(item) => item.imdbID}
          renderItem={({ item, index }) => (
            <View style={{ marginTop: 10, alignItems: "center", padding: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                {item.Title}
              </Text>
              <Text>{item.Year}</Text>
            </View>
          )}
        ></FlatList>
      </View>
    );
  }
}

export default App;
