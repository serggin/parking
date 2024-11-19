import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    //...
    IApiParking,
    //IApiPages,
} from './apiTypes';
import apiUrls from '../constants/API';

function onApiError(thunkApi: any, error: unknown) {
    const message = /* ... */ error.message /* ... */;

    return thunkApi.rejectWithValue(message);
}

export const fetchParking = createAsyncThunk<IApiParking, undefined, { rejectValue: string }>(
    'parkingSlice/fetchFlats',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlParking);
            return response.data as IApiParking;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);
