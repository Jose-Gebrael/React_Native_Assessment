import axios from 'axios';

export interface CreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  profileImage?: {
    uri: string;
    name: string;
    type: string;
  };
}

export const createUserAPI = async (data: CreateUserPayload) => {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);

  if (data.profileImage) {
    formData.append('profileImage', {
      uri: data.profileImage.uri,
      name: data.profileImage.name,
      type: data.profileImage.type,
    } as any);
  }

  const response = await axios.post('https://backend-practice.eurisko.me/api/auth/signup', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
