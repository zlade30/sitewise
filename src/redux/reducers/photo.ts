import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialStateProps = {
    uploading: boolean;
    currentUpload: number;
    uploadMinimize: boolean;
    showUploadModal: boolean;
    uploadFiles: UploadInfo[];
};

const initialState: InitialStateProps = {
    uploadFiles: [],
    uploading: false,
    currentUpload: 0,
    uploadMinimize: false,
    showUploadModal: false
};

export const slice = createSlice({
    initialState,
    name: 'photos',
    reducers: {
        setUploading: (state, action: PayloadAction<boolean>) => {
            state.uploading = action.payload;
        },
        setShowUploadModal: (state, action: PayloadAction<boolean>) => {
            state.showUploadModal = action.payload;
        },
        setUploadMinimize: (state, action: PayloadAction<boolean>) => {
            state.uploadMinimize = action.payload;
        },
        setCurrentUpload: (state, action: PayloadAction<number>) => {
            state.currentUpload = action.payload;
        },
        setUploadFiles: (state, action: PayloadAction<UploadInfo[]>) => {
            state.uploadFiles = [...action.payload];
        }
    }
});

export const {
    setUploading,
    setUploadFiles,
    setCurrentUpload,
    setUploadMinimize,
    setShowUploadModal
} = slice.actions;
export default slice.reducer;
