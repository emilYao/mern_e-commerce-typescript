import React from 'react';
import { View, Text } from 'react-native';
import { useGetProductsQuery } from '../../../app/features/api/productSliceApi';
export default function PopularSales() {
    const {
        data:posts ,
        isFetching,
        isLoading,
        isSuccess
      } = useGetProductsQuery( )
      
  return (
    <View>
      <Text>k</Text>
     </View>
  );
}
