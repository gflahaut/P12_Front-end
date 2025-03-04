export default {
    transform: {
        "^.+\\.[t|j]sx?$": "babel-jest",
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
    },
};
