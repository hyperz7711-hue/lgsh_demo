/**
 * 사용자 서비스 - 데모 모드 (Mock)
 */
import type { User, UserDetail, UserRequest, UserListRequest, ApiResponse, PageResponse } from '@/types';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_USERS: User[] = [
  { userId: 'admin', userNm: '관리자', companyId: 'C001', companyNm: '(주)한국전자', roleId: 'ROLE_ADMIN', roleNm: '시스템관리자', email: 'admin@lgsh.com', telNo: '02-1234-5678', useYn: 'Y', accountLockYn: 'N', failLoginCnt: 0, lastLoginDt: '2026-02-20T09:00:00', regDt: '2025-01-01T00:00:00' },
  { userId: 'manager', userNm: '김매니저', companyId: 'C001', companyNm: '(주)한국전자', roleId: 'ROLE_MANAGER', roleNm: '일반관리자', email: 'manager@lgsh.com', telNo: '02-1234-5679', useYn: 'Y', accountLockYn: 'N', failLoginCnt: 0, lastLoginDt: '2026-02-19T14:30:00', regDt: '2025-03-01T00:00:00' },
  { userId: 'user01', userNm: '이사원', companyId: 'C002', companyNm: '대한무역(주)', roleId: 'ROLE_USER', roleNm: '일반사용자', email: 'user01@lgsh.com', telNo: '031-1234-5001', useYn: 'Y', accountLockYn: 'N', failLoginCnt: 0, lastLoginDt: '2026-02-18T10:00:00', regDt: '2025-04-01T00:00:00' },
  { userId: 'user02', userNm: '박대리', companyId: 'C002', companyNm: '대한무역(주)', roleId: 'ROLE_USER', roleNm: '일반사용자', email: 'user02@lgsh.com', telNo: '031-1234-5002', useYn: 'Y', accountLockYn: 'N', failLoginCnt: 0, lastLoginDt: '2026-02-17T11:00:00', regDt: '2025-04-15T00:00:00' },
  { userId: 'user03', userNm: '최과장', companyId: 'C003', companyNm: '미래건설(주)', roleId: 'ROLE_USER', roleNm: '일반사용자', email: 'user03@lgsh.com', telNo: '051-1234-5003', useYn: 'Y', accountLockYn: 'N', failLoginCnt: 0, lastLoginDt: '2026-02-15T13:00:00', regDt: '2025-05-01T00:00:00' },
  { userId: 'user04', userNm: '정차장', companyId: 'C003', companyNm: '미래건설(주)', roleId: 'ROLE_USER', roleNm: '일반사용자', email: 'user04@lgsh.com', telNo: '051-1234-5004', useYn: 'N', accountLockYn: 'N', failLoginCnt: 0, lastLoginDt: undefined, regDt: '2025-06-01T00:00:00' },
  { userId: 'locked01', userNm: '한잠금', companyId: 'C001', companyNm: '(주)한국전자', roleId: 'ROLE_USER', roleNm: '일반사용자', email: 'locked01@lgsh.com', telNo: '02-9999-0001', useYn: 'Y', accountLockYn: 'Y', failLoginCnt: 5, lastLoginDt: '2026-02-10T08:00:00', regDt: '2025-07-01T00:00:00' },
  { userId: 'demo', userNm: '데모사용자', companyId: 'C001', companyNm: '(주)한국전자', roleId: 'ROLE_USER', roleNm: '일반사용자', email: 'demo@lgsh.com', telNo: '02-0000-0000', useYn: 'Y', accountLockYn: 'N', failLoginCnt: 0, lastLoginDt: '2026-02-20T09:00:00', regDt: '2025-01-01T00:00:00' },
];

