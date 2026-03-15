/**
 * 원청사 서비스 - 데모 모드 (Mock)
 */
import type { Company, CompanyListRequest, CompanyRequest, CompanyListResponse, ApiResponse } from '@/types';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_COMPANIES: Company[] = [
  { companyId: 'C001', companyNm: '(주)한국전자', companyType: 'PROD', companyTypeNm: '운영', businessNo: '123-45-67890', ceoNm: '김대표', telNo: '02-1234-5678', email: 'info@hkelectronics.com', address: '서울시 강남구 테헤란로 123', contractStartDt: '2024-01-01', contractEndDt: '2026-12-31', contractStatus: 'ACTIVE', contractStatusNm: '계약중', useYn: 'Y', regDt: '2024-01-01T00:00:00' },
  { companyId: 'C002', companyNm: '대한무역(주)', companyType: 'PROD', companyTypeNm: '운영', businessNo: '234-56-78901', ceoNm: '이대표', telNo: '031-1234-5678', email: 'info@dhtrade.com', address: '경기도 성남시 분당구 판교로 456', contractStartDt: '2024-03-01', contractEndDt: '2026-12-31', contractStatus: 'ACTIVE', contractStatusNm: '계약중', useYn: 'Y', regDt: '2024-03-01T00:00:00' },
  { companyId: 'C003', companyNm: '미래건설(주)', companyType: 'PROD', companyTypeNm: '운영', businessNo: '345-67-89012', ceoNm: '박대표', telNo: '051-1234-5678', email: 'info@mrconstruct.com', address: '부산시 해운대구 센텀로 789', contractStartDt: '2024-06-01', contractEndDt: '2027-05-31', contractStatus: 'ACTIVE', contractStatusNm: '계약중', useYn: 'Y', regDt: '2024-06-01T00:00:00' },
  { companyId: 'C004', companyNm: '신한서비스(주)', companyType: 'DEMO', companyTypeNm: '데모', businessNo: '456-78-90123', ceoNm: '최대표', telNo: '02-9876-5432', email: 'info@shinhan-svc.com', address: '서울시 중구 을지로 100', contractStartDt: '2025-01-01', contractEndDt: '2025-12-31', contractStatus: 'EXPIRED', contractStatusNm: '계약만료', useYn: 'N', regDt: '2025-01-01T00:00:00' },
];

export const companyService = {
  list: async (params?: CompanyListRequest): Promise<ApiResponse<CompanyListResponse>> => {
    await sleep(300);
    let filtered = [...MOCK_COMPANIES];
    if (params?.keyword) filtered = filtered.filter((c) => c.companyNm.includes(params.keyword!) || c.companyId.includes(params.keyword!));
    if (params?.companyType) filtered = filtered.filter((c) => c.companyType === params.companyType);
    if (params?.contractStatus) filtered = filtered.filter((c) => c.contractStatus === params.contractStatus);
    if (params?.useYn) filtered = filtered.filter((c) => c.useYn === params.useYn);
    return { success: true, data: { content: filtered, totalCount: filtered.length }, message: '', errorCode: null };
  },

  combo: async (_useYn?: string): Promise<ApiResponse<Company[]>> => {
    await sleep(200);
    const list = MOCK_COMPANIES.filter((c) => !_useYn || c.useYn === _useYn);
    return { success: true, data: list, message: '', errorCode: null };
  },

  get: async (companyId: string): Promise<ApiResponse<Company>> => {
    await sleep(200);
    const company = MOCK_COMPANIES.find((c) => c.companyId === companyId);
    if (!company) return { success: false, data: null, message: '원청사를 찾을 수 없습니다.', errorCode: 'NOT_FOUND' };
    return { success: true, data: company, message: '', errorCode: null };
  },

  create: async (data: CompanyRequest): Promise<ApiResponse<{ companyId: string }>> => {
    await sleep(400);
    const newCompany: Company = { ...data, useYn: data.useYn ?? 'Y', regDt: new Date().toISOString() };
    MOCK_COMPANIES.push(newCompany);
    return { success: true, data: { companyId: data.companyId }, message: '등록되었습니다.', errorCode: null };
  },

  update: async (_companyId: string, _data: CompanyRequest): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '수정되었습니다.', errorCode: null };
  },

  delete: async (_companyId: string): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '삭제되었습니다.', errorCode: null };
  },

  deleteBatch: async (companyIds: string[]): Promise<void> => {
    await sleep(400);
    console.log(`Mock: ${companyIds.length}건 삭제`);
  },
};

export default companyService;
