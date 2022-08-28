import localForage from 'localForage'

export const avatarForage = localForage.createInstance({
    name: "tempAvatar"
});

export const appForage = localForage.createInstance({
    name: "appForage"
});