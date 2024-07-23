import { StyleSheet} from "react-native";
import { fonts } from "../../constants";
import colors from "../../constants/colors";
import { 
    responsiveScreenHeight as SH,
    responsiveScreenWidth as SW,
    responsiveScreenFontSize as RF,
  } from 'react-native-responsive-dimensions';
  export default StyleSheet.create({
    container: {
        width: SW(100),
        height: SH(100),
        backgroundColor: colors.MAIN_THEME_COLOR,
    },
    charactersCard: {
        width: SW(90),
        height: SH(18),
        backgroundColor: colors.BUTTON_COLOR,
        margin: SW(2),
        padding: SW(2),
        borderRadius: SW(2),
        alignSelf: 'center',
        borderRadius: SW(1),
        flexDirection: 'row',
    },
    characterImage: {
        width: SW(20),
        height: SW(20),
        resizeMode: 'contain',
        borderRadius: SW(1),
    },
    cardLeft: {
        width: '50%',
        height: '100%',
    },
    cardRight: {
        width: '50%',
        height: '100%',
        paddingTop: SH(6),
    },
    titleTxt: {
        color: colors.BLACK_COLOR,
        fontSize: RF(2),
        fontFamily: fonts.interExtraBold,
        marginBottom: SH(2),
    },
    semiTitle: {
        color: colors.BLACK_COLOR,
        fontSize: RF(1.8),
        fontFamily: fonts.interSemiBold,
    },
    value: {
        color: colors.BLACK_COLOR,
        fontSize: RF(1.8),
        fontFamily: fonts.interRegular
    },
    header:{
        width:SW(100),
        height:SH(16),
    },
    headerText:{
        color:colors.BUTTON_COLOR,
        fontSize:RF(3),
        fontFamily:fonts.interBold,
        textAlign:'center',
        marginVertical:SH(2),
    },
    input: {
        width: SW(75),
        height: SH(5),
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        borderRadius: 10,
        backgroundColor: 'white',
        color: 'black',
        fontFamily: fonts.interRegular,
      },
        inputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginVertical: SH(2),
        },
        voiceIcon: {
            width: SW(8),
            height: SW(8),
            resizeMode: 'contain',
            marginLeft: SW(2),
            alignSelf: 'center',
            justifyContent: 'center',
        },
        settingIcon: {
            width: SW(8),
            height: SW(8),
            resizeMode: 'contain',
        },
        settingButton: {
            position: 'absolute',
            width: SW(10),
            height: SW(10),
            top: SH(2),
            right: SW(2),
        },
        inputBox: {
            width: SW(80),
            height: SH(10),
            marginVertical: SH(2),
            backgroundColor: colors.SECONDARY_COLOR,
            alignSelf: 'center',
            borderRadius: SW(2),
            alignItems: 'baseline',
            justifyContent: 'center'
        },
        labelTxt: {
            color: colors.LABEL_COLOR,
            fontSize: RF(2),
            fontFamily: fonts.interSemiBold,
            margin: SW(1),
            marginLeft: SW(5),
        },
        valuep: {
            color: colors.WHITE_COLOR,
            fontSize: RF(2),
            fontFamily: fonts.interRegular,
            margin: SW(1),
            marginLeft: SW(5),
        },
        button: {
            position: 'absolute',
            width: SW(80),
            height: SH(6),
            backgroundColor: colors.BUTTON_COLOR,
            borderRadius: SW(4),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            bottom: SH(12),
        },
        buttonText: {
            color: colors.BLACK_COLOR,
            fontSize: RF(2.5),
            fontFamily: fonts.interBold,
        },
        back: {
            width: SW(8),
            height: SW(8),
        },
        backBtn: {
            width: SW(10),
            height: SW(10),
            borderRadius: SW(5),
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            top: SH(2),
            left: SW(3),
        },

});