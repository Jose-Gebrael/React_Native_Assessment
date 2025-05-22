import React, {useCallback} from 'react';
import {View, Text, ActivityIndicator, ScrollView, Image} from 'react-native';
import styles from './Profile.styles';
import {Title} from '../components/atoms/Title';
import {useAuthStore} from '../store/authStore';
import {useThemeStore} from '../store/themeStore';
import {useGetProfileFetch} from '../queries/useGetProfileFetch';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {AppStackNavigationProp} from '../types/navigation.types';
import {Separator} from '../components/atoms/Separator';

const EditHeaderButton = ({
  disabled,
  onPress,
  color,
}: {
  disabled: boolean;
  onPress: () => void;
  color: string;
}) => (
  <Text
    onPress={disabled ? undefined : onPress}
    style={[styles.editText, disabled ? styles.disabled : {color}]}>
    Edit
  </Text>
);

const createEditHeaderButton =
  (disabled: boolean, onPress: () => void, color: string) => () =>
    <EditHeaderButton disabled={disabled} onPress={onPress} color={color} />;

export default function Profile() {
  const {colors} = useThemeStore();
  const {getAccessToken} = useAuthStore();
  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const navigation = useNavigation<AppStackNavigationProp>();

  React.useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    })();
  }, [getAccessToken]);

  const {data, isLoading, error, isFetching, refetch} =
    useGetProfileFetch(accessToken);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  React.useEffect(() => {
    const disabled = isLoading || isFetching || !data;

    navigation.setOptions({
      headerRight: createEditHeaderButton(
        disabled,
        () => navigation.navigate('ProfileEdit'),
        colors.textLinkColor,
      ),
    });
  }, [data, isLoading, isFetching, navigation, colors]);

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Profile" textAlign="left" />

      {(isLoading || isFetching) && (
        <ActivityIndicator size="large" color={colors.textLinkColor} />
      )}
      {error && <Text style={styles.errortext}>Failed to load profile</Text>}

      {data && (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.mainViewStyle}>
            {data.data.user.profileImage?.url ? (
              <Image
                source={{
                  uri: `https://backend-practice.eurisko.me${
                    data.data.user.profileImage.url
                  }?${new Date().getTime()}`,
                }}
                style={styles.profileImg}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.initialsBackground}>
                <Text style={styles.initialsStyle}>
                  {data.data.user.firstName?.charAt(0)}
                  {data.data.user.lastName?.charAt(0)}
                </Text>
              </View>
            )}
            <Text style={[styles.userName, {color: colors.textColor}]}>
              {data.data.user.firstName} {data.data.user.lastName}
            </Text>
            <Text style={[styles.subtitle, {color: colors.textColor}]}>
              Email:
            </Text>
            <Text style={[styles.userName, {color: colors.textColor}]}>
              {data.data.user.email}
            </Text>
            <Separator marginVertical={5} />
            <Separator marginVertical={5} />
          </View>
        </ScrollView>
      )}
    </View>
  );
}
