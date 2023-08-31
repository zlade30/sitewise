import { CancelTokenSource } from 'axios';
import {
    FormikErrors,
    FormikHandlers,
    FormikProps,
    FormikState,
    FormikValues
} from 'formik';
import { ReactElement } from 'react';

export {};

declare global {
    /**
     * Now declare things that go in the global namespace,
     * or augment existing declarations in the global namespace.
     */

    type UploadInfo = {
        id: string;
        file: File;
        cancelTokenSource: CancelTokenSource;
        isError?: boolean;
        completed?: boolean;
        percent?: number;
    };

    type Photos = {
        id: string;
        link: string;
        date: number;
        notes: string;
        tags: string[];
        photoId: string;
        markAs: boolean;
        location: string;
        active?: boolean;
        fileName: string;
        tagCustom: string;
        customTags: string[];
        isNeedReview: boolean;
        suite: 'interior' | 'exterior';
        status: 'showcase' | 'uploaded';
        type: 'electric-boxes' | 'deleted';
    };

    type PopupProps = {
        open: boolean;
        onClose: () => void;
        children?: ReactNode;
    };

    type TabProps = { name: string; active: boolean };

    type Formik = FormikHandlers &
        FormikState<FormikValues> &
        FormikErrors<FormikValues> &
        FormikProps<FormikValues>;

    type StatusRequest = {
        show: boolean;
        message: string;
        loading: boolean;
        status: 'error' | 'success' | 'pending';
    };

    type SortOrder = 'desc' | 'asc';

    type ModalProps = {
        open: boolean;
        onClose: () => void;
    };

    type TakeOffTypesHistory = {
        id: string;
        date: Date;
        calculation: string;
        total: number;
    };

    type TakeOffTypes = {
        id: string;
        qty: number;
        title: string;
        type: 'ea' | 'sqft' | 'lnft' | 'arms' | 'y/n';
        showHistory: boolean;
        isCheck: boolean;
        history: TakeOffTypesHistory[];
    };

    type TakeOffsData = {
        id: string;
        active?: boolean;
        icon?: string | ReactElement | undefined;
        name: string;
        type: 'interior' | 'exterior';
        types: TakeOffTypes[];
    };

    type Building = {
        id: string;
        title: string;
        types: TakeOffTypes[];
    };

    type Suite = {
        id: string;
        title: string;
        type: 'exterior' | 'interior';
        isCommon: boolean;
        clientOwnerShip: string | number;
        sqftFootage: string | number;
        quantity: string | number;
        takeOffs: TakeOffsData[];
        analyst?: string;
        dateCreated?: number;
    };

    type ManageSuite = {
        isDraft?: boolean;
        suite: Suite | undefined;
        action: 'copy' | 'move' | 'edit';
    };

    type ProjectSort = {
        field: string | 'site-contact' | 'appointment';
        order: 'desc' | 'asc';
    };

    type Project = {
        id: string;
        analyst: {
            name: string;
        };
        siteContact: {
            name: string;
            phone: string;
            email: string;
        };
        opportunityContact: string;
        siteVisit: number;
        description: string;
        size: {
            sqft: number;
            acres: number;
        };
        address: string;
        inspectionDate: number;
        status: 'in-person' | 'virtual';
        suites: Suite[];
        buildings: Building;
    };
}
