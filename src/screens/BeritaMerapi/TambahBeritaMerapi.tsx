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

    const [isVisible, setIsVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const [judul, setJudul] = useState("")
    const [ringkasan, setRingkasan] = useState("")
    const [isiBerita, setIsiBerita] = useState("")


    const [currentData, setCurrentData] = useState<dataBeritaProps>({
        key: "",
        title: "",
        body: "",
        date: "",
        highlight: "",
    })

    const handleTambahBerita = (judul: string, ringkasan: string, isiBerita: string,) => {
        if (judul === "" || ringkasan === "" || isiBerita === "") {
            Alert.alert("Data tidak boleh kosong")
            return
        }
        if (isEdit) {
            dispatch(updateBerita({ key: currentData.key, judul: judul, konten: isiBerita, ringkasan: ringkasan }) as never)
            setIsEdit(false)
            setIsVisible(false)
            clearForm()
        } else {
            const data = {
                judul: judul,
                ringkasan: ringkasan,
                konten: isiBerita
            }

            dispatch(addBerita({ judul, ringkasan, konten: isiBerita }) as never)
            navigation.goBack()
            clearForm()

        }
    }

    const clearForm = () => {
        setJudul("")
        setRingkasan("")
        setIsiBerita("")
        setCurrentData({
            key: "",
            title: "",
            body: "",
            date: "",
        })
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <ScrollView style={tw`px-[24] mt-[24px]`}>
                <View style={tw`p-[12px] rounded-xl border border-[#207729] mb-[20px]`}>
                    <Text style={tw`text-base font-bold text-[#207729] text-center`}>{`Tambahkan Berita Merapi`}</Text>
                </View>

                {/* <TextField
                    label="Detail Status"
                    value={detail}
                    onChangeText={(text) => setDetail(text)}
                    multiline={true}
                /> */}

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
                    style={{ minHeight: height * 0.5, justifyContent: 'flex-start' }}
                />

                <TouchableOpacity onPress={() => handleTambahBerita(judul, ringkasan, isiBerita)} style={tw`bg-[#167270]  flex justify-center items-center `}>
                    <Text style={tw`text-white text-base font-bold p-[10px] rounded-sm `} >Tambah</Text>
                </TouchableOpacity>

                <View style={tw`mb-[100px]`}></View>
            </ScrollView>

        </View >
    )

}

export default TambahBeritaMerapi