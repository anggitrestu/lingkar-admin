import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, ScrollView, Modal, Button, TextInput, Alert, Dimensions } from "react-native"
import { IconTrash, IconArrowLeftWhite } from "../../assets";
import tw from 'twrnc';
import { RootStackParamList } from '../../navigation/KontakDaruratNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from "@react-navigation/native";
import { addInfo, RootState, getInfo, removeInfo, addBerita, updateBerita, updateKontak, addKontak } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextField } from "../../component";
import ModalSelector from "react-native-modal-selector";
import { camelCase } from "../../utils/string";
import { PadukuhanType } from "../../store/types";
const { height, width } = Dimensions.get('screen')


type Props = NativeStackScreenProps<RootStackParamList, 'UpdateKontakDarurat'>;

type dataBeritaProps = {
    key: string,
    title?: string,
    highlight?: string,
    body?: string,
    date?: string,
}


const UpdateKontakDarurat = ({ route, navigation }: Props) => {
    const dispatch = useDispatch();
    const padukuhan = useSelector((state: RootState) => state.padukuhan.list)
    const isEdit = route.params?.idEdit ?? false;
    const data = {
        key: route.params?.data?.key ?? '',
        dukuh: route.params?.data?.dukuh ?? '',
        nama: route.params?.data?.nama ?? '',
        no_hp: route.params?.data?.no_hp ?? '',
        keterangan: route.params?.data?.keterangan ?? '',
        dukuh_sebelumnya: route.params?.data?.dukuh_sebelumnya ?? '',
    }
    const [key, setKey] = useState(data.key)
    const [dukuh, setDukuh] = useState(data.dukuh)
    const [nama, setNama] = useState(data.nama)
    const [no_hp, setNo_hp] = useState(data.no_hp)
    const [keterangan, setKeterangan] = useState(data.keterangan)
    const [dukuh_sebelumnya, setDukuh_sebelumnya] = useState(data.dukuh_sebelumnya)

    const listPadukuhanDropwdown = padukuhan.map((item: PadukuhanType) => {
        return {
            key: item.key,
            label: camelCase(item.nama),
        }
    })

    const valodateInput = () => {
        if (dukuh === "" || nama === "" || no_hp === "" || keterangan === "") {
            Alert.alert("Error", "Semua field harus diisi")
            return false
        }
        return true
    }

    const onSubmit = () => {
        const valid = valodateInput()
        if (valid) {
            if (isEdit) {
                dispatch(updateKontak({
                    key,
                    dukuh,
                    nama,
                    no_hp,
                    keterangan,
                    dukuh_sebelumnya,
                }) as never)
                navigation.goBack()
            } else {
                dispatch(addKontak({
                    dukuh,
                    nama,
                    no_hp,
                    keterangan,
                }) as never)
                navigation.goBack()
            }
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <ScrollView style={tw`px-[24] mt-[24px]`}>
                <View style={tw`p-[12px] rounded-xl border border-[#207729] mb-[20px]`}>
                    <Text style={tw`text-base font-bold text-[#207729] text-center`}>{`${isEdit ? "Perbarui" : "Tambahkan"} Kontak Darurat`}</Text>
                </View>

                <Text style={tw`mb-2 mt-4 font-medium text-base`}>Padukuhan</Text>
                <ModalSelector
                    data={listPadukuhanDropwdown}
                    initValue="Pilih Lokasi Padukuhan Anda Saat ini"
                    supportedOrientations={['landscape']}
                    onChange={(option) => {
                        setDukuh(option.label as string);
                    }}
                    cancelButtonAccessible={true}
                    onTouchCancel={() => {
                        console.log("cancel")
                        setDukuh("");
                    }}
                >
                    <View style={tw`border border-[#207729] rounded-xl px-[10px] py-[15px]`}>
                        {
                            dukuh === "" ?
                                (
                                    <Text style={tw`text-left`}>
                                        Pilih Padukuhan
                                    </Text>
                                ) :
                                (
                                    <Text style={tw`text-left`}>
                                        {camelCase(dukuh)}
                                    </Text>
                                )

                        }
                    </View>

                </ModalSelector>
                {/* nama */}
                <TextField
                    label="Nama"
                    placeholder="Masukan nama kontak darurat"
                    value={nama}
                    onChangeText={(text) => setNama(text)}
                />

                {/* no hp */}
                <TextField
                    label="No HP"
                    keyboardType="numeric"
                    placeholder="Masukan no hp"
                    value={no_hp}
                    onChangeText={(text) => setNo_hp(text)}
                />

                {/* keterangan */}
                <TextField
                    label="Keterangan"
                    placeholder="Masukan jabatan/profesi kontak disini"
                    value={keterangan}
                    onChangeText={(text) => setKeterangan(text)}
                />







                <TouchableOpacity onPress={() => onSubmit()} style={tw`bg-[#167270]  flex justify-center items-center `}>
                    <Text style={tw`text-white text-base font-bold p-[10px] rounded-sm `} >{isEdit ? "Simpan" : "Tambah"}</Text>
                </TouchableOpacity>

                <View style={tw`mb-[100px]`}></View>
            </ScrollView>

        </View >
    )

}

export default UpdateKontakDarurat