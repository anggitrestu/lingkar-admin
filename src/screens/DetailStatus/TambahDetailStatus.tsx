import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, ScrollView, Modal, Button, TextInput, Alert, Dimensions } from "react-native"
import { IconTrash, IconArrowLeftWhite } from "../../assets";
import tw from 'twrnc';
import { RootStackParamList } from '../../navigation/InformasiStatusNavigation'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useIsFocused } from "@react-navigation/native";
import { addInfo, RootState, getInfo, removeInfo } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { Text, TextField } from "../../component";
const { height, width } = Dimensions.get('screen')


type Props = NativeStackScreenProps<RootStackParamList, 'TambahDetailStatus'>;

const TambahDetailStatus = ({ route, navigation }: Props) => {
    const dispatch = useDispatch();
    const [detail, setDetail] = useState("")



    const submitHandler = () => {
        // check if detail is empty
        if (detail === "") {
            Alert.alert("Informasi", "Informasi tidak boleh kosong")
            return
        }
        if (route.params.status && detail) {
            dispatch(addInfo({ status: route.params.status, info: detail }) as never)
            navigation.goBack()
        }
        setDetail("")
    }


    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <ScrollView style={tw`px-[24] mt-[24px]`}>
                <View style={tw`p-[12px] rounded-xl border border-[#207729] mb-[20px]`}>
                    <Text style={tw`text-base font-bold text-[#207729] text-center`}>{`Tambahkan Informasi Detail Status`}</Text>
                </View>

                <TextField
                    label="Detail Status"
                    value={detail}
                    onChangeText={(text) => setDetail(text)}
                    multiline={true}
                />

                <TouchableOpacity onPress={() =>
                    submitHandler()
                } style={tw`bg-[#167270]  flex justify-center items-center `}>
                    <Text style={tw`text-white text-base font-bold p-[10px] rounded-sm `} >Tambah</Text>
                </TouchableOpacity>

                <View style={tw`mb-[100px]`}></View>
            </ScrollView>


            {/* button add card in bottom of screen */}
            {/* <TouchableOpacity onPress={() =>
                // setIsVisible(true)
                navigation.navigate('TambahDetailStatus', { status: route.params.status })
            } style={tw`bg-[#167270] rounded-full absolute bottom-[20px] right-[20px] h-12 w-12 flex justify-center items-center `}>
                <Text style={tw`text-white text-4xl font-bold`} >+</Text>
            </TouchableOpacity> */}

        </View >
    )

}

export default TambahDetailStatus