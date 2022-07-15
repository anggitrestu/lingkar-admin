import * as React from 'react';
import { AppState } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { BeritaMerapi, StatusMerapi, KontakDarurat } from '../screens';
import InformasiStatusNavigation from './InformasiStatusNavigation';
import messaging from '@react-native-firebase/messaging'

import { useDispatch } from 'react-redux'
import { loadStatus } from '../redux/action/merapi'
import { getContact } from '../redux/action/padukuhan'

import { getNews } from '../redux/action/news';

const Drawer = createDrawerNavigator();

export default function AppNavigation() {

    const dispatch = useDispatch()

    React.useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            dispatch(loadStatus() as never)
            dispatch(getNews() as never)
            dispatch(getContact() as never)
        })

        return () => {
            subscription.remove()
        }
    }, [])


    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="KontakDaruratDrawer"
                screenOptions={
                    {
                        headerStyle: {
                            backgroundColor: '#167270',
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                            fontSize: 24,
                        },
                    }
                }
            >
                <Drawer.Screen name="StatusMerapi" component={StatusMerapi} />
                <Drawer.Screen name="InformasiStatusDrawer" component={InformasiStatusNavigation} />
                <Drawer.Screen name="BeritaMerapiDrawer" component={BeritaMerapi} />
                <Drawer.Screen name="KontakDaruratDrawer" component={KontakDarurat} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}