import { faker } from '@faker-js/faker';

const interior = [
    'Recently Used',
    'Flooring',
    'Window Coverings',
    'Shelving (5 Year)',
    'Shelving (7 Year)',
    'Counters & Cabinets (5 Year)',
    'Counters & Cabinets (7 Year)',
    'Appliances',
    'Special Plumbing & Sinks (5 Year)',
    'Break Room Sinks (7 Year)',
    'Ceiling Fans',
    'Special Lighting',
    'Data / TV Equipment',
    'Telephone / Communications',
    'Surveillance / Security Cameras',
    'Special HVAC',
    'Removable Walls'
];
const exterior = [
    'Recently Used',
    'Landscaping',
    'Land Improvements',
    'Exterior Lighting',
    'Flag Poles and Signs',
    'Fencing',
    'Dumpster Enclosure',
    'Security Gates',
    'Concrete Swimming Pool',
    'Carport / Covered Walkway',
    'Dock Equipment',
    'Awnings',
    'Grease Interceptor',
    'Solar Panels',
    'Electric Vehicle Charge Station',
    'Trailer Services',
    'Fuel Dispensers'
];

const generateTakeOffTypes = () => {
    const takeOffTypes: TakeOffTypes = {
        id: faker.string.uuid().slice(0, 12),
        title: faker.lorem.slug(1),
        isCheck: faker.datatype.boolean(),
        qty: faker.number.int({ min: 1, max: 50 }),
        type: faker.helpers.arrayElement(['arms', 'ea', 'y/n', 'lnft', 'sqft']),
        showHistory: false,
        history: []
    };
    return takeOffTypes;
};

const generateTakeOffs = () => {
    const takeOffsInterior = interior.map((item) => ({
        id: faker.string.uuid().slice(0, 12),
        name: item,
        type: 'interior' as 'interior',
        types: Array.from({ length: 5 }, () => generateTakeOffTypes())
    }));
    const takeOffsExterior = exterior.map((item) => ({
        id: faker.string.uuid().slice(0, 12),
        name: item,
        type: 'exterior' as 'exterior',
        types: Array.from({ length: 5 }, () => generateTakeOffTypes())
    }));
    const takeOffs: TakeOffsData[] = [...takeOffsInterior, ...takeOffsExterior];
    return takeOffs;
};

export const generateSuites = () => {
    const suites: Suite = {
        id: faker.string.uuid().slice(0, 12),
        title: faker.lorem.word(10),
        type: faker.helpers.arrayElement(['interior', 'exterior']),
        isCommon: faker.datatype.boolean(),
        clientOwnerShip: faker.number.float({
            min: 10,
            max: 100,
            precision: 0.001
        }),
        sqftFootage: faker.number.int({ min: 10, max: 100 }),
        quantity: faker.number.int({ min: 10, max: 100 }),
        takeOffs: generateTakeOffs(),
        analyst: faker.person.fullName(),
        dateCreated: faker.date.anytime().getTime()
    };
    return suites;
};

export const generateProjects = () => {
    const project: Project = {
        id: faker.string.uuid().slice(0, 12),
        analyst: {
            name: faker.person.fullName()
        },
        siteContact: {
            name: faker.person.fullName(),
            phone: faker.phone.number(),
            email: faker.internet.email()
        },
        opportunityContact: faker.person.fullName(),
        siteVisit: faker.date.anytime().getTime(),
        description: faker.lorem.sentence(),
        size: {
            sqft: faker.number.int({ min: 10, max: 100 }),
            acres: faker.number.float({ precision: 0.1 })
        },
        status: faker.helpers.arrayElement(['in-person', 'virtual']),
        address: `${faker.location.state()} ${faker.location.streetAddress()} ${faker.location.zipCode()}`,
        inspectionDate: new Date().getTime(),
        suites: Array.from({ length: 20 }, () => generateSuites()),
        buildings: {
            id: faker.string.uuid().slice(0, 12),
            title: 'Building',
            types: Array.from({ length: 5 }, () => generateTakeOffTypes())
        }
    };

    return project;
};
