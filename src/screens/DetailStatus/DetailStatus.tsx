import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, ScrollView, Modal, Button, TextInput, Alert, Dimensions } from "react-native"
import { IconTrash, IconArrowLeftWhite } from "../../assets";
import tw from 'twrnc';
import { RootStackParamList } from '../../navigation/InformasiStatusNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from "@react-navigation/native";
import { addInfo, RootState, getInfo, removeInfo } from "../../store";
import { useDispatch, useSelector } from "react-redux";
const { height, width } = Dimensions.get('screen')


type Props = NativeStackScreenProps<RootStackParamList, 'DetailStatus'>;

const DetailStatus = ({ route, navigation }: Props) => {
    const dispatch = useDispatch();
    const info = useSelector((state: RootState) => state.merapi.infos);
    const [isVisible, setIsVisible] = useState(false)
    const [detail, setDetail] = useState("")

    useEffect(() => {
        dispatch(getInfo(route.params.status) as never)
    }, [useIsFocused])


    const confirmDeleteStatusDetail = (status: string, key: string) => {
        Alert.alert(
            'Hapus Informasi',
            'Apakah anda yakin ingin menghapus informasi ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'OK', onPress: () =>
                        dispatch(removeInfo({ status, key }) as never)
                },
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
            dispatch(addInfo({ status: route.params.status, info: detail }) as never)
            setIsVisible(false)
            // .then(() => {
            //     loadInfo()
            // })
            // .catch(() => Alert.alert('Gagal menambahkan informasi'))
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

            <ScrollView style={tw`px-[24] mt-[24px]`}>
                <View style={tw`px-[12px] py-[24px] ${route.params.color}/10 rounded-xl border border-[#207729] mb-[20px]`}>
                    <Text style={tw`text-2xl font-bold text-[#207729] text-center`}>{route.params.status}</Text>
                </View>
                {
                    info?.length > 0 ?
                        (
                            info.map((item: any, index: number) => {
                                return (
                                    <View key={index} style={tw`flex flex-row min-h-[50px] mb-[15px]`}>
                                        <TouchableOpacity onPress={() => confirmDeleteStatusDetail(route.params.status, item?.key)}>
                                            <IconTrash width={32} height={32} />
                                        </TouchableOpacity>
                                        <Text style={tw`font-medium w-[${width * 0.8}px] text-left text-base text-black`} >{item?.info}</Text>
                                    </View>
                                )
                            }
                            )
                        ) : (
                            <View style={tw`flex flex-row min-h-[50px] w-full pr-[10px] mb-[15px]`}>
                                <Text style={tw`font-medium text-base text-justify text-black`} >Silahkan Tambah Data Terlebih Dahulu</Text>
                            </View>
                        )
                }

                <View style={tw`mb-[100px]`}></View>
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
            <TouchableOpacity onPress={() =>
                navigation.navigate('TambahDetailStatus', { status: route.params.status })
            } style={tw`bg-[#167270] rounded-full absolute bottom-[20px] right-[20px] h-12 w-12 flex justify-center items-center `}>
                <Text style={tw`text-white text-4xl font-bold`} >+</Text>
            </TouchableOpacity>

        </View >
    )

}

export default DetailStatus