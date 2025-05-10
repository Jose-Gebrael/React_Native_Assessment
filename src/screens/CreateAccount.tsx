import React, {useState} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import styles from './CreateAccount.styles';
import {Button} from '../components/atoms/Button';
import {TextInput} from '../components/atoms/TextInput';
import {Title} from '../components/atoms/Title';
import {useNavigation} from '@react-navigation/native';
import {AppStackNavigationProp} from '../types/navigation.types';
import {
  createAccountSchema,
  CreateAccountSchemaFormData,
} from '../schemas/CreateAccountSchema';

export default function CreateAccount() {
  const navigation = useNavigation<AppStackNavigationProp>();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<CreateAccountSchemaFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: 'jaafar@gmail.com',
      password: 'jaafar123',
      name: 'Jaafar',
      phoneNumber: '12345678',
    },
  });

  const handleCreateAccount = async (data: CreateAccountSchemaFormData) => {
    setLoading(true);

    setTimeout(() => {
      navigation.navigate('OTP');
      setLoading(false);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Title text="Create your Account" textAlign="center" />
      <Text style={styles.subtitle}>Please enter your information below</Text>

      {/* Name Input */}
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              iconName="user"
              placeholder="Enter your name"
              value={value}
              onChangeText={onChange}
              autoCapitalize="words"
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
          </View>
        )}
      />

      {/* Phone Number Input */}
      <Controller
        control={control}
        name="phoneNumber"
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              iconName="phone"
              placeholder="Enter your phone number"
              value={value}
              onChangeText={onChange}
              isNumeric={true}
            />
            {errors.phoneNumber && (
              <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="username"
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              iconName="mail"
              placeholder="Enter your email"
              value={value}
              onChangeText={onChange}
              autoCapitalize="none"
            />
            {errors.username && (
              <Text style={styles.errorText}>{errors.username.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value}}) => (
          <View>
            <TextInput
              iconName="lock"
              placeholder="Enter your password"
              value={value}
              onChangeText={onChange}
              isPassword={true}
              autoCapitalize="none"
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#4CAF50"
          style={{marginTop: 16}}
        />
      ) : (
        <Button
          title="Create Account"
          onPress={handleSubmit(handleCreateAccount)}
          variant="confirm"
        />
      )}

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text onPress={() => navigation.goBack()} style={styles.linkText}>
          Sign in
        </Text>
      </Text>
    </View>
  );
}
