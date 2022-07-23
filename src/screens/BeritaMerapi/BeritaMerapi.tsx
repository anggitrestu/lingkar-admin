import { useIsFocused } from "@react-navigation/native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput, Button, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import tw from "twrnc"
import { RootStackParamList } from "../../navigation/BeritaMerapiNavigation"
const { width } = Dimensions.get("window")
import { RootState, addBerita, loadBerita, updateBerita, removeBerita } from '../../store'


type Props = NativeStackScreenProps<RootStackParamList, 'TambahBeritaMerapi'>;


const BeritaMerapi = ({ navigation }: Props) => {

    const dispatch = useDispatch()
    const beritaData = useSelector((state: RootState) => state.berita.berita)

    useEffect(() => {
        dispatch(loadBerita() as never)
    }, [useIsFocused()])

    const handleDeleteBerita = (key: string) => {

        Alert.alert(
            'Hapus Informasi',
            'Apakah anda yakin ingin menghapus informasi ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        dispatch(removeBerita({ key }) as never)
                    }
                },
            ],
            {
                cancelable: true,
            },
        )

    }

    return (

        <View style={{
            flex: 1,
        }} >

            <View style={tw`p-[24px]`}>
                <ScrollView>
                    {
                        beritaData.length > 0 ?
                            (
                                beritaData.map((item, index: number) => {
                                    return (
                                        //  onPress={() => showUpdateBerita(item.key)} 
                                        <View style={tw`rounded-xl mb-[20px]`} key={index}>
                                            <View style={tw`flex flex-row bg-white rounded-xl`}>
                                                {/* profile picture */}
                                                <View style={tw`bg-green-900 rounded-l-xl w-[20px]`}>
                                                </View>
                                                {/* description */}
                                                <View style={tw`ml-4 py-[10px] w-[${width * 0.7}px]`}>
                                                    <Text style={tw`text-gray-600 text-base font-bold mb-2`}> {item?.judul} </Text>
                                                    <Text style={tw`text-gray-400 overflow-hidden mb-1 text-justify`}>
                                                        {item?.ringkasan}
                                                    </Text>
                                                    {/* <Text style={tw`text-gray-400 overflow-hidden mb-3 text-justify`}>
                                                        {item?.konten}
                                                    </Text> */}
                                                    <Text style={tw`text-gray-400 text-xs`}>{item?.tanggal}</Text>
                                                    <View style={tw`flex flex-row`}>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                navigation.navigate('TambahBeritaMerapi', {
                                                                    idEdit: true,
                                                                    data: {
                                                                        judul: item.judul,
                                                                        ringkasan: item.ringkasan,
                                                                        isi: item.konten,
                                                                        key: item.key,
                                                                    }
                                                                })
                                                            }}
                                                        >
                                                            <Text style={tw`text-blue-800 underline text-sm mt-2 mr-4 `}>Ubah</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            onPress={() => handleDeleteBerita(item?.key)}
                                                        >
                                                            <Text style={tw`text-red-800 underline text-sm mt-2  `}>Hapus</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            ) : (
                                <View style={tw`flex flex-row min-h-[50px] w-full pr-[10px] mb-[15px]`}>
                                    <Text style={tw`font-medium text-base text-justify`} >Belum ada berita</Text>
                                </View>
                            )
                    }
                </ScrollView>
            </View>


            {/* button add card in bottom of screen */}
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('TambahBeritaMerapi', {
                        idEdit: false,
                        data: {
                            judul: '',
                            ringkasan: '',
                            isi: "",
                            key: "",
                        }
                    })
                }}
                style={tw`bg-[#167270] rounded-full absolute bottom-[20px] right-[20px] h-12 w-12 flex justify-center items-center `}>
                <Text style={tw`text-white text-4xl font-bold`} >+</Text>
            </TouchableOpacity>
        </View >

    )
}

export default BeritaMerapi