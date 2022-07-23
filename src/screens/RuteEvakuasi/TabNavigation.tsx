import React, { useEffect } from 'react';
import { StyleSheet, View, ScrollView, Image, Dimensions, TouchableOpacity, Platform, Linking, } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { IconArrowRightBlue, IconEditBlue } from '../../assets';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Text } from '../../component';
import { setSelectRute } from '../../store/actions/rute.action';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/JalurEvakuasiNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import tw from "twrnc"
import GetLocation from 'react-native-get-location';

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateJalurEvakuasi'>;


function TitikKumpul({ navigation }: Props) {
  const rute = useSelector((state: RootState) => state.rute.rute)
  const dispatch = useDispatch()

  const route = useRoute()


  useEffect(() => {
    dispatch(setSelectRute(route.name) as never)
  }, [useIsFocused()])

  const openMapDirection = (latitude: number, longitude: number) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(location => {
      const url: any = Platform.select({
        ios: `comgooglemaps://?center=${location.latitude},${location.longitude}&q=${latitude},${longitude}&zoom=14&views=traffic&mode=driving"`,
        android: `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${latitude},${longitude}&travelmode=driving`,
      });
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(url);
          } else {
            const browser_url = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${latitude},${longitude}&travelmode=driving`;
            return Linking.openURL(browser_url);
          }
        })
        .catch(() => {
          if (Platform.OS === 'ios') {
            Linking.openURL(
              `maps://?q=${latitude},${longitude}`,
            );
          }
        });
    }).catch((error: any) => {
      console.log("error", error.message);
    })
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 12 }}>
        {
          rute?.titik_kumpul.length > 0 ?
            rute?.titik_kumpul.map((item, index) => {
              return (
                <View style={styles.cardTitikKumpul} key={index}>
                  <View style={{
                    paddingHorizontal: 18,
                    paddingVertical: 12,
                  }}>
                    <View style={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    </View>
                    <View style={{
                      marginTop: 4,
                    }} >
                      <View style={tw`items-center flex flex-row `}>
                        <View style={tw`mr-auto`}>
                          <Text preset='h3' style={styles.fontName}>{item.nama}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("UpdateJalurEvakuasi", {
                            isEdit: true,
                            data: {
                              key: item.key,
                              nama: item.nama,
                              latitude: item.latitude,
                              deskripsi: item.deskripsi,
                              longitude: item.longitude,
                            }
                          })}
                        >
                          <IconEditBlue width={20} height={20} />
                        </TouchableOpacity>
                      </View>
                      <Text preset='h4' style={styles.fontDesc}>
                        {item.deskripsi}
                      </Text>
                      <Text preset='h4' style={tw`text-gray-400`}>
                        {item.latitude} | {item.longitude}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => openMapDirection(parseFloat(item.latitude), parseFloat(item.longitude))}
                    style={tw`items-center flex flex-row bg-cyan-200 px-[18px] py-[8px]`}>
                    <Text style={tw`text-[#0068D6] font-medium mr-auto`}>Lihat lokasi di peta</Text>
                    <IconArrowRightBlue />
                  </TouchableOpacity>
                </View>

              )
            }) : (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text preset='h3'>Pilih padukuhan atau tambahkan data</Text>
              </View>
            )


        }



        <View style={{
          marginBottom: 20
        }} />

      </View >
    </ScrollView >
  );
}

function Pengungsian({ navigation }: Props) {
  const rute = useSelector((state: RootState) => state.rute.rute)
  const route = useRoute()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSelectRute(route.name) as never)
  }, [useIsFocused()])

  const openMapDirection = (latitude: number, longitude: number) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    }).then(location => {
      const url: any = Platform.select({
        ios: `comgooglemaps://?center=${location.latitude},${location.longitude}&q=${latitude},${longitude}&zoom=14&views=traffic&mode=driving"`,
        android: `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${latitude},${longitude}&travelmode=driving`,
      });
      Linking.canOpenURL(url)
        .then((supported) => {
          if (supported) {
            return Linking.openURL(url);
          } else {
            const browser_url = `https://www.google.com/maps/dir/?api=1&origin=${location.latitude},${location.longitude}&destination=${latitude},${longitude}&travelmode=driving`;
            return Linking.openURL(browser_url);
          }
        })
        .catch(() => {
          if (Platform.OS === 'ios') {
            Linking.openURL(
              `maps://?q=${latitude},${longitude}`,
            );
          }
        });
    }).catch((error: any) => {
      console.log("error", error.message);
    })
  };



  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 12 }}>

        {
          rute?.pengungsian.length > 0 ?
            rute?.pengungsian.map((item, index) => {
              return (
                <View style={styles.cardTitikKumpul} key={index}>
                  <View style={{
                    paddingHorizontal: 18,
                    paddingVertical: 12,
                  }}>
                    <View style={{
                      alignItems: 'center',
                      display: 'flex',
                      flexDirection: 'row',
                    }}>
                    </View>
                    <View style={{
                      marginTop: 4,
                    }} >
                      <View style={tw`items-center flex flex-row `}>
                        <View style={tw`mr-auto`}>
                          <Text preset='h3' style={styles.fontName}>{item.nama}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => navigation.navigate("UpdateJalurEvakuasi", {
                            isEdit: true,
                            data: {
                              key: item.key,
                              nama: item.nama,
                              latitude: item.latitude,
                              deskripsi: item.deskripsi,
                              longitude: item.longitude,
                            }
                          })}
                        >
                          <IconEditBlue width={20} height={20} />
                        </TouchableOpacity>
                      </View>
                      <Text preset='h4' style={styles.fontDesc}>
                        {item.deskripsi}
                      </Text>
                      <Text preset='h4' style={tw`text-gray-400`}>
                        {item.latitude} | {item.longitude}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => openMapDirection(parseFloat(item.latitude), parseFloat(item.longitude))}
                    style={tw`items-center flex flex-row bg-cyan-200 px-[18px] py-[8px]`}>
                    <Text style={tw`text-[#0068D6] font-medium mr-auto`}>Lihat lokasi di peta</Text>
                    <IconArrowRightBlue />
                  </TouchableOpacity>
                </View>
              )
            }) : (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text preset='h3' style={tw`text-gray-600`} >Silahkan Tambah Data Terlebih Dahulu</Text>
              </View>
            )
        }
      </View >

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  cardTitikKumpul: {
    width: '100%',
    minHeight: 48,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderRadius: 8,
    elevation: 2,

    marginBottom: 15,
  },
  textTruncate: {
    // minWidth: 150,
    // maxWidth: 100,
  },
  fontName: {
    fontWeight: '500',
    color: '#001D3D',
    marginBottom: 4,
  },
  fontDesc: {
    color: '#667085',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardPeta: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 20,
    width: '100%',
    minHeight: 52,
    backgroundColor: '#FFFCF5',
    borderWidth: 1,
    borderColor: '#FEDF89',
    borderStyle: 'solid',
    borderRadius: 8,
    justifyContent: 'center',
    alignContent: 'center',
  },

})

const Tab = createMaterialTopTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Titik Kumpul" component={TitikKumpul} />
      <Tab.Screen name="Pengungsian" component={Pengungsian} />
    </Tab.Navigator>
  );
}

