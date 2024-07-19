import React, {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Back from '@/assets/svg/back.svg';
import {useFormik} from 'formik';
// import {useOtp} from '@/Hooks/useOtp';
import * as Yup from 'yup';
import {AppNavigationProps} from '@/navigators/Navigation';
import {Text, theme} from '@/components/theme';

const OtpSchema = Yup.object().shape({
  otp: Yup.string().min(6, 'Invalid otp').required('OTP is required'),
});

const Otp = ({navigation, route}: AppNavigationProps<'Otp'>) => {
  const [code, setcode] = useState<number>();
  const params: any = route.params;
  const flag = params?.flag;
  const phone = params?.phone;
  const email = params?.email;
  const userId = params?.userID;
  //   const {mutate} = useOtp({
  //     onError(error) {

  //     },
  //     onSuccess(data) {

  //     },
  //   });

  const {
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
    setFieldValue,
    values,
  } = useFormik({
    validationSchema: OtpSchema,
    initialValues: {
      otp: '',
    },
    onSubmit: value => {},
  });

  const {width} = Dimensions.get('screen');

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/bird.png')} style={styles.img} />
      <Text
        mt="l"
        variant="pockota24black_medium"
        color="brandColor"
        textAlign="center">
        {flag == 2 ? 'Confirm Login' : 'Verify Your Account'}
      </Text>
      <Text
        variant="title14black_medium"
        color="grey400"
        textAlign="center"
        marginHorizontal="l"
        mt="m">
        {flag == 2
          ? 'Please enter the 6 digit 2fa code'
          : 'Please enter the 6 digit code that is sent to your email'}
      </Text>
      <View style={styles.otp}>
        <Text mb="s" mt="xl" variant="title14black_semibold">
          Enter One Time Code
        </Text>
        <SmoothPinCodeInput
          cellSpacing={width / 25}
          codeLength={6}
          cellSize={45}
          cellStyle={styles.otpinput}
          textStyle={styles.otptext}
          cellStyleFocused={{
            borderColor: theme.colors.apptheme,
          }}
          value={code}
          onFulfill={(n: any) => {
            // _VerifyOtp(n);
          }}
          onTextChange={(c: number) => {
            setcode(c);
            setFieldValue('otp', c);
          }}
        />
        {errors.otp && touched.otp && (
          <Text
            fontSize={12}
            ms="s"
            mt="xs"
            variant="title14black_semibold"
            color="error">
            {errors.otp as string}
          </Text>
        )}

        <View style={styles.btnLine}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.goBack()}>
            <Back color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            disabled={isSubmitting}
            onPress={handleSubmit as () => void}>
            {isSubmitting ? (
              <ActivityIndicator color={theme.colors.black} />
            ) : (
              <Text variant="title14black_semibold" color="black">
                {flag != 0 ? 'Login' : 'Verify Account'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  img: {
    alignSelf: 'center',
    height: 150,
    width: 144,
    marginTop: '2%',
  },
  otp: {marginHorizontal: '5%'},
  btnLine: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: '10%',
    width: '100%',
  },
  otpinput: {
    borderWidth: 1,
    borderColor: theme.colors.input,
    paddingLeft: 2,
    paddingRight: 2,
    borderRadius: 8,
  },
  otptext: {
    fontSize: 18,
    color: theme.colors.black,
    fontFamily: 'Montserrat-Regular',
  },
  back: {
    height: 48,
    width: 48,
    backgroundColor: theme.colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    borderColor: theme.colors.black,
    borderWidth: 1,
    marginStart: '3%',
    width: '83%',
  },
  animation: {
    height: 80,
    width: 80,
  },
});

export default Otp;
