import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Settings() {
  return (
    <View
    style={[
      
      {
        flex:1,
        // Try setting `flexDirection` to `"row"`.
        flexDirection: 'column',
      },
    ]}>
    <View style={{flex: 1, backgroundColor: 'red'}} >
        <Text>Hello</Text>
    </View>
    <View style={{flex: 2, backgroundColor: 'darkorange'}} />
    <View style={{flex: 3, backgroundColor: 'green'}} />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
  