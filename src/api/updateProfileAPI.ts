// queries/updateProfileAPI.ts
import axios from 'axios';

export interface UpdateProfilePayload {
  firstName: string;
  lastName: string;
  profileImage?: {
    uri: string;
    name: string;
    type: string;
  };
  accessToken: string | null;
}

export const updateProfileAPI = async ({
  firstName,
  lastName,
  profileImage,
  accessToken,
}: UpdateProfilePayload) => {
  const formData = new FormData();
  formData.append('firstName', firstName);
  formData.append('lastName', lastName);

  if (profileImage) {
    formData.append('profileImage', {
      uri: profileImage.uri,
      name: profileImage.name,
      type: profileImage.type,
    } as any);
  }

  const response = await axios.put(
    'https://backend-practice.eurisko.me/api/user/profile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.data;
};
