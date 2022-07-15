import { useIsFocused } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Text, View, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput, Button, Alert, ActivityIndicator } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import tw from "twrnc"
import { addNews } from '../../api/news'
import { getNews, updateNews, removeNews } from "../../redux/action/news"
import { RootState } from "../../redux/reducer"
const { height, width } = Dimensions.get("window")



type dataBeritaProps = {
    key: string,
    title?: string,
    highlight?: string,
    body?: string,
    date?: string,
}


const defaultBerita: dataBeritaProps = {
    key: "",
    title: "",
    highlight: "",
    body: "",
    date: "",
}

const BeritaMerapi = () => {
    const news = useSelector((state: RootState) => state.news.news)
    const dispatch = useDispatch()

    const [isVisible, setIsVisible] = useState(false)
    const [dataBerita, setDataBerita] = useState<dataBeritaProps[]>([])

    const [isEdit, setIsEdit] = useState(false)

    const [judul, setJudul] = useState("")
    const [ringkasan, setRingkasan] = useState("")
    const [isiBerita, setIsiBerita] = useState("")

    const [currentData, setCurrentData] = useState<dataBeritaProps>({
        key: "",
        title: "",
        body: "",
        date: "",
        highlight: "",

    })

    useEffect(() => {
        setDataBerita(news)
    }, [news])

    const handleTambahBerita = (judul: string, ringkasan: string, isiBerita: string,) => {
        if (judul === "" || ringkasan === "" || isiBerita === "") {
            Alert.alert("Data tidak boleh kosong")
            return
        }
        if (isEdit) {
            dispatch(updateNews(currentData.key, judul, ringkasan, isiBerita) as never)
            setIsEdit(false)
            setIsVisible(false)
            clearForm()
        } else {
            const data = {
                title: judul,
                highlight: ringkasan,
                body: isiBerita
            }
            addNews(data.title, data.highlight, data.body)
                .then(() => {
                    dispatch(getNews() as never)
                })
                .catch(() => Alert.alert('Gagal menambahkan Berita'))
            clearForm()
            setIsVisible(false)
        }
    }

    const clearForm = () => {
        setJudul("")
        setRingkasan("")
        setIsiBerita("")
        setCurrentData({
            key: "",
            title: "",
            body: "",
            date: "",
        })
    }

    const showUpdateBerita = (key: string) => {
        setIsVisible(true)
        setIsEdit(true)
        const data = dataBerita.find((item: any) => item.key === key)
        if (data) {
            setJudul(data?.title || "")
            setRingkasan(data?.highlight || "")
            setIsiBerita(data?.body || "")
            setCurrentData(data)
        }
    }

    const handleDeleteBerita = (key: string) => {

        Alert.alert(
            'Hapus Informasi',
            'Apakah anda yakin ingin menghapus informasi ini?',
            [
                { text: 'Batal', style: 'cancel' },
                {
                    text: 'OK', onPress: () => {
                        dispatch(removeNews(key) as never)
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

    return (

        <View style={{
            flex: 1,
        }} >

            <View style={tw`p-[24px]`}>
                <ScrollView>
                    {
                        dataBerita.length > 0 ?
                            (
                                dataBerita.map((item: any, index: number) => {
                                    return (
                                        <TouchableOpacity onPress={() => showUpdateBerita(item.key)} style={tw`rounded-xl mb-[20px]`} key={index}>
                                            <View style={tw`flex flex-row bg-white rounded-xl`}>
                                                {/* profile picture */}
                                                <View style={tw`bg-green-900 rounded-l-xl w-[20px]`}>
                                                </View>
                                                {/* description */}
                                                <View style={tw`ml-4 py-[10px] w-[${width * 0.7}px]`}>
                                                    <Text style={tw`text-gray-600 text-xl font-bold mb-2`}> {item?.title} </Text>
                                                    <Text style={tw`text-gray-400 overflow-hidden mb-1 text-justify`}>
                                                        {item?.highlight}
                                                    </Text>
                                                    <Text style={tw`text-gray-400 overflow-hidden mb-3 text-justify`}>
                                                        {item?.body}
                                                    </Text>
                                                    <Text style={tw`text-gray-400 text-xs`}>{item?.date}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            ) : (
                                <View style={tw`flex flex-row min-h-[50px] w-full pr-[10px] mb-[15px]`}>
                                    <Text style={tw`font-medium text-base text-justify`} >Belum ada berita</Text>
                                </View>
                            )
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
                        <Text style={tw`text-white text-xl font-bold`}>{isEdit ? 'Update Berita' : "Tambah Berita"}</Text>
                        <TouchableOpacity onPress={() => setIsVisible(false)} style={tw`bg-white rounded-full h-[32px] w-[32px] rounded-full flex justify-center items-center`}>
                            <Text style={tw`text-[#167270] text-base font-bold`}>X</Text>
                        </TouchableOpacity>
                    </View>

                    {/* text area input  */}
                    <View style={tw` px-[18px] mt-[80px] mb-[20px]`}>
                        <Text style={tw`mb-2 mt-4 font-medium text-base`}>Judul Berita</Text>
                        <TextInput
                            defaultValue={currentData?.title}
                            onChangeText={(text) => setJudul(text)}
                            style={tw`border border-[#207729] rounded-xl px-[10px]`}
                            placeholder="Tulis judul berita disini" />
                        <Text style={tw`mb-2 mt-4 font-medium text-base`}>Ringkasan</Text>
                        <TextInput
                            defaultValue={currentData?.highlight}
                            onChangeText={(text) => setRingkasan(text)}
                            style={tw`border border-[#207729] rounded-xl px-[10px]`}
                            placeholder="Tulis ringkasan berita disini" />
                        <Text style={tw`mb-2 mt-4 font-medium text-base`}>Isi Berita</Text>
                        <TextInput
                            defaultValue={currentData?.body}
                            multiline={true}
                            numberOfLines={4}
                            onChangeText={(text) => setIsiBerita(text)}
                            style={tw`border border-[#207729] rounded-xl px-[10px] justify-start `}
                            placeholder="Tulis isi berita disini" />
                    </View>


                    {
                        isEdit &&
                        <View style={tw`absolute inset-x-0 bottom-[50px] rounded-xl px-[20px]`}>
                            <Button color={'red'} title={"Hapus Berita"} onPress={() => handleDeleteBerita(currentData.key)} />
                        </View>
                    }

                    <View style={tw`absolute rounded-xl inset-x-0 bottom-[10px] px-[20px]  `}>
                        <Button color={'#167270'} title={isEdit ? "Update" : "Tambah"} onPress={() => handleTambahBerita(judul, ringkasan, isiBerita)} />
                    </View>
                </View>
            </Modal>

            {/* button add card in bottom of screen */}
            <TouchableOpacity
                onPress={() => {
                    setIsEdit(false)
                    setIsVisible(true)
                    clearForm()
                }}
                style={tw`bg-[#167270] rounded-full absolute bottom-[20px] right-[20px] h-12 w-12 flex justify-center items-center `}>
                <Text style={tw`text-white text-4xl font-bold`} >+</Text>
            </TouchableOpacity>
        </View>

    )
}

export default BeritaMerapi