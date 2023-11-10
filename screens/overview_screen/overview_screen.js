import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'

import { Colors } from '../../constants/colors'

export default function OverviewScreen() {

  return (
    <View style={{ flex: 1, backgroundColor: Colors.lightColor }}>
      <Text>Overview</Text>
    </View>
  )
}