export const userService = {
  list: async (params: UserListRequest): Promise<ApiResponse<PageResponse<User>>> => {
    await sleep(300);
    let filtered = [...MOCK_USERS];
    if (params.userId) filtered = filtered.filter((u) => u.userId.includes(params.userId!));
    if (params.userNm) filtered = filtered.filter((u) => u.userNm.includes(params.userNm!));
    if (params.companyId) filtered = filtered.filter((u) => u.companyId === params.companyId);
    if (params.roleId) filtered = filtered.filter((u) => u.roleId === params.roleId);
    if (params.useYn) filtered = filtered.filter((u) => u.useYn === params.useYn);
    if (params.accountLockYn) filtered = filtered.filter((u) => u.accountLockYn === params.accountLockYn);
    const page = params.page || 0;
    const size = params.size || 20;
    return {
      success: true,
      data: {
        content: filtered.slice(page * size, page * size + size),
        totalCount: filtered.length,
        page,
        size,
        totalPages: Math.ceil(filtered.length / size),
      },
      message: '',
      errorCode: null,
    };
  },

  get: async (userId: string): Promise<ApiResponse<User>> => {
    await sleep(200);
    const user = MOCK_USERS.find((u) => u.userId === userId);
    if (!user) return { success: false, data: null, message: '사용자를 찾을 수 없습니다.', errorCode: 'NOT_FOUND' };
    return { success: true, data: user, message: '', errorCode: null };
  },

  create: async (data: UserRequest): Promise<ApiResponse<User>> => {
    await sleep(400);
    const newUser: User = { ...data, useYn: data.useYn ?? 'Y', accountLockYn: 'N', failLoginCnt: 0, regDt: new Date().toISOString() };
    MOCK_USERS.push(newUser);
    return { success: true, data: newUser, message: '등록되었습니다.', errorCode: null };
  },

  update: async (_userId: string, _data: UserRequest): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '수정되었습니다.', errorCode: null };
  },

  delete: async (_userId: string): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '삭제되었습니다.', errorCode: null };
  },

  deleteBatch: async (userIds: string[]): Promise<ApiResponse<null>> => {
    await sleep(400);
    return { success: true, data: null, message: `${userIds.length}건이 삭제되었습니다.`, errorCode: null };
  },

  resetPassword: async (_userId: string): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '비밀번호가 초기화되었습니다.', errorCode: null };
  },

  changePassword: async (_userId: string, _newPassword: string): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '비밀번호가 변경되었습니다.', errorCode: null };
  },

  unlockAccount: async (_userId: string): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '계정 잠금이 해제되었습니다.', errorCode: null };
  },

  getDetail: async (userId: string): Promise<ApiResponse<UserDetail>> => {
    await sleep(300);
    const user = MOCK_USERS.find((u) => u.userId === userId) || MOCK_USERS[0];
    const detail: UserDetail = {
      ...user,
      loginHistory: [
        { userId, loginDt: '2026-02-20T09:00:00', loginIp: '192.168.1.100', loginResult: 'SUCCESS', sessionId: 'sess-001' },
        { userId, loginDt: '2026-02-19T14:30:00', loginIp: '192.168.1.100', loginResult: 'SUCCESS', sessionId: 'sess-002' },
        { userId, loginDt: '2026-02-18T10:00:00', loginIp: '192.168.1.101', loginResult: 'FAILED', failReason: '비밀번호 오류', sessionId: undefined },
      ],
      recentMenus: [
        { menuId: 'M020101', menuNm: '신용평가 실행', menuPath: '/credit/evaluate', lastAccessDt: '2026-02-20T09:05:00', accessCount: 28 },
        { menuId: 'M020201', menuNm: '등급 분포 조회', menuPath: '/credit/distribution', lastAccessDt: '2026-02-20T09:10:00', accessCount: 15 },
        { menuId: 'M010000', menuNm: '대시보드', menuPath: '/', lastAccessDt: '2026-02-20T09:00:00', accessCount: 82 },
      ],
    };
    return { success: true, data: detail, message: '', errorCode: null };
  },
};

export default userService;
