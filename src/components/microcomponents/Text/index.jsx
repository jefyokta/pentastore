import { Text } from 'react-native'
import style from '../../style'


const TextLight = ({text,otherstyle}) =>{
    return (
        <Text style={[style.text ,otherstyle]}>{text}</Text>
    )
}

export {
    TextLight
}