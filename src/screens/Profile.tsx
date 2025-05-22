import React from 'react';
import {View, Text, ActivityIndicator, ScrollView, Image} from 'react-native';
import styles from './Profile.styles'; // reuse container styles
import {Title} from '../components/atoms/Title';
import {useAuthStore} from '../store/authStore';
import {useThemeStore} from '../store/themeStore';
import {useGetProfileFetch} from '../queries/useGetProfileFetch';

export default function Profile() {
  const {colors} = useThemeStore();
  const {getAccessToken} = useAuthStore();
  const [accessToken, setAccessToken] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    })();
  }, [getAccessToken]);

  const {data, isLoading, error} = useGetProfileFetch(accessToken);

  return (
    <View style={[styles.container, {backgroundColor: colors.appBackground}]}>
      <Title text="Profile" textAlign="left" />

      {isLoading && (
        <ActivityIndicator size="large" color={colors.textLinkColor} />
      )}
      {error && <Text style={styles.errortext}>Failed to load profile</Text>}

      {data && (
        <ScrollView contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.mainViewStyle}>
            {data.data.user.profileImage?.url ? (
              <Image
                source={{
                  uri: `https://backend-practice.eurisko.me${data.data.user.profileImage.url}`,
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
          </View>
        </ScrollView>
      )}
    </View>
  );
}
