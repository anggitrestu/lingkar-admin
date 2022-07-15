import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Modal, Button, TextInput, Alert } from "react-native"
import { IconTrash, IconArrowLeftWhite } from "../../assets";
import tw from 'twrnc';
import { RootStackParamList } from '../../navigation/InformasiStatusNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from "@react-navigation/native";
import { addInfo, getInfo, removeInfo } from "../../api/merapi";

type Props = NativeStackScreenProps<RootStackParamList, 'DetailStatus'>;

const DetailStatus = ({ route, navigation }: Props) => {

    const [isVisible, setIsVisible] = useState(false)
    const [infos, setInfos] = useState([])

    const [detail, setDetail] = useState("")

    const loadInfo = async () => {
        const result = await getInfo(route.params.status)
        setInfos(result as never)
    }

    useEffect(() => {
        loadInfo()
    }, [useIsFocused()])


    const confirmDeleteStatusDetail = (status: string, id: string) => {
        Alert.alert(
            'Hapus Informasi',
            'Apakah anda yakin ingin menghapus informasi ini?',
            [
                { text: 'Batal', style: 'cancel' },
                { text: 'OK', onPress: () => removeInfo(status, id).then(() => loadInfo()) },
            ],
            {
                cancelable: true,
            },
        )
    }


    const submitHandler = () => {
        // check if detail is empty
        if (detail === "") {
            Alert.alert("Informasi", "Informasi tidak boleh kosong")
            return
        }
        if (route.params.status && detail) {
            addInfo(route.params.status, detail)
                .then(() => {
                    loadInfo()
                    setIsVisible(false)
                })
                .catch(() => Alert.alert('Gagal menambahkan informasi'))
        }
        setDetail("")
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View style={tw`h-[56px] bg-[#167270]`}>
                <View style={tw`flex flex-row p-[16px]`}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconArrowLeftWhite width={20} height={20} />
                    </TouchableOpacity>
                    <View style={tw`flex-auto`}>
                        <Text style={tw`text-white font-bold text-xl text-center `}>
                            Detail Status
                        </Text>
                    </View>

                </View>
            </View>

            <ScrollView style={tw`p-[24px]`}>

                <View style={tw`px-[12px] py-[24px] ${route.params.color}/10 rounded-xl border border-[#207729] mb-[20px]`}>
                    <Text style={tw`text-2xl font-bold text-[#207729] text-center`}>{route.params.status}</Text>
                </View>

                {
                    infos?.length > 0 ?
                        (
                            infos.map((item: any, index: number) => {
                                return (
                                    <View key={index} style={tw`flex flex-row min-h-[50px] w-full pr-[10px] mb-[15px]`}>
                                        <TouchableOpacity onPress={() => confirmDeleteStatusDetail(route.params.status, item?.key)}>
                                            <IconTrash width={32} height={32} />
                                        </TouchableOpacity>
                                        <Text style={tw`font-medium text-base text-justify`} >{item?.info}</Text>
                                    </View>
                                )
                            }
                            )
                        ) : (
                            <View style={tw`flex flex-row min-h-[50px] w-full pr-[10px] mb-[15px]`}>
                                <Text style={tw`font-medium text-base text-justify`} >Silahkan Tambah Data Terlebih Dahulu</Text>
                            </View>
                        )
                }

            </ScrollView>

            <Modal
                animationType={"fade"}
                transparent={true}
                visible={isVisible}
            >
                {/*All views of Modal*/}
                <View style={tw`bg-white rounded-xl shadow relative dark:bg-gray-700 h-[400px] w-[80%] mx-auto mt-[140px]`}>
                    {/* <Text style={tw`absolute  inset-x-0  bottom-[20px]`}>Modal is open!</Text> */}
                    <View style={tw`bg-[#167270] rounded-t-xl h-[60px] p-[16px] flex flex-row absolute inset-x-0 top-0 justify-between`}>
                        <Text style={tw`text-white text-xl font-bold`}>Tambah detail status</Text>
                        <TouchableOpacity onPress={() => setIsVisible(false)} style={tw`bg-white rounded-full h-[32px] w-[32px] rounded-full flex justify-center items-center`}>
                            <Text style={tw`text-[#167270] text-base font-bold`}>X</Text>
                        </TouchableOpacity>
                    </View>

                    {/* text area input  */}
                    <View style={tw` px-[18px] mt-[80px]`}>
                        <TextInput
                            onChangeText={(text) => setDetail(text)}
                            multiline={true}
                            numberOfLines={4}
                            style={tw`border border-[#207729] rounded-xl px-[10px]`} placeholder="Tulis detail status disini" />
                    </View>


                    <View style={tw`absolute rounded-xl inset-x-0 bottom-[10px] px-[20px]  `}>

                        <Button color={'#167270'} title="Tambah" onPress={() => {

                            submitHandler()
                        }} />
                    </View>
                </View>
            </Modal>

            {/* button add card in bottom of screen */}
            <TouchableOpacity onPress={() => setIsVisible(true)} style={tw`bg-[#167270] rounded-full absolute bottom-[20px] right-[20px] h-12 w-12 flex justify-center items-center `}>
                <Text style={tw`text-white text-4xl font-bold`} >+</Text>
            </TouchableOpacity>

        </View >
    )

}

export default DetailStatus