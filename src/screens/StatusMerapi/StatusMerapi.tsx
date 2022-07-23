import React, { useEffect, useState } from "react"
import { Text, View, Switch, TouchableOpacity, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import tw from 'twrnc';
import { Screen } from "../../component";
import { loadStatus, RootState, updateStatus } from "../../store";




const StatusMerapi = () => {
    const dispatch = useDispatch()
    const statusMerapi = useSelector((state: RootState) => state.merapi.status)
    const [status, setStatus] = useState("")
    const [color, setColor] = useState("#15803d")

    useEffect(() => {
        dispatch(loadStatus() as never)
        setStatus(statusMerapi)
    }, [statusMerapi])


    const submitStatus = () => {
        dispatch(updateStatus({ status }) as never)
    }


    let colorStatus = ''
    if (status === 'normal') {
        // green
        colorStatus = '#15803d'
    }
    else if (status === 'waspada') {
        colorStatus = '#ca8a04'
    }
    else if (status === 'siaga') {
        colorStatus = '#ea580c'
    }
    else if (status === 'awas') {
        colorStatus = '#dc2626'
    }


    const confirmUpdateStatus = () => {
        Alert.alert(
            'Konfirmasi Status',
            'Apakah kamu yakin ingin melakukan perubahan status Merapi?',
            [
                { text: 'Batal', style: 'cancel' },
                { text: 'OK', onPress: () => submitStatus() },
            ],
            {
                cancelable: true,
            },
        )
    }

    return (
        <>
            <Screen statusBar="light-content" preset="scroll" backgroundColor={'#F6F8FA'}>
                <View style={{ backgroundColor: '#CCDFE0' }}>
                    <View style={tw`p-[12px]`}>
                        <View style={tw`h-[110px] bg-white/40 rounded-xl p-[14px]`}>
                            <View style={tw`flex h-full bg-[#F5F5F5] rounded-xl items-center`}>
                                <Text style={tw`text-4xl my-auto font-bold text-[${colorStatus}]`} >
                                    {status.toUpperCase()}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <View style={tw`min-h-[110px] bg-white/40  h-full rounded-3xl py-[32px] px-[24px]`}>
                            {/* card */}
                            <View style={tw`flex flex-row min-h-[50px] bg-white border border-[#EBEBEB] rounded-sm mb-[24px]`}>
                                <View style={tw`bg-green-700 h-full w-[20px]`}>
                                </View>
                                <View style={tw`flex-auto bg-white p-[14px]`}>
                                    <Text style={tw`text-[#979797] text-2xl font-medium`}>NORMAL</Text>
                                </View>
                                <View style={{ position: 'absolute', right: 0, marginRight: 10, marginTop: 10 }}>
                                    <Switch
                                        thumbColor={status === 'normal' ? '#0060ff' : '#708cab'}
                                        trackColor={{ false: '#d5ddf1', true: '#d5ddf1' }}
                                        value={status === 'normal'}
                                        onChange={() => setStatus('normal')}
                                    />
                                </View>
                            </View>
                            {/* card */}
                            <View style={tw`flex flex-row min-h-[50px] bg-white border border-[#EBEBEB] rounded-sm mb-[24px]`}>
                                <View style={tw`bg-yellow-600 h-full w-[20px]`}>
                                </View>
                                <View style={tw`flex-auto bg-white p-[14px]`}>
                                    <Text style={tw`text-[#979797] text-2xl font-medium`}>WASPADA</Text>
                                </View>
                                <View style={{ position: 'absolute', right: 0, marginRight: 10, marginTop: 10 }}>
                                    <Switch
                                        thumbColor={status === 'waspada' ? '#0060ff' : '#708cab'}
                                        trackColor={{ false: '#d5ddf1', true: '#d5ddf1' }}
                                        value={status === 'waspada'}
                                        onChange={() => setStatus('waspada')}
                                    />
                                </View>
                            </View>
                            {/* card */}
                            <View style={tw`flex flex-row min-h-[50px] bg-white border border-[#EBEBEB] rounded-sm mb-[24px]`}>
                                <View style={tw`bg-orange-600 h-full w-[20px]`}>
                                </View>
                                <View style={tw`flex-auto bg-white p-[14px]`}>
                                    <Text style={tw`text-[#979797] text-2xl font-medium`}>SIAGA</Text>
                                </View>
                                <View style={{ position: 'absolute', right: 0, marginRight: 10, marginTop: 10 }}>
                                    <Switch
                                        thumbColor={status === 'siaga' ? '#0060ff' : '#708cab'}
                                        trackColor={{ false: '#d5ddf1', true: '#d5ddf1' }}
                                        value={status === 'siaga'}
                                        onChange={() => setStatus('siaga')}
                                    />
                                </View>
                            </View>
                            {/* card */}
                            <View style={tw`flex flex-row min-h-[50px] bg-white border border-[#EBEBEB] rounded-sm mb-[24px]`}>
                                <View style={tw`bg-red-700 h-full w-[20px]`}>
                                </View>
                                <View style={tw`flex-auto bg-white p-[14px]`}>
                                    <Text style={tw`text-[#979797] text-2xl font-medium`}>AWAS</Text>
                                </View>
                                <View style={{ position: 'absolute', right: 0, marginRight: 10, marginTop: 10 }}>
                                    <Switch
                                        thumbColor={status === 'awas' ? '#0060ff' : '#708cab'}
                                        trackColor={{ false: '#d5ddf1', true: '#d5ddf1' }}
                                        value={status === 'awas'}
                                        onChange={() => setStatus('awas')}
                                    />
                                </View>
                            </View>
                            {/* card */}


                            {/* button */}
                            <TouchableOpacity onPress={() => confirmUpdateStatus()} style={tw`p-[14px] rounded-xl bg-[#167270] mt-[12px]`}>
                                <Text style={tw`text-white font-medium text-2xl mx-auto`}>
                                    Simpan Perubahan
                                </Text>
                            </TouchableOpacity>
                            {/* end button */}
                        </View>
                    </View>



                </View>
            </Screen>
        </>
    )
}

export default StatusMerapi;