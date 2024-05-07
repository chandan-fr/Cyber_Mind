import { Image } from 'react-native'
import React from 'react'
import { Icon_Props } from '../config/CustomTypes'
import { icons } from '../config/icons'

const Icon = ({ name, iconColor, size }: Icon_Props): JSX.Element => {
    const curImg: { [key: string]: any; } = {
        home: icons.home,
        calendar: icons.calendar,
        chat: icons.chat,
        profile: icons.user,
    };

    return (
        <Image
            style={{
                width: size,
                height: size,
                tintColor: iconColor
            }}
            source={curImg[name]}
        />
    )
}

export default Icon;