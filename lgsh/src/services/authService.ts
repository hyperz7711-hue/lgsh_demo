/**
 * 인증 서비스 - 데모 모드 (Mock)
 * 백엔드 없이 동작하는 데모용 인증 서비스
 */
import type { LoginRequest, LoginResponse, RefreshTokenResponse, ApiResponse } from '@/types';

const MOCK_USERS: Record<string, {
  userId: string; password: string; userNm: string; email: string;
  roleId: string; roleNm: string; companyId: string; companyNm: string;
}> = {
  admin: {
    userId: 'admin', password: 'password123', userNm: '홍길동',
    email: 'admin@lgsh.com', roleId: 'ADMIN', roleNm: '관리자',
    companyId: '', companyNm: '로지신해',
  },
  manager: {
    userId: 'manager', password: 'password123', userNm: '김매니저',
    email: 'manager@lgsh.com', roleId: 'MANAGER', roleNm: '매니저',
    companyId: 'COMP_001', companyNm: '로지신해금융',
  },
  demo: {
    userId: 'demo', password: 'demo1234', userNm: '데모사용자',
    email: 'demo@lgsh.com', roleId: 'USER', roleNm: '일반사용자',
    companyId: 'COMP_001', companyNm: '로지신해금융',
  },
};

export const authService = {
  login: async (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const user = MOCK_USERS[data.userId];
    if (!user || user.password !== data.password) {
      throw { response: { data: { message: '아이디 또는 비밀번호가 일치하지 않습니다.' } } };
    }
    const { password: _pw, ...userInfo } = user;
    return {
      success: true,
      data: {
        user: userInfo,
        accessToken: `demo-access-token-${Date.now()}`,
        refreshToken: `demo-refresh-token-${Date.now()}`,
      },
      message: '로그인 성공',
      errorCode: null,
    };
  },

  logout: async (): Promise<ApiResponse<null>> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return { success: true, data: null, message: '로그아웃 성공', errorCode: null };
  },

  refresh: async (_refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      success: true,
      data: {
        accessToken: `demo-access-token-${Date.now()}`,
        refreshToken: `demo-refresh-token-${Date.now()}`,
      },
      message: '토큰 갱신 성공',
      errorCode: null,
    };
  },
};

export default authService;
