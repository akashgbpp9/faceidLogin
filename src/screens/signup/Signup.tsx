import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// import {useSignup} from '@/Hooks/useSignup';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import Eye from '@/assets/svg/eye-slash.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppNavigationProps} from '@/navigators/Navigation';
import {Text, theme} from '@/components/theme';

const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid Email Address')
    .required('Email is Required'),
  name: Yup.string().required('Name is required'),
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

const Signup = ({navigation}: AppNavigationProps<'Signup'>) => {
  const [pass, setpass] = useState(true);
  const [referral, setreferral] = useState(false);
  //   const {mutate} = useSignup({
  //     onError(error) {
  //       showToast(ERROR_TOAST, error.errors[0], TOP);
  //       setSubmitting(false);
  //     },
  //     onSuccess(data) {
  //       showToast(SUCCESS_TOAST, data.message, TOP);
  //       setSubmitting(false);
  //       navigation.navigate('Otp', {flag: 0, email: email} as any);
  //     },
  //   });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    validationSchema: SignupSchema,
    initialValues: {
      email: '',
      name: '',
      password: '',
      referral_code: '',
    },
    onSubmit: value => {
      //   mutate({
      //     email: value.email,
      //     phone_no: null,
      //     password: value.password,
      //     name: value.name,
      //     referral_code: value.referral_code ? value.referral_code : null,
      //   });
      navigation.navigate('Otp');
    },
  });

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <Image source={require('@/assets/images/bird.png')} style={styles.img1} />
      <Text
        mt="l"
        variant="pockota24black_medium"
        color="brandColor"
        textAlign="center">
        Create my account
      </Text>
      <View style={styles.inputs}>
        <Text mb="s" variant="title14black_semibold">
          Name
        </Text>
        <TextInput
          placeholder="Enter name"
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          placeholderTextColor={theme.colors.grey400}
          style={styles.input}
        />
        {errors.name && touched.name && (
          <Text
            ms="xs"
            variant="title14black_semibold"
            mt="xs"
            fontSize={12}
            color="error">
            {errors.name as string}
          </Text>
        )}
        <Text mb="s" mt="m" variant="title14black_semibold">
          Email
        </Text>
        <TextInput
          placeholder="Enter email"
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          placeholderTextColor={theme.colors.grey400}
          style={styles.input}
          keyboardType="email-address"
          autoComplete="email"
          autoCapitalize="none"
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
        <Text mb="s" mt="m" variant="title14black_semibold">
          Password
        </Text>
        <View style={styles.eyeinput}>
          <TextInput
            placeholder="Enter new password"
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
        <TouchableOpacity
          style={styles.btn}
          disabled={isSubmitting}
          onPress={handleSubmit as () => void}>
          {isSubmitting ? (
            <ActivityIndicator color={theme.colors.black} />
          ) : (
            <Text variant="title14black_semibold" color="black">
              Create Account
            </Text>
          )}
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
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Login');
          }}
          style={styles.login}>
          <Text
            color="grey400"
            variant="title14black_semibold"
            textAlign="center"
            mb="l">
            Already have an account?{' '}
            <Text color="brandColor" variant="title14black_bold">
              Login Here
            </Text>
          </Text>
        </Pressable>
      </View>
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
    backgroundColor: '#E8F8FF',
    paddingHorizontal: '4%',
    paddingVertical: '1.5%',
    borderRadius: 8,
    marginTop: '3%',
  },
  social: {flexDirection: 'row', alignSelf: 'center', marginTop: '3%'},
  referral: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '3%',
  },
  login: {marginTop: 10},
  eye: {
    fontSize: 14,
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
  btn: {
    height: 42,
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.black,
    borderWidth: 1,
    marginTop: '5%',
  },
  btn2: {
    height: 46,
    borderRadius: 8,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.grey300,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: '7%',
    marginRight: '2%',
  },
  img: {alignSelf: 'center', marginVertical: '5%'},
  input: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.input,
    borderWidth: 1,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: '5%',
    fontSize: 14,
    fontFamily: 'Montserrat-Medium',
  },
  inputs: {paddingHorizontal: '5%', marginTop: '10%'},
  animation: {
    height: 80,
    width: 80,
  },
});

export default Signup;
