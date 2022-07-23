import React, { useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import { IconWarning, IconArrowRightWhite } from "../../assets";
import tw from 'twrnc';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/InformasiStatusNavigation";
import { DataCard, dataCardType } from "./data";

type Props = NativeStackScreenProps<RootStackParamList, 'DetailStatus'>;

const InformasiStatus = ({ navigation }: Props) => {

    const handleNavigate = (status: string, color: string) => {
        navigation.navigate('DetailStatus', {
            status: status,
            color: color
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <View>
                <View style={tw`p-[24px]`}>
                    {/* card */}
                    {
                        DataCard.map((item: dataCardType, index: number) => {
                            return (
                                <TouchableOpacity key={index} onPress={() => handleNavigate(item.status, item.color)} style={tw`flex flex-row justify-center items-center min-h-[50px] ${item.color} border border-[#EBEBEB] rounded-sm mb-[24px]`}>
                                    <View style={tw`p-[16px]`}>
                                        <IconWarning />
                                    </View>
                                    <View style={tw``}>
                                        <View >
                                            <Text style={tw`text-white text-2xl font-medium`}>{item.status}</Text>
                                        </View>
                                    </View>
                                    <View style={tw`flex-auto items-end p-[20px]`}>
                                        <IconArrowRightWhite />
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        </View>
    )
}

export default InformasiStatus