/**
 * 대상자 서비스 - 데모 모드 (Mock)
 */
import type {
  PersonFull,
  PersonRequest,
  PersonSearchParams,
  PersonListResponse,
  PersonCardSearchParams,
  PersonCardListResponse,
  ApiResponse,
} from '@/types';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 등급별 색상
const GRADE_COLOR: Record<string, string> = {
  A: '#52c41a', B: '#1890ff', C: '#faad14', D: '#fa8c16', E: '#f5222d',
};
const GRADE_NM: Record<string, string> = {
  A: '최우량', B: '우량', C: '보통', D: '주의', E: '위험',
};

// Mock 대상자 데이터 (20명)
const MOCK_PERSONS: PersonFull[] = [
  { personId: 'P0001', companyId: 'C001', companyNm: '(주)한국전자', personNo: 'EMP-001', personNm: '김철수', gender: 'M', birthDt: '1982-05-15', annualIncome: 55000000, personGrp: 'GRP-A', personGrpNm: '일반그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 2, educationCode: 'UNI', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 120000000, debtAmt: 35000000, creditCardCnt: 3 },
  { personId: 'P0002', companyId: 'C001', companyNm: '(주)한국전자', personNo: 'EMP-002', personNm: '이영희', gender: 'F', birthDt: '1990-08-22', annualIncome: 42000000, personGrp: 'GRP-A', personGrpNm: '일반그룹', useYn: 'Y', marriageYn: 'N', childrenCnt: 0, educationCode: 'UNI', homeTypeCode: 'RENT', carYn: 'N', assetAmt: 45000000, debtAmt: 18000000, creditCardCnt: 2 },
  { personId: 'P0003', companyId: 'C002', companyNm: '대한무역(주)', personNo: 'TRD-001', personNm: '박민준', gender: 'M', birthDt: '1978-03-10', annualIncome: 68000000, personGrp: 'GRP-B', personGrpNm: '우수그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 3, educationCode: 'GRAD', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 230000000, debtAmt: 52000000, creditCardCnt: 4 },
  { personId: 'P0004', companyId: 'C002', companyNm: '대한무역(주)', personNo: 'TRD-002', personNm: '최지수', gender: 'F', birthDt: '1995-11-05', annualIncome: 35000000, personGrp: 'GRP-A', personGrpNm: '일반그룹', useYn: 'Y', marriageYn: 'N', childrenCnt: 0, educationCode: 'UNI', homeTypeCode: 'LEASE', carYn: 'N', assetAmt: 22000000, debtAmt: 12000000, creditCardCnt: 1 },
  { personId: 'P0005', companyId: 'C003', companyNm: '미래건설(주)', personNo: 'CON-001', personNm: '정우성', gender: 'M', birthDt: '1985-07-20', annualIncome: 72000000, personGrp: 'GRP-B', personGrpNm: '우수그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 1, educationCode: 'GRAD', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 185000000, debtAmt: 45000000, creditCardCnt: 5 },
  { personId: 'P0006', companyId: 'C001', companyNm: '(주)한국전자', personNo: 'EMP-003', personNm: '강민서', gender: 'F', birthDt: '1992-02-28', annualIncome: 38000000, personGrp: 'GRP-A', personGrpNm: '일반그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 1, educationCode: 'UNI', homeTypeCode: 'RENT', carYn: 'Y', assetAmt: 38000000, debtAmt: 25000000, creditCardCnt: 2 },
  { personId: 'P0007', companyId: 'C003', companyNm: '미래건설(주)', personNo: 'CON-002', personNm: '윤재현', gender: 'M', birthDt: '1975-09-14', annualIncome: 82000000, personGrp: 'GRP-B', personGrpNm: '우수그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 2, educationCode: 'GRAD', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 320000000, debtAmt: 68000000, creditCardCnt: 6 },
  { personId: 'P0008', companyId: 'C002', companyNm: '대한무역(주)', personNo: 'TRD-003', personNm: '임소연', gender: 'F', birthDt: '1988-04-03', annualIncome: 46000000, personGrp: 'GRP-A', personGrpNm: '일반그룹', useYn: 'Y', marriageYn: 'N', childrenCnt: 0, educationCode: 'UNI', homeTypeCode: 'OWN', carYn: 'N', assetAmt: 62000000, debtAmt: 22000000, creditCardCnt: 3 },
  { personId: 'P0009', companyId: 'C001', companyNm: '(주)한국전자', personNo: 'EMP-004', personNm: '조현우', gender: 'M', birthDt: '1980-12-18', annualIncome: 58000000, personGrp: 'GRP-B', personGrpNm: '우수그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 2, educationCode: 'UNI', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 145000000, debtAmt: 38000000, creditCardCnt: 4 },
  { personId: 'P0010', companyId: 'C003', companyNm: '미래건설(주)', personNo: 'CON-003', personNm: '한지민', gender: 'F', birthDt: '1997-06-25', annualIncome: 28000000, personGrp: 'GRP-C', personGrpNm: '관리그룹', useYn: 'Y', marriageYn: 'N', childrenCnt: 0, educationCode: 'HIGH', homeTypeCode: 'RENT', carYn: 'N', assetAmt: 8000000, debtAmt: 28000000, creditCardCnt: 2 },
  { personId: 'P0011', companyId: 'C002', companyNm: '대한무역(주)', personNo: 'TRD-004', personNm: '서준호', gender: 'M', birthDt: '1983-01-07', annualIncome: 64000000, personGrp: 'GRP-B', personGrpNm: '우수그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 1, educationCode: 'GRAD', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 175000000, debtAmt: 42000000, creditCardCnt: 4 },
  { personId: 'P0012', companyId: 'C001', companyNm: '(주)한국전자', personNo: 'EMP-005', personNm: '오채원', gender: 'F', birthDt: '1993-10-30', annualIncome: 32000000, personGrp: 'GRP-C', personGrpNm: '관리그룹', useYn: 'Y', marriageYn: 'N', childrenCnt: 0, educationCode: 'UNI', homeTypeCode: 'LEASE', carYn: 'N', assetAmt: 15000000, debtAmt: 32000000, creditCardCnt: 3 },
  { personId: 'P0013', companyId: 'C003', companyNm: '미래건설(주)', personNo: 'CON-004', personNm: '남기준', gender: 'M', birthDt: '1971-03-22', annualIncome: 95000000, personGrp: 'GRP-B', personGrpNm: '우수그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 3, educationCode: 'GRAD', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 480000000, debtAmt: 85000000, creditCardCnt: 7 },
  { personId: 'P0014', companyId: 'C002', companyNm: '대한무역(주)', personNo: 'TRD-005', personNm: '류지은', gender: 'F', birthDt: '1987-08-14', annualIncome: 51000000, personGrp: 'GRP-A', personGrpNm: '일반그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 2, educationCode: 'UNI', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 98000000, debtAmt: 31000000, creditCardCnt: 3 },
  { personId: 'P0015', companyId: 'C001', companyNm: '(주)한국전자', personNo: 'EMP-006', personNm: '황도윤', gender: 'M', birthDt: '1991-05-09', annualIncome: 44000000, personGrp: 'GRP-A', personGrpNm: '일반그룹', useYn: 'Y', marriageYn: 'N', childrenCnt: 0, educationCode: 'UNI', homeTypeCode: 'RENT', carYn: 'N', assetAmt: 35000000, debtAmt: 19000000, creditCardCnt: 2 },
  { personId: 'P0016', companyId: 'C003', companyNm: '미래건설(주)', personNo: 'CON-005', personNm: '전민아', gender: 'F', birthDt: '1984-11-28', annualIncome: 59000000, personGrp: 'GRP-B', personGrpNm: '우수그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 1, educationCode: 'GRAD', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 152000000, debtAmt: 40000000, creditCardCnt: 4 },
  { personId: 'P0017', companyId: 'C002', companyNm: '대한무역(주)', personNo: 'TRD-006', personNm: '김도현', gender: 'M', birthDt: '1976-07-01', annualIncome: 76000000, personGrp: 'GRP-B', personGrpNm: '우수그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 2, educationCode: 'GRAD', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 265000000, debtAmt: 58000000, creditCardCnt: 5 },
  { personId: 'P0018', companyId: 'C001', companyNm: '(주)한국전자', personNo: 'EMP-007', personNm: '박수빈', gender: 'F', birthDt: '1998-02-14', annualIncome: 25000000, personGrp: 'GRP-C', personGrpNm: '관리그룹', useYn: 'Y', marriageYn: 'N', childrenCnt: 0, educationCode: 'UNI', homeTypeCode: 'RENT', carYn: 'N', assetAmt: 5000000, debtAmt: 22000000, creditCardCnt: 1 },
  { personId: 'P0019', companyId: 'C003', companyNm: '미래건설(주)', personNo: 'CON-006', personNm: '이태양', gender: 'M', birthDt: '1982-09-17', annualIncome: 63000000, personGrp: 'GRP-B', personGrpNm: '우수그룹', useYn: 'Y', marriageYn: 'Y', childrenCnt: 2, educationCode: 'GRAD', homeTypeCode: 'OWN', carYn: 'Y', assetAmt: 198000000, debtAmt: 47000000, creditCardCnt: 4 },
  { personId: 'P0020', companyId: 'C002', companyNm: '대한무역(주)', personNo: 'TRD-007', personNm: '신유나', gender: 'F', birthDt: '1994-04-20', annualIncome: 39000000, personGrp: 'GRP-A', personGrpNm: '일반그룹', useYn: 'Y', marriageYn: 'N', childrenCnt: 0, educationCode: 'UNI', homeTypeCode: 'LEASE', carYn: 'N', assetAmt: 28000000, debtAmt: 16000000, creditCardCnt: 2 },
];

// 신용점수/등급 결합
const SCORE_DATA: Record<string, { score: number; grade: string }> = {
  P0001: { score: 762, grade: 'B' }, P0002: { score: 628, grade: 'C' },
  P0003: { score: 845, grade: 'A' }, P0004: { score: 542, grade: 'D' },
  P0005: { score: 878, grade: 'A' }, P0006: { score: 615, grade: 'C' },
  P0007: { score: 912, grade: 'A' }, P0008: { score: 688, grade: 'C' },
  P0009: { score: 785, grade: 'B' }, P0010: { score: 498, grade: 'D' },
  P0011: { score: 832, grade: 'A' }, P0012: { score: 512, grade: 'D' },
  P0013: { score: 965, grade: 'A' }, P0014: { score: 718, grade: 'B' },
  P0015: { score: 652, grade: 'C' }, P0016: { score: 798, grade: 'B' },
  P0017: { score: 862, grade: 'A' }, P0018: { score: 445, grade: 'E' },
  P0019: { score: 822, grade: 'A' }, P0020: { score: 595, grade: 'C' },
};

export const personService = {
  list: async (params: PersonSearchParams): Promise<ApiResponse<PersonListResponse>> => {
    await sleep(300);
    let filtered = [...MOCK_PERSONS];
    if (params.companyId) filtered = filtered.filter((p) => p.companyId === params.companyId);
    if (params.personNm) filtered = filtered.filter((p) => p.personNm.includes(params.personNm!));
    if (params.personGrp) filtered = filtered.filter((p) => p.personGrp === params.personGrp);
    if (params.useYn) filtered = filtered.filter((p) => p.useYn === params.useYn);
    const page = params.page ?? 0;
    const size = params.size ?? 20;
    const start = page * size;
    return {
      success: true,
      data: { content: filtered.slice(start, start + size), totalCount: filtered.length, page, size },
      message: '',
      errorCode: null,
    };
  },

  get: async (personId: string): Promise<ApiResponse<PersonFull>> => {
    await sleep(200);
    const person = MOCK_PERSONS.find((p) => p.personId === personId);
    if (!person) return { success: false, data: null, message: '대상자를 찾을 수 없습니다.', errorCode: 'NOT_FOUND' };
    return { success: true, data: person, message: '', errorCode: null };
  },

  getName: async (personId: string): Promise<ApiResponse<{ personNm?: string }>> => {
    await sleep(100);
    const person = MOCK_PERSONS.find((p) => p.personId === personId);
    return { success: true, data: { personNm: person?.personNm }, message: '', errorCode: null };
  },

  create: async (data: PersonRequest): Promise<ApiResponse<PersonFull>> => {
    await sleep(400);
    const newPerson: PersonFull = { ...data, personId: `P${String(MOCK_PERSONS.length + 1).padStart(4, '0')}`, useYn: 'Y' };
    MOCK_PERSONS.push(newPerson);
    return { success: true, data: newPerson, message: '등록되었습니다.', errorCode: null };
  },

  update: async (_personId: string, _data: PersonRequest): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '수정되었습니다.', errorCode: null };
  },

  delete: async (_personId: string): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '삭제되었습니다.', errorCode: null };
  },

  cardList: async (params: PersonCardSearchParams): Promise<ApiResponse<PersonCardListResponse>> => {
    await sleep(350);
    const page = params.page ?? 0;
    const size = params.size ?? 12;
    let filtered = MOCK_PERSONS;
    if (params.companyId) filtered = filtered.filter((p) => p.companyId === params.companyId);
    if (params.personNm) filtered = filtered.filter((p) => p.personNm.includes(params.personNm!));
    if (params.creditGrade) filtered = filtered.filter((p) => SCORE_DATA[p.personId]?.grade === params.creditGrade);
    const content = filtered.slice(page * size, page * size + size).map((p) => {
      const sd = SCORE_DATA[p.personId] || { score: null, grade: null };
      return {
        personId: p.personId, personNo: p.personNo, personNm: p.personNm, gender: p.gender,
        companyId: p.companyId, companyNm: p.companyNm, personGrp: p.personGrp, personGrpNm: p.personGrpNm,
        useYn: p.useYn ?? 'Y', creditScore: sd.score, creditGrade: sd.grade,
        creditGradeNm: sd.grade ? GRADE_NM[sd.grade] : null,
        gradeColor: sd.grade ? GRADE_COLOR[sd.grade] : null,
        scoreDt: sd.score ? '2026-01-31' : null,
      };
    });
    return {
      success: true,
      data: { content, totalCount: filtered.length, page, size, totalPages: Math.ceil(filtered.length / size) },
      message: '',
      errorCode: null,
    };
  },

  cardListSeek: async (params: PersonCardSearchParams): Promise<ApiResponse<PersonCardListResponse>> => {
    // Reuse cardList for demo (seek pagination not critical in mock)
    return personService.cardList(params);
  },

  deleteBatch: async (personIds: string[]): Promise<ApiResponse<null>> => {
    await sleep(400);
    return { success: true, data: null, message: `${personIds.length}건이 삭제되었습니다.`, errorCode: null };
  },

  batchUpdateGrp: async (_personIds: string[], _personGrp: string): Promise<ApiResponse<{ successCount: number; totalCount: number }>> => {
    await sleep(300);
    return { success: true, data: { successCount: _personIds.length, totalCount: _personIds.length }, message: '', errorCode: null };
  },

  batchUpdateGrpByCriteria: async (_searchParams: PersonSearchParams, _personGrp: string): Promise<ApiResponse<{ successCount: number; message: string }>> => {
    await sleep(300);
    return { success: true, data: { successCount: 10, message: '10건 처리되었습니다.' }, message: '', errorCode: null };
  },
};

export default personService;
