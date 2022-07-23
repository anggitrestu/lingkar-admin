import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, ScrollView, Modal, Button, TextInput, Alert, Dimensions } from "react-native"
import { IconTrash, IconArrowLeftWhite } from "../../assets";
import tw from 'twrnc';
import { RootStackParamList } from '../../navigation/BeritaMerapiNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from "@react-navigation/native";
import { addInfo, RootState, getInfo, removeInfo, addBerita, updateBerita } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextField } from "../../component";
const { height, width } = Dimensions.get('screen')


type Props = NativeStackScreenProps<RootStackParamList, 'TambahBeritaMerapi'>;

type dataBeritaProps = {
    key: string,
    title?: string,
    highlight?: string,
    body?: string,
    date?: string,
}


const TambahBeritaMerapi = ({ route, navigation }: Props) => {
    const dispatch = useDispatch();
    const isEdit = route.params?.idEdit ?? false;
    const data = {
        key: route.params?.data?.key ?? '',
        judul: route.params?.data?.judul ?? '',
        ringkasan: route.params?.data?.ringkasan ?? '',
        isi: route.params?.data?.isi ?? '',
    }
    const [key, setKey] = useState(data.key)
    const [judul, setJudul] = useState(data.judul)
    const [ringkasan, setRingkasan] = useState(data.ringkasan)
    const [isiBerita, setIsiBerita] = useState(data.isi)



    const handleTambahBerita = (judul: string, ringkasan: string, isiBerita: string,) => {
        if (judul === "" || ringkasan === "" || isiBerita === "") {
            Alert.alert("Data tidak boleh kosong")
            return
        }
        if (isEdit) {
            dispatch(updateBerita({ key: key, judul: judul, konten: isiBerita, ringkasan: ringkasan }) as never)
            navigation.goBack()
            clearForm()
        } else {
            dispatch(addBerita({ judul, ringkasan, konten: isiBerita }) as never)
            navigation.goBack()
            clearForm()

        }
    }

    const clearForm = () => {
        setJudul("")
        setRingkasan("")
        setIsiBerita("")
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
  
            <View style={tw`bg-[#167270] flex flex-row items-center `}>
                <TouchableOpacity style={tw`w-[40px] h-[32px] justify-center px-[22px]`} onPress={() => navigation.goBack()} >
                    <IconArrowLeftWhite />
                </TouchableOpacity>
                <Text style={tw`ml-[24px] text-white font-bold text-xl py-[10px]`}>{`${isEdit ? "Perbarui" : "Tambahkan"} Berita`}</Text>
            </View>
            
            <ScrollView style={tw`px-[24] mt-[8px]`}>
                {/* judul */}
                <TextField
                    label="Judul"
                    value={judul}
                    onChangeText={(text) => setJudul(text)}
                    multiline={true}
                />
                {/* ringkasan */}
                <TextField
                    label="Ringkasan"
                    value={ringkasan}
                    onChangeText={(text) => setRingkasan(text)}
                    multiline={true}
                />
                {/* isi berita */}
                <TextField
                    label="Isi Berita"
                    value={isiBerita}
                    onChangeText={(text) => setIsiBerita(text)}
                    multiline={true}
                    numberOfLines={10}
                    textAlignVertical="top"
                    style={{ minHeight: height * 0.3, justifyContent: 'flex-start' }}
                />

                <TouchableOpacity onPress={() => handleTambahBerita(judul, ringkasan, isiBerita)} style={tw`bg-[#167270] rounded-xl flex justify-center items-center my-[20px]`}>
                    <Text style={tw`text-white text-base font-bold p-[10px] `} >{isEdit ? "Simpan" : "Tambah"}</Text>
                </TouchableOpacity>

                <View style={tw`mb-[100px]`}></View>
            </ScrollView>

        </View >
    )

}

export default TambahBeritaMerapi