import * as React from 'react';
import { AppState, PermissionsAndroid } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusMerapi, } from '../screens';
import InformasiStatusNavigation from './InformasiStatusNavigation';
import BeritaMerapiNavigation from './BeritaMerapiNavigation';
import KontakDaruratNavigation from './KontakDaruratNavigation';
import JalurEvakuasiNavigation from './JalurEvakuasiNavigation';
import { useDispatch } from 'react-redux'
import { getSelectPadukuhan, loadPadukuhan, loadStatus, } from '../store'


const Drawer = createDrawerNavigator();

const requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the location");
        } else {
            console.log("Location permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};

export default function AppNavigation() {

    const dispatch = useDispatch()

    React.useEffect(() => {
        requestLocationPermission();

        const subscription = AppState.addEventListener('change', nextAppState => {
            dispatch(loadStatus() as never)
            dispatch(loadPadukuhan() as never)
            dispatch(getSelectPadukuhan() as never)
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
                <Drawer.Screen name="Kontak Darurat" component={KontakDaruratNavigation} />
                <Drawer.Screen name="Jalur Evakuasi" component={JalurEvakuasiNavigation} />
            </Drawer.Navigator>

        </NavigationContainer>
    );
}