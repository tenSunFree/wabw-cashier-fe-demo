import apiClient from '@/lib/axios'
import { type SignInPayload, type SignUpPayload } from '@/schemas/auth.schema'

// interfaces
interface SignInResponse {
  access_token: string
  refresh_token: string
}

export interface SignInResult {
  accessToken: string
  refreshToken: string
}

interface SignUpResponse {
  id: string
  status: string
  message: string
}

//
export const signUpService = async (
  data: SignUpPayload,
): Promise<SignUpResponse> => {
  try {
    const response = await apiClient.post<SignUpResponse>('/auth/sign-up', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const signInService = async (
  data: SignInPayload,
): Promise<SignInResult> => {
  console.log('signInService, data:', data)
  try {
    // temporary endpoint api
    const response = await apiClient.post<SignInResponse>('/auth/login', data)
    console.log('signInService, response:', response)
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    }
  } catch (error) {
    throw error
  }
}

// export const getProfileService = async () => { ... };
