import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useFormik} from 'formik';
// import {useLogin} from '@/Hooks/useLogin';
import * as Yup from 'yup';
import Eye from '@/assets/svg/eye-slash.svg';
// import GoogleLogin from './Components/GoogleLogin';
// import AppleLogin from './Components/AppleLogin';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Text, theme} from '@/components/theme';
import {AppNavigationProps} from '@/navigators/Navigation';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email Address')
    .required('Email is Required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
    .matches(
      /[!@#$%^&*(),.?":{}|<>0-9]/,
      'Password must contain at least 1 special character',
    )
    .matches(/[0-9]/, 'Password must contain at least 1 number')
    .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter'),
});

const Login = ({navigation}: AppNavigationProps<'Login'>) => {
  const [pass, setpass] = useState(true);
  // const {mutate} = useLogin({
  //   onError(error) {

  //   },
  //   onSuccess(data) {

  // });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: value => {
      navigation.navigate('Otp');
    },
  });

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}>
      <Image source={require('@/assets/images/bird.png')} style={styles.img1} />
      <Text
        mt="xl"
        variant="pockota24black_medium"
        color="brandColor"
        textAlign="center">
        Login To My Account
      </Text>
      <Text
        variant="title14black_medium"
        color="grey400"
        textAlign="center"
        marginHorizontal="l"
        mt="m">
        Get involved in the best Copy Trading Platform in the industry Sign up
        with us today!
      </Text>
      <View style={styles.inputs}>
        <Text variant="title14black_semibold" mb="s">
          Email
        </Text>
        <TextInput
          keyboardType="email-address"
          placeholder="Enter email"
          placeholderTextColor={theme.colors.grey400}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          autoComplete="email"
          autoCapitalize="none"
          style={styles.input}
        />
        {errors.email && touched.email && (
          <Text
            fontSize={12}
            ms="xs"
            variant="title14black_semibold"
            mt="xs"
            color="error">
            {errors.email as string}
          </Text>
        )}
        <Text mt="m" variant="title14black_semibold" mb="s">
          Password
        </Text>
        <View style={styles.eyeinput}>
          <TextInput
            placeholder="Enter password"
            secureTextEntry={pass ? true : false}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            placeholderTextColor={theme.colors.grey400}
            style={styles.eye}
          />
          <Pressable onPress={() => setpass(!pass)}>
            <Eye />
          </Pressable>
        </View>
        {errors.password && touched.password && (
          <Text
            fontSize={12}
            ms="s"
            mt="xs"
            variant="title14black_semibold"
            color="error">
            {errors.password as string}
          </Text>
        )}
        <Pressable
          style={styles.forgot}
          // onLongPress={() => {
          //   Clipboard.setString(`${fcm_token}`),
          //     showToast(SUCCESS_TOAST, `${fcm_token}`, TOP);
          // }}
          // onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text variant="title14black_medium" fontSize={15} color="grey400">
            Forgot Password?{' '}
            <Text
              variant="title14black_semibold"
              fontSize={15}
              fontWeight="700"
              color="brandColor">
              Reset
            </Text>
          </Text>
        </Pressable>
        <TouchableOpacity
          style={styles.btn}
          disabled={isSubmitting}
          onPress={handleSubmit as () => void}>
          {/* {isSubmitting ? (
            <ActivityIndicator color={theme.colors.black} />
          ) : ( */}
          <Text variant="title14black_semibold" color="black">
            Login
          </Text>
        </TouchableOpacity>
        <Text
          textAlign="center"
          mt="m"
          color="grey400"
          fontSize={12}
          variant="title14black_medium">
          or continue with
        </Text>
        <View style={styles.social}>
          {/* <GoogleLogin navigation={navigation} /> */}
          {/* {isIOS() && <AppleLogin />} */}
        </View>
      </View>
      <Pressable
        onPress={() => navigation.navigate('Signup')}
        style={styles.signup}>
        <Text
          color="grey400"
          variant="title14black_semibold"
          textAlign="center">
          Looking to create an account?{' '}
          <Text color="brandColor" variant="title14black_bold">
            Signup Now
          </Text>
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  img1: {
    alignSelf: 'center',
    height: 150,
    width: 144,
    marginTop: '2%',
  },
  skip: {
    alignSelf: 'flex-end',
    marginEnd: '5%',
    backgroundColor: theme.colors.bubbles,
    paddingHorizontal: '4%',
    paddingVertical: '1.5%',
    borderRadius: 8,
    marginTop: '3%',
  },
  forgot: {marginTop: '2%', marginBottom: '5%', alignSelf: 'flex-end'},
  signup: {marginTop: '10%'},
  btn: {
    height: 42,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.black,
    borderWidth: 1,
  },
  social: {flexDirection: 'row', alignSelf: 'center', marginTop: '3%'},
  input: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.grey200,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: '5%',
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
  },
  inputs: {paddingHorizontal: '5%', marginTop: '10%'},
  eye: {
    fontSize: 16,
    fontFamily: 'Montserrat-Regular',
    width: '80%',
    height: '100%',
  },
  eyeinput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.grey200,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  animation: {
    height: 80,
    width: 80,
  },
});

export default Login;
