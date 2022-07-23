import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, ScrollView, Dimensions, Image, Modal, TextInput, Alert, Button, StyleSheet } from "react-native"
import tw from "twrnc"
import { imageProfile } from "../../assets"
const { height, width } = Dimensions.get("window")
import ModalSelector from "react-native-modal-selector"
import { useDispatch, useSelector } from "react-redux"
import { loadKontak, RootState, addKontak, removeKontak, updateKontak } from "../../store"
import { PadukuhanType } from "../../store/types"
import { useIsFocused } from "@react-navigation/native"


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

const KontakDarurat = () => {
    const padukuhan = useSelector((state: RootState) => state.padukuhan.list)
    const kontakData = useSelector((state: RootState) => state.kontak.kontak)

    useEffect(() => {
        dispatch(loadKontak() as never)
    }, [useIsFocused])

    const listPadukuhanDropwdown = padukuhan.map((item: PadukuhanType) => {
        return {
            key: item.key,
            label: item.nama,
        }
    })

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
        setCurrentDataPadukuhan("")
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
            setCurrentDataPadukuhan(data?.dukuh || "")
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
                                kontakData.map((item: any, index: number) => {
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
                                                <Text style={tw`font-bold text-xl `}>{item?.nama}</Text>

                                                <View style={tw`flex flex-row`}>
                                                    <Text>{item?.keterangan} | </Text>
                                                    <Text>{item?.dukuh}</Text>
                                                </View>
                                                <Text>{item?.no_hp}</Text>

                                                <View style={tw`flex flex-row items-center mt-2`}>
                                                    <TouchableOpacity onPress={() => handleUpdate(item.key)} style={tw`px-2 py-2 border border-green-900 mr-[10px]`}>
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

            <Modal
                animationType={"fade"}
                transparent={false}
                visible={isVisible}
                onRequestClose={() => { console.log("Modal has been closed.") }}>
                {/*All views of Modal*/}
                <View style={tw`bg-white rounded-xl shadow relative dark:bg-gray-700 min-h-[550px] w-[80%] mx-auto mt-[80px]`}>
                    {/* <Text style={tw`absolute  inset-x-0  bottom-[20px]`}>Modal is open!</Text> */}
                    <View style={tw`bg-[#167270] rounded-t-xl h-[60px] p-[16px] flex flex-row absolute inset-x-0 top-0 justify-between`}>
                        <Text style={tw`text-white text-xl font-bold`}>{isEdit ? 'Update Kontak' : "Tambah Kontak"}</Text>
                        <TouchableOpacity onPress={() => setIsVisible(false)} style={tw`bg-white rounded-full h-[32px] w-[32px] rounded-full flex justify-center items-center`}>
                            <Text style={tw`text-[#167270] text-base font-bold`}>X</Text>
                        </TouchableOpacity>
                    </View>

                    {/* text area input  */}
                    <View style={tw` px-[18px] mt-[80px] mb-[20px]`}>
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

                        <Text style={tw`mb-2 mt-4 font-medium text-base`}>Nama Kontak</Text>
                        <TextInput
                            defaultValue={name}
                            onChangeText={(text) => setName(text)}
                            style={tw`border border-[#207729] rounded-xl px-[10px]`}
                            placeholder="Tulis nama kontak disini"
                        />

                        <Text style={tw`mb-2 mt-4 font-medium text-base`}>Nomor Telepon</Text>
                        <TextInput
                            defaultValue={phone}
                            onChangeText={(text) => setPhone(text)}
                            style={tw`border border-[#207729] rounded-xl px-[10px]`}
                            placeholder="Tulis nomor telepon disini"
                        />
                        <Text style={tw`mb-2 mt-4 font-medium text-base`}>Keterangan</Text>
                        <TextInput
                            defaultValue={profesi}
                            onChangeText={(text) => setProfesi(text)}
                            style={tw`border border-[#207729] rounded-xl px-[10px] justify-start `}
                            placeholder="Tulis jabatan/ptofesi kontak disini" />
                    </View>


                    <View style={tw`absolute rounded-xl inset-x-0 bottom-[10px] px-[20px]  `}>
                        <Button color={'#167270'} title={isEdit ? "Update" : "Tambah"} onPress={() => handleSubmitData()} />
                    </View>
                </View>
            </Modal>

            {/* button add card in bottom of screen */}
            <TouchableOpacity
                onPress={() => handleModal()}
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