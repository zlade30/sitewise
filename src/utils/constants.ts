const variants = {
    DEFAULT: 'default',
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
};

const signInSteps = {
    LOGIN: 'login',
    EMAIL: 'email',
    PASSWORD: 'password',
    REMEMBER_ME: 'remember-me'
};

const passwordResetSteps = {
    DONE: 'done',
    RESET: 'reset',
    METHOD: 'method',
    VERIFY: 'verify'
};

const draftsTab = {
    SUITE: 'suite',
    TAKE_OFFS: 'take-offs'
};

const ORIENTATION = {
    landscape: 'LANDSCAPE',
    portrait: 'PORTRAIT'
}

const ZOOM_MAX_VALUE = 5;

const PROJECT_PAGE_SLUG = -1;
const PROJECT_DETAILS_PAGE_SLUG = 0;
const PHOTO_PAGE_SLUG = 1;
const PHOTO_DETAILS_PAGE_SLUG = 2;

const PROJECT_PAGE = 'PROJECT_PAGE';
const PROJECT_DETAILS_PAGE = 'PROJECT_DETAILS_PAGE';
const PHOTO_PAGE = 'PHOTO_PAGE';
const PHOTO_DETAILS_PAGE = 'PHOTO_DETAILS_PAGE';

export {
    variants,
    draftsTab,
    signInSteps,
    passwordResetSteps,
    PROJECT_PAGE_SLUG,
    PROJECT_DETAILS_PAGE_SLUG,
    PROJECT_PAGE,
    PROJECT_DETAILS_PAGE,
    PHOTO_DETAILS_PAGE_SLUG,
    PHOTO_PAGE_SLUG,
    PHOTO_DETAILS_PAGE,
    PHOTO_PAGE,
    ORIENTATION,
    ZOOM_MAX_VALUE
};
