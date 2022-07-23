import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, } from 'react-native';
import { spacing } from '../../theme';


type Props = {
  logo: any,
  title: string,
  link: string,
}



export const CardMenu = ({ logo, title, link }: Props) => {

  const navigation = useNavigation()

  const handleNavigate = () => {
    navigation.navigate(link as never);
  }

  return (
       <TouchableOpacity
        style={styles.cardMenu}
        onPress={handleNavigate}
      >
         <View style={{  }}>
            {/* {logo} */}
            <Text>
              {logo}
            </Text>
            {/* <Text style={{ fontSize: 14, fontWeight: '400' }}>{logo}</Text> */}
          </View>
          <Text style={{ fontSize: 18, fontWeight: '400', marginTop: 8, color: '#001D3D' }}>
            {title}
          </Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardMenu: {
    flex: 1,
    width: 10,
    margin: spacing[2],
    minHeight: 100,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
