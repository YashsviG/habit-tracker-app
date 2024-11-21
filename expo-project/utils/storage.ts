import * as SecureStore from 'expo-secure-store';

export const saveUserToken = async (token: string) => {
    await SecureStore.setItemAsync('userToken', token);
};

export const getUserToken = async () => {
    return await SecureStore.getItemAsync('userToken');
};

export const deleteUserToken = async () => {
    await SecureStore.deleteItemAsync('userToken');
};
