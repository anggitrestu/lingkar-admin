import React, { useState, useEffect } from "react"
import { Text, View, TouchableOpacity, TextInput, Modal, ScrollView, Alert } from "react-native"
import { IconWarning, IconTrash } from "../../assets";
import tw from 'twrnc';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/InformasiStatusNavigation";
import ModalSelector from "react-native-modal-selector";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store"
import { PadukuhanType } from "../../store/types";
import { useIsFocused } from "@react-navigation/native";
import { loadRute } from "../../store/actions/rute.action";
import { merapiService, ruteService } from "../../services";


const JalurEvakuasi = () => {

    const [isVisible, setIsVisible] = useState(false);
    const padukuhan = useSelector((state: RootState) => state.padukuhan.list)
    const rute = useSelector((state: RootState) => state.rute.rute)
    // console.log("rute action", rute)
    const listPadukuhanDropwdown = padukuhan.map((item: PadukuhanType) => {
        return {
            key: item.key,
            label: item.nama,
        }
    })

    const listTipeRuteDropwdown = [
        {
            key: "1",
            label: "Titik Kumpul",
            name: "titik_kumpul"
        },
        {
            key: "2",
            label: "Pengungsian",
            name: "pengungsian"
        }
    ]

    const dispatch = useDispatch()
    // state untuk menyimpan data yang akan diinputkan
    const [currentDataPadukuhan, setCurrentDataPadukuhan] = useState("");
    const [currentDataTipeRute, setCurrentDataTipeRute] = useState("");
    const [nama, setNama] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const clearForm = () => {
        setCurrentDataPadukuhan("");
        setCurrentDataTipeRute("");
        setNama("");
        setDeskripsi("");
        setLatitude("");
        setLongitude("");
    }

    const validateForm = () => {
        if (nama === "" || deskripsi === "" || latitude === "" || longitude === "" || currentDataPadukuhan === "" || currentDataTipeRute === "") {
            Alert.alert("Form tidak boleh kosong")
            return false
        }
        return true
    }

    const handleSubmit = () => {
        try {
            if (validateForm()) {
                ruteService.addRute({ dukuh: currentDataPadukuhan, tipe: currentDataTipeRute, nama, deskripsi, latitude, longitude })
                    .then(() => {
                        Alert.alert("Berhasil menambahkan rute")
                        setIsVisible(false)
                        dispatch(loadRute(padukuhan) as never)
                        clearForm()
                    })
                    .catch((error) => {
                        console.log("error", error)
                    })
                    .finally(() => {
                        setIsVisible(false)
                    })
            }
        }
        catch (error) {
            console.log("error", error)
        }
    }

    const handleDelete = ({
        dukuh, tipe, key
    }: {
        dukuh: string, tipe: string, key: string
    }) => {
        Alert.alert("Apakah anda yakin?", "", [
            { text: "Tidak", style: "cancel" },
            {
                text: "Ya", onPress: () => {
                    ruteService.deleteRute({ dukuh, tipe, key })
                        .then(() => {
                            Alert.alert("Berhasil menghapus rute")
                            dispatch(loadRute(padukuhan) as never)
                        }).catch((error) => {
                            console.log("error", error)
                        }).finally(() => {
                            setIsVisible(false)
                        }
                        )
                }
            }
        ])
    }

    useEffect(() => {
        console.log("useEffect")
        dispatch(loadRute(padukuhan) as never)
    }, [useIsFocused()])


    return (
        <View style={{ flex: 1 }}>
            <View style={tw`px-[24px] my-[24px]`}>
                <ScrollView>
                    {
                        rute.pengungsian.length > 0
                        &&
                        rute.pengungsian.map((item, index) => {
                            return (
                                <View style={tw`flex flex-row shadow-sm rounded-xl py-[12px] px-[16px] bg-white mb-[10px]`} key={index}>
                                    <TouchableOpacity
                                        onPress={() => handleDelete({ dukuh: item.dukuh, tipe: item.tipe, key: item.key })}
                                        style={tw`mr-4 flex justify-start`}>
                                        <IconTrash width={30} height={30} />
                                    </TouchableOpacity>
                                    <View style={tw`flex-1`}>
                                        <View style={tw`flex flex-row items-center justify-between`}>
                                            <Text style={tw`font-bold text-gray-700 text-xl`}>
                                                {item.nama}
                                            </Text>
                                            <Text style={tw`font-medium text-blue-500`}>
                                                Buka Peta
                                            </Text>
                                        </View>
                                        <Text style={tw`font-medium text-black text-base mt-2`}>
                                            {item.deskripsi}
                                        </Text>
                                        <View style={tw`flex flex-row`}>
                                            <Text style={tw`font-medium text-black text-sm mt-1 mr-4`}>
                                                {item.latitude}
                                            </Text>
                                            <Text style={tw`font-medium text-black text-sm mt-1`}>
                                                {item.longitude}
                                            </Text>
                                        </View>
                                        <View style={tw`flex flex-row`}>
                                            <Text style={tw`font-medium text-sm mt-1 mr-4`}>
                                                {item.dukuh}
                                            </Text>
                                            <Text style={tw`font-medium text-sm mt-1`}>
                                                {item.tipe}
                                            </Text>
                                        </View>

                                    </View>
                                </View>
                            )
                        })
                    }

                    {
                        rute.titik_kumpul.length > 0
                        &&
                        rute.titik_kumpul.map((item, index) => {
                            return (
                                <View style={tw`flex flex-row shadow-sm rounded-xl py-[12px] px-[16px] bg-white mb-[10px]`} key={index}>
                                    <TouchableOpacity
                                        onPress={() => handleDelete({ dukuh: item.dukuh, tipe: item.tipe, key: item.key })}
                                        style={tw`mr-4 flex justify-start`}>
                                        <IconTrash width={30} height={30} />
                                    </TouchableOpacity>
                                    <View style={tw`flex-1`}>
                                        <View style={tw`flex flex-row items-center justify-between`}>
                                            <Text style={tw`font-bold text-gray-700 text-xl`}>
                                                {item.nama}
                                            </Text>
                                            <Text style={tw`font-medium text-blue-500`}>
                                                Buka Peta
                                            </Text>
                                        </View>
                                        <Text style={tw`font-medium text-black text-base mt-2`}>
                                            {item.deskripsi}
                                        </Text>
                                        <View style={tw`flex flex-row`}>
                                            <Text style={tw`font-medium text-black text-sm mt-1 mr-4`}>
                                                {item.latitude}
                                            </Text>
                                            <Text style={tw`font-medium text-black text-sm mt-1`}>
                                                {item.longitude}
                                            </Text>
                                        </View>
                                        <View style={tw`flex flex-row`}>
                                            <Text style={tw`font-medium text-black text-sm mt-1 mr-4`}>
                                                {item.dukuh}
                                            </Text>
                                            <Text style={tw`font-medium text-black text-sm mt-1`}>
                                                {item.tipe}
                                            </Text>
                                        </View>

                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>

            </View>


            <Modal
                animationType={"fade"}
                transparent={false}
                visible={isVisible}
            >
                <ScrollView>
                    <View style={tw`rounded-xl shadow w-[80%] mx-auto mt-[50px] bg-white`}>
                        <View style={tw`bg-[#167270] rounded-t-xl min-h-[60px] p-[16px] flex flex-row absolute inset-x-0 top-0 justify-between`}>
                            <Text style={tw`text-white text-xl font-bold`}>{"Tambah Rute"}</Text>
                            <TouchableOpacity onPress={() => setIsVisible(false)} style={tw`bg-white rounded-full h-[32px] w-[32px] rounded-full flex justify-center items-center`}>
                                <Text style={tw`text-[#167270] text-base font-bold`}>X</Text>
                            </TouchableOpacity>
                        </View>

                        {/* text area input  */}
                        <View style={tw`px-[18px] mt-[50px] mb-[60px] bg-white `}>
                            <Text style={tw`mb-2 mt-4 font-medium text-base`}>Padukuhan</Text>
                            <ModalSelector
                                data={listPadukuhanDropwdown}
                                initValue="Pilih Lokasi Padukuhan Anda Saat ini"
                                supportedOrientations={['landscape']}
                                onChange={(option) => {
                                    setCurrentDataPadukuhan(option.label as string);
                                }}
                                cancelButtonAccessible={true}
                                onTouchCancel={() => {
                                    console.log("cancel")
                                    setCurrentDataPadukuhan("");
                                }}
                            >
                                <View style={tw`border border-[#207729] rounded-xl px-[10px] py-[15px]`}>
                                    {
                                        currentDataPadukuhan === "" ?
                                            (
                                                <Text style={tw`text-left`}>
                                                    Pilih Padukuhan
                                                </Text>
                                            ) :
                                            (
                                                <Text style={tw`text-left`}>
                                                    {currentDataPadukuhan}
                                                </Text>
                                            )

                                    }
                                </View>

                            </ModalSelector>

                            <Text style={tw`mb-2 mt-4 font-medium text-base`}>Tipe Rute</Text>
                            <ModalSelector
                                data={listTipeRuteDropwdown}
                                initValue="Pilih Lokasi Padukuhan Anda Saat ini"
                                supportedOrientations={['landscape']}
                                onChange={(option) => {
                                    setCurrentDataTipeRute(option.name as string);
                                }}
                                cancelButtonAccessible={true}
                                onTouchCancel={() => {
                                    console.log("cancel")
                                    setCurrentDataTipeRute("");
                                }}
                            >
                                <View style={tw`border border-[#207729] rounded-xl px-[10px] py-[15px]`}>
                                    {
                                        currentDataTipeRute === "" ?
                                            (
                                                <Text style={tw`text-left`}>
                                                    Pilih Tipe Rute
                                                </Text>
                                            ) :
                                            (
                                                <Text style={tw`text-left`}>
                                                    {currentDataTipeRute}
                                                </Text>
                                            )
                                    }
                                </View>

                            </ModalSelector>

                            <Text style={tw`mb-2 mt-4 font-medium text-base`}>Nama tempat</Text>
                            <TextInput
                                // defaultValue={nama}
                                onChangeText={(text) => setNama(text)}
                                style={tw`border border-[#207729] rounded-xl px-[10px]`}
                                placeholder="Tulis nama tempat disini"
                            />

                            <Text style={tw`mb-2 mt-4 font-medium text-base`}>Deskripsi</Text>
                            <TextInput
                                // defaultValue={deskripsi}
                                onChangeText={(text) => setDeskripsi(text)}
                                style={tw`border border-[#207729] rounded-xl px-[10px]`}
                                placeholder="Tulis deskripsi disini"
                            />
                            <Text style={tw`mb-2 mt-4 font-medium text-base`}>Latitude</Text>
                            <TextInput
                                // defaultValue={profesi}
                                onChangeText={(text) => setLatitude(text)}
                                style={tw`border border-[#207729] rounded-xl px-[10px] justify-start `}
                                placeholder="Tulis longitude disini" />
                            <Text style={tw`mb-2 mt-4 font-medium text-base`}>Longitude</Text>
                            <TextInput
                                // defaultValue={profesi}
                                onChangeText={(text) => setLongitude(text)}
                                style={tw`border border-[#207729] rounded-xl px-[10px] justify-start `}
                                placeholder="Tulis jabatan/ptofesi kontak disini" />
                        </View>

                        <TouchableOpacity onPress={() => handleSubmit()} style={tw`absolute inset-x-0 bottom-[10px]`}>
                            <View style={tw` bg-[#167270] py-[7px] rounded-full flex justify-center items-center`}>
                                <Text style={tw`font-medium text-base text-center text-white`}>Tambah</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </Modal>


            <TouchableOpacity
                onPress={() => {
                    // handleSubmit()
                    setIsVisible(true)
                }}
                style={tw`bg-[#167270] rounded-full absolute bottom-[20px] right-[20px] h-12 w-12 flex justify-center items-center `}>
                <Text style={tw`text-white text-4xl font-bold`} >+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default JalurEvakuasi;