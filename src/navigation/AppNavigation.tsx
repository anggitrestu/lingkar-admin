import * as React from 'react';
import { AppState } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { BeritaMerapi, StatusMerapi, KontakDarurat, JalurEvakuasi } from '../screens';
import InformasiStatusNavigation from './InformasiStatusNavigation';
import BeritaMerapiNavigation from './BeritaMerapiNavigation';

import { useDispatch } from 'react-redux'
import { loadPadukuhan, loadStatus, } from '../store'

const Drawer = createDrawerNavigator();

export default function AppNavigation() {

    const dispatch = useDispatch()

    React.useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            dispatch(loadStatus() as never)
            dispatch(loadPadukuhan() as never)

        })

        return () => {
            subscription.remove()
        }
    }, [])


    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Status Merapi"
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
                <Drawer.Screen name="Status Merapi" component={StatusMerapi} />
                <Drawer.Screen name="Informasi Status" component={InformasiStatusNavigation} />
                <Drawer.Screen name="Berita Merapi" component={BeritaMerapiNavigation} />
                <Drawer.Screen name="Kontak Darurat" component={KontakDarurat} />
                <Drawer.Screen name="Jalur Evakuasi" component={JalurEvakuasi} />
            </Drawer.Navigator>

        </NavigationContainer>
    );
}