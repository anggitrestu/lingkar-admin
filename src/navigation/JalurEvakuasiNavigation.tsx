import React from 'react';
import { createStackNavigator, } from '@react-navigation/stack';
import JalurEvakuasi from '../screens/RuteEvakuasi/JalurEvakuasi';
import { UpdateJalurEvakuasi } from '../screens';

export type RootStackParamList = {
    JalurEvakuasi: undefined,
    UpdateJalurEvakuasi: {
        isEdit: boolean,
        data: {
            key: string,
            nama: string,
            deskripsi: string,
            latitude: string,
            longitude: string,
        }
    }
}

const Stack = createStackNavigator<RootStackParamList>();

const JalurEvakuasiNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName='JalurEvakuasi'
            screenOptions={{
                headerShown: false,
                gestureEnabled: true
            }}
        >
            <Stack.Screen
                name="JalurEvakuasi"
                component={JalurEvakuasi}
            />
            <Stack.Screen
                name="UpdateJalurEvakuasi"
                component={UpdateJalurEvakuasi}
            />
        </Stack.Navigator>
    )
}

export default JalurEvakuasiNavigation