import LottieView from 'lottie-react-native';
import { View } from 'tamagui'; // O View de react-native si prefieres

export const LottieAnimation = ({ source, style, loop = true }: any) => {
  return (
    <View style={style}>
      <LottieView
        source={source}
        autoPlay
        loop={loop}
        style={{ width: '100%', height: '100%' }}
      />
    </View>
  );
};