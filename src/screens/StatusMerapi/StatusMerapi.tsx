import React, { useState } from "react"
import { Text, View, Switch, TouchableOpacity, Alert } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import tw from 'twrnc';
import { updateStatus } from "../../redux/action/merapi";
import { RootState } from "../../redux/reducer";

const StatusMerapi = () => {
    const dispatch = useDispatch()

    const merapiStatus = useSelector((state: RootState) => state.merapi.status)
    const [status, setStatus] = useState("")
    const [loading] = useState(false)

    React.useEffect(() => {
        setStatus(merapiStatus)
    }, [merapiStatus])


    const submitStatus = async () => {
        await dispatch(updateStatus(status))
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
        <View style={{ flex: 1, backgroundColor: '#CCDFE0' }}>
            <View style={tw`p-[12px]`}>
                <View style={tw`h-[110px] bg-white/40 rounded-xl p-[14px]`}>
                    <View style={tw`flex h-full bg-[#F5F5F5] rounded-xl items-center`}>
                        <Text style={tw`text-4xl my-auto font-bold text-[#F9800B]`} >
                            SIAGA
                        </Text>
                    </View>
                </View>
            </View>

            <View>
                <View style={tw`min-h-[110px] bg-white/40  h-full rounded-3xl py-[32px] px-[24px]`}>
                    {/* card */}
                    <View style={tw`flex flex-row min-h-[50px] bg-white border border-[#EBEBEB] rounded-sm mb-[24px]`}>
                        <View style={tw`bg-green-900 h-full w-[20px]`}>
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
                        <View style={tw`bg-yellow-800 h-full w-[20px]`}>
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
                        <View style={tw`bg-orange-900 h-full w-[20px]`}>
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
                        <View style={tw`bg-red-900 h-full w-[20px]`}>
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
                    <TouchableOpacity onPress={() => confirmUpdateStatus()} style={tw`p-[16px] min-h-[50px] bg-[#167270] mt-[12px]`}>
                        <Text style={tw`text-white font-medium text-2xl mx-auto`}>
                            Simpan Perubahan
                        </Text>
                    </TouchableOpacity>
                    {/* end button */}
                </View>
            </View>



        </View>
    )
}

export default StatusMerapi;