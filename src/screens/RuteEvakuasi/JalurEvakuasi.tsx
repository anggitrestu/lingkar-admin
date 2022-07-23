import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Dimensions, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { IconFilter, IconArrowRight, IconBackBlue } from '../../assets';
const { width } = Dimensions.get('screen');
import ModalSelector from 'react-native-modal-selector'
import TabNav from './TabNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSelectedDukuh, loadPadukuhan } from '../../store';
import { loadRuteByDukuh } from '../../store/actions/rute.action';
import { Text } from '../../component';
import { camelCase } from '../../utils/string';
import tw from 'twrnc';
import { RootStackParamList } from '../../navigation/JalurEvakuasiNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateJalurEvakuasi'>;

const JalurEvakuasi = ({ navigation }: Props) => {
  const dispatch = useDispatch()
  const dukuh = useSelector((state: RootState) => state.padukuhan)
  useEffect(() => {
    dispatch(loadRuteByDukuh({ dukuh: dukuh.selected }) as never)
  }, [dukuh.selected])

  const DataPadukuhan = dukuh.list.map((item) => {
    return {
      key: item.key,
      label: camelCase(item.nama)
    }
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      <ModalSelector
        data={DataPadukuhan}
        initValue="Pilih Lokasi Padukuhan Anda Saat ini"
        supportedOrientations={['landscape']}
        onChange={(option) => {
          dispatch(setSelectedDukuh({ dukuh: option.label }) as never)
        }}
        cancelButtonAccessible={true}
        onTouchCancel={() => {
          console.log("cancel")
        }}
      >
        <View style={styles.cardFilter}>

          <View style={{ width: 20 }}>
            <View
              style={{
                alignSelf: 'flex-start',
              }}
            >
              <IconFilter />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'center'
            }}
          >

            {
              dukuh?.selected === "" || dukuh?.selected === null ?
                (
                  <Text style={styles.fontFilter}>Pilih Padukuhan</Text>
                )
                :
                (
                  <Text style={styles.fontFilter}>{camelCase(dukuh.selected ?? "")}</Text>
                )
            }
            {/* </ModalSelector> */}
          </View>
          <View style={{ width: 20 }}>
            <View
              style={{
                alignSelf: 'flex-end',
              }}
            >
              <IconArrowRight />
            </View>
          </View>
        </View>
      </ModalSelector>

      <TabNav />


      <TouchableOpacity
        onPress={() => navigation.navigate("UpdateJalurEvakuasi", {
          isEdit: false,
          data: {
            key: "",
            nama: "",
            latitude: "",
            deskripsi: "",
            longitude: "",
          }
        })}
        style={tw`bg-[#167270] rounded-full absolute bottom-[20px] right-[20px] h-12 w-12 flex justify-center items-center `}>
        <Text style={tw`text-white text-4xl font-bold`} >+</Text>
      </TouchableOpacity>

      {/* <Footer /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FA',
  },
  fontNavigation: {
    color: '#0068D6',
  },
  cardNavigation: {
    display: 'flex',
    flexDirection: 'row',
    width: width,
    height: 56,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFilter: {
    width: width,
    minHeight: 48,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    paddingHorizontal: 24,
    paddingVertical: 15,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 1
  },
  fontFilter: {
    fontWeight: '500',
    fontSize: 18,
    color: '#001D3D',
    alignSelf: 'center',
  },
  card: {
    width: '100%',
    height: 135,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24,
  },
  stickTop: {
    width: 10,
    height: '100%',
    backgroundColor: '#1A72DD',
    background:
      'linear-gradient(163.8deg, rgba(26,114,221,1) 10.18%, rgba(103,187,235,1) 111.98%)',
  },
  wrapperInfo: {
    width: '100%',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  fontInfo: {
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 0.02,
    color: '#001D3D',
    lineHeight: 20,
  },
  fontDesc: {
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0.03,
    color: '#667085',
    flexShrink: 1,
    marginTop: 24,
    marginBottom: 8,
  },
  fontDate: {
    fontWeight: '400',
    fontSize: 12,
    letterSpacing: 0.03,
    color: '#C4C4C4',
  },
});

export default JalurEvakuasi;
