import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, ScrollView, Alert, Dimensions } from "react-native"
import { IconArrowLeftWhite } from "../../assets";
import tw from 'twrnc';
import { RootStackParamList } from '../../navigation/JalurEvakuasiNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from "@react-navigation/native";
import { RootState, } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextField } from "../../component";
import { ruteService } from "../../services";
import { getSelectRute, loadRuteByDukuh } from "../../store/actions/rute.action";


type Props = NativeStackScreenProps<RootStackParamList, 'UpdateJalurEvakuasi'>;


const UpdateJalurEvakuasi = ({ route, navigation }: Props) => {
    const dispatch = useDispatch();
    const dukuh = useSelector((state: RootState) => state.padukuhan.selected)
    const isEdit = route.params?.isEdit;
    const tipeRute = useSelector((state: RootState) => state.rute.selected)
    const [nama, setNama] = useState(route.params?.data?.nama);
    const [deskripsi, setDeskripsi] = useState(route.params?.data?.deskripsi);
    const [latitude, setLatitude] = useState(route.params?.data?.latitude);
    const [longitude, setLongitude] = useState(route.params?.data?.longitude);


    const validateForm = () => {
        if (nama === "" || deskripsi === "" || latitude === "" || longitude === "" || tipeRute === "" || dukuh === "") {
            Alert.alert("Form tidak boleh kosong")
            return false
        }
        return true
    }

    const onSubmit = () => {
        try {
            if (validateForm()) {
                if (isEdit) {
                    ruteService.updateRute({
                        dukuh: dukuh,
                        tipe: tipeRute,
                        nama: nama,
                        deskripsi: deskripsi,
                        latitude: latitude,
                        longitude: longitude,
                        key: route.params?.data?.key
                    })
                        .then(() => {
                            Alert.alert("Berhasil diubah")
                            dispatch(loadRuteByDukuh({ dukuh: dukuh }) as never)
                            navigation.goBack()
                        }).catch(() => {
                            Alert.alert("Gagal")
                        }
                        )
                } else {
                    ruteService.addRute({
                        dukuh: dukuh,
                        tipe: tipeRute,
                        nama: nama,
                        deskripsi: deskripsi,
                        latitude: latitude,
                        longitude: longitude
                    }).
                        then(() => {
                            Alert.alert("Berhasil menambahkan rute")
                            dispatch(loadRuteByDukuh({ dukuh: dukuh }) as never)
                            navigation.goBack()
                        })
                }
            }
        } catch (error) {
            console.log("error", error)
        }
    }


    const handleDelete = ({
        dukuh, tipe, key
    }: {
        dukuh: string, tipe: string, key: string
    }) => {
        Alert.alert("Apakah anda yakin mengahapus rute ini?",
            "",
            [
                { text: "Tidak", style: "cancel" },
                {
                    text: "Ya", onPress: () => {
                        ruteService.deleteRute({ dukuh, tipe, key })
                            .then(() => {
                                Alert.alert("Berhasil menghapus rute")
                                dispatch(loadRuteByDukuh({ dukuh: dukuh }) as never)
                                navigation.goBack()
                            }).catch((error) => {
                                console.log("error", error)
                            }).finally(() => {
                                console.log("succes deleted")
                            }
                            )
                    }
                }
            ])
    }

    useEffect(() => {
        dispatch(getSelectRute() as never)
    }, [useIsFocused])


    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={tw`bg-[#167270] flex flex-row items-center `}>
                <TouchableOpacity style={tw`w-[40px] h-[32px] justify-center px-[22px]`} onPress={() => navigation.goBack()} >
                    <IconArrowLeftWhite />
                </TouchableOpacity>
                <Text style={tw`ml-[24px] text-white font-bold text-xl py-[10px]`}>{`${isEdit ? "Perbarui" : "Tambah"} Jalur Evakuasi`}</Text>
            </View>
            <ScrollView style={tw`px-[24] mt-[24px]`}>
                <TextField
                    label="Padukuhan"
                    editable={false}
                    value={dukuh}
                />

                <TextField
                    label="Tipe Rute"
                    editable={false}
                    value={tipeRute}
                />

                <TextField
                    label="Nama Lokasi"
                    placeholder="Masukan nama lokasi jalur evakuasi"
                    value={nama}
                    onChangeText={(text) => setNama(text)}
                />

                <TextField
                    label="Keterangan"
                    placeholder="Masukan keterangan jalur evakuasi"
                    value={deskripsi}
                    onChangeText={(text) => setDeskripsi(text)}
                />

                <TextField
                    label="Koordinat Lintang"
                    keyboardType="numeric"
                    placeholder="Dalam derajat desimal"
                    value={latitude}
                    onChangeText={(text) => setLatitude(text)}
                />

                <TextField
                    label="Koordinat Bujur"
                    keyboardType="numeric"
                    placeholder="Dalam derajat desimal"
                    value={longitude}
                    style={tw`mb-[10px]`}
                    onChangeText={(text) => setLongitude(text)}
                />

                <TouchableOpacity onPress={() => onSubmit()} style={tw`bg-[#167270]  flex justify-center items-center my-[20px] rounded-xl `}>
                    <Text style={tw`text-white text-base font-bold p-[10px] rounded-sm `} >{isEdit ? "Simpan" : "Tambah"}</Text>
                </TouchableOpacity>

                {
                    isEdit &&
                    (
                        <TouchableOpacity onPress={() => handleDelete({ dukuh: dukuh, key: route.params.data.key, tipe: tipeRute })} style={tw`bg-red-800  flex justify-center items-center rounded-xl `}>
                            <Text style={tw`text-white text-base font-bold p-[10px] rounded-sm `} >Hapus</Text>
                        </TouchableOpacity>
                    )
                }


                <View style={tw`mb-[100px]`}></View>
            </ScrollView>

        </View >
    )

}

export default UpdateJalurEvakuasi