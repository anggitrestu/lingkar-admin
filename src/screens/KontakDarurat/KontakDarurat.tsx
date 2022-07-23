import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, ScrollView, Dimensions, Image, Modal, TextInput, Alert, Button, StyleSheet } from "react-native"
import tw from "twrnc"
import { imageProfile } from "../../assets"
const { height, width } = Dimensions.get("window")
import ModalSelector from "react-native-modal-selector"
import { useDispatch, useSelector } from "react-redux"
import { loadKontak, RootState, addKontak, removeKontak, updateKontak } from "../../store"
import { PadukuhanType } from "../../store/types"
import { useIsFocused } from "@react-navigation/native"
import { Text } from "../../component"
import { RootStackParamList } from "../../navigation/KontakDaruratNavigation"
import { NativeStackScreenProps } from "@react-navigation/native-stack"


type kontakDaruratType = {
    key?: string
    dukuh?: string,
    name?: string
    phone?: string
    profesi?: string
}

const defaultCurrentState: kontakDaruratType = {
    key: "",
    dukuh: "",
    name: "",
    phone: "",
    profesi: "",
}

type Props = NativeStackScreenProps<RootStackParamList, 'UpdateKontakDarurat'>;


const KontakDarurat = ({ navigation }: Props) => {

    const kontakData = useSelector((state: RootState) => state.kontak.kontak)

    useEffect(() => {
        dispatch(loadKontak() as never)
    }, [useIsFocused])



    const [isVisible, setIsVisible] = useState(false)
    const [isEdit, setIsEdit] = useState(false)

    const dispatch = useDispatch()

    // state form input
    const [currentDataPadukuhan, setCurrentDataPadukuhan] = useState("");
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [profesi, setProfesi] = useState("")
    const [dukuhSebelumnya, setDukuhSebelumnya] = useState("")

    const validateInput = () => {
        if (name === "" || currentDataPadukuhan === "" || phone === "" || profesi === "") {
            Alert.alert("Data tidak boleh kosong")
            return false
        }
        return true
    }

    const clearForm = () => {

        ("")
        setName("")
        setPhone("")
        setProfesi("")
        setDukuhSebelumnya("")
        setCurrentData(defaultCurrentState)
    }

    const [currentData, setCurrentData] = useState<kontakDaruratType>(defaultCurrentState)
    const handleModal = () => {
        clearForm()
        setIsEdit(false)
        setIsVisible(true)
    }

    const handleRemove = (dukuh: string, key: string) => {
        Alert.alert(
            'Hapus Informasi',
            'Apakah anda yakin ingin menghapus informasi ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        dispatch(removeKontak({ dukuh, key }) as never)
                        clearForm()
                        setIsVisible(false)
                    }
                },
            ],
            {
                cancelable: true,
            },
        )

    }


    const handleUpdate = (key: string) => {
        setIsVisible(true)
        const data = kontakData.find((item: any) => item.key === key)
        if (data) {

            (data?.dukuh || "")
            setDukuhSebelumnya(data.dukuh)
            setName(data.nama)
            setPhone(data.no_hp)
            setProfesi(data.keterangan)
            setCurrentData(data)
        }
        setIsEdit(true)
    }

    const handleSubmitData = () => {
        const valid = validateInput()
        if (valid) {
            if (isEdit) {
                dispatch(updateKontak({
                    key: currentData.key,
                    dukuh: currentDataPadukuhan,
                    nama: name,
                    no_hp: phone,
                    keterangan: profesi,
                    dukuh_sebelumnya: dukuhSebelumnya,
                }) as never)
                setIsVisible(false)
                clearForm()

            } else {

                const data = {
                    dukuh: currentDataPadukuhan,
                    nama: name,
                    no_hp: phone,
                    keterangan: profesi,
                }
                dispatch(addKontak(data) as never)
                setIsVisible(false)
                clearForm()

            }
        }
    }

    return (
        <View style={{
            flex: 1
        }}>
            <View style={tw`p-[24px]`}>
                <ScrollView>
                    {
                        kontakData.length > 0 ?
                            (
                                kontakData.map((item, index: number) => {
                                    return (
                                        <View key={index} style={tw`p-[14px] flex flex-row items-center bg-white shadow-sm mb-[15px]`}>
                                            <View style={tw``}>
                                                <Image source={imageProfile as never} style={{
                                                    resizeMode: "contain",
                                                    width: 60,
                                                    height: 60,
                                                }} />
                                            </View>

                                            <View style={tw`flex-1 ml-4`}>
                                                <Text style={tw`font-bold text-xl text-black `}>{item?.nama}</Text>
                                                <View style={tw`flex flex-row`}>
                                                    <Text>{item?.keterangan} | </Text>
                                                    <Text>{item?.dukuh}</Text>
                                                </View>
                                                <Text>{item?.no_hp}</Text>

                                                <View style={tw`flex flex-row items-center mt-2`}>
                                                    <TouchableOpacity onPress={() =>
                                                        navigation.navigate('UpdateKontakDarurat', {
                                                            idEdit: true,
                                                            data: {
                                                                key: item.key,
                                                                dukuh: item.dukuh,
                                                                nama: item.nama,
                                                                no_hp: item.no_hp,
                                                                keterangan: item.keterangan,
                                                                dukuh_sebelumnya: item.dukuh,
                                                            }
                                                        })
                                                    } style={tw`px-2 py-2 border border-green-900 mr-[10px]`}>
                                                        <Text style={tw`text-base font-medium text-[#167270]`} >Ubah Data</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity onPress={() => handleRemove(item.dukuh, item.key)} style={tw`px-2 py-2 border border-red-900`}>
                                                        <Text style={tw`text-base font-medium text-[#F53319]`} >Hapus Data</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            ) : null
                    }
                </ScrollView>
            </View>

            {/* button add card in bottom of screen */}
            <TouchableOpacity
                onPress={() => navigation.navigate("UpdateKontakDarurat", {
                    idEdit: false,
                    data: {
                        nama: "",
                        no_hp: "",
                        keterangan: "",
                        dukuh: "",
                        dukuh_sebelumnya: "",
                        key: ""
                    }
                })}
                style={tw`bg-[#167270] rounded-full absolute bottom-[20px] right-[20px] h-12 w-12 flex justify-center items-center `}>
                <Text style={tw`text-white text-4xl font-bold`} >+</Text>
            </TouchableOpacity>
        </View>
    )
}

export default KontakDarurat

const styles = StyleSheet.create({
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
})