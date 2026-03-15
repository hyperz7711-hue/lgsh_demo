/**
 * 스파이더웹 분석 서비스 - 데모 모드 (Mock)
 * 화면 ID: SWB001
 */
import type {
  SpiderAnalyzeRequest,
  SpiderAnalysisResult,
  AiSummaryResult,
  SpiderPdfResponse,
  FilterOptionsResponse,
  PersonSearchItem,
} from '@/types/spider';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const spiderService = {
  analyze: async (request: SpiderAnalyzeRequest) => {
    await sleep(500);
    const result: SpiderAnalysisResult = {
      year: request.year,
      month: request.month,
      ctlYear: request.ctlYear ?? request.year,
      ctlMonth: request.ctlMonth ?? request.month,
      experiment: {
        label: '실험그룹',
        count: 312,
        avgScore: 718,
        avgGrade: 'B',
        axes: [
          { axis: '소득수준', key: 'income', value: 72 },
          { axis: '부채비율', key: 'debt', value: 58 },
          { axis: '자산보유', key: 'asset', value: 65 },
          { axis: '신용카드', key: 'card', value: 70 },
          { axis: '거주안정', key: 'home', value: 68 },
          { axis: '직업안정', key: 'job', value: 75 },
        ],
        conditions: request.experiment,
      },
      control: {
        label: '비교그룹',
        count: 285,
        avgScore: 652,
        avgGrade: 'C',
        axes: [
          { axis: '소득수준', key: 'income', value: 61 },
          { axis: '부채비율', key: 'debt', value: 48 },
          { axis: '자산보유', key: 'asset', value: 54 },
          { axis: '신용카드', key: 'card', value: 58 },
          { axis: '거주안정', key: 'home', value: 55 },
          { axis: '직업안정', key: 'job', value: 62 },
        ],
        conditions: request.control,
      },
      diff: [
        { axis: '소득수준', key: 'income', diff: 11 },
        { axis: '부채비율', key: 'debt', diff: 10 },
        { axis: '자산보유', key: 'asset', diff: 11 },
        { axis: '신용카드', key: 'card', diff: 12 },
        { axis: '거주안정', key: 'home', diff: 13 },
        { axis: '직업안정', key: 'job', diff: 13 },
      ],
    };
    return { success: true, data: result, code: '200', message: '' };
  },

  aiSummary: async (_analysisData: SpiderAnalysisResult) => {
    await sleep(800);
    const result: AiSummaryResult = {
      summary: '실험그룹은 비교그룹 대비 전반적으로 높은 신용 지표를 나타냅니다. 소득수준과 직업안정성 항목에서 가장 큰 차이를 보이며, 이는 신용점수 격차의 주요 원인으로 분석됩니다.',
      keyFindings: [
        { category: '소득', finding: '실험그룹의 평균 연소득이 비교그룹 대비 약 18% 높음', severity: 'HIGH' },
        { category: '부채', finding: '부채비율 차이가 10포인트로 신용 리스크 차등 발생', severity: 'MEDIUM' },
        { category: '자산', finding: '자산보유 현황에서 유의미한 격차 확인', severity: 'MEDIUM' },
      ],
      recommendations: [
        '비교그룹 대상자에 대한 소득 증대 지원 프로그램 검토',
        '부채 관리 상담 서비스 적극 활용 유도',
        '자산 형성을 위한 금융 상품 안내 강화',
      ],
      overallRisk: '보통',
      generatedAt: new Date().toISOString(),
    };
    return { success: true, data: result, code: '200', message: '' };
  },

  generatePdf: async (_request: any) => {
    await sleep(500);
    const response: SpiderPdfResponse = {
      pdfBase64: 'JVBERi0xLjQKJeLjz9MKMSAwIG9iag==', // minimal base64
      fileName: `spider_analysis_${Date.now()}.pdf`,
      fileSize: 248920,
      analysisSeq: 1,
    };
    return { success: true, data: response, code: '200', message: '' };
  },

  getFilterOptions: async () => {
    await sleep(200);
    const options: FilterOptionsResponse = {
      ageGroups: [
        { value: '20s', label: '20대' }, { value: '30s', label: '30대' },
        { value: '40s', label: '40대' }, { value: '50s', label: '50대' },
        { value: '60s', label: '60대 이상' },
      ],
      genders: [{ value: 'M', label: '남성' }, { value: 'F', label: '여성' }],
      regions: [
        { value: 'SEOUL', label: '서울' }, { value: 'GYEONGGI', label: '경기' },
        { value: 'INCHEON', label: '인천' }, { value: 'BUSAN', label: '부산' },
        { value: 'DAEGU', label: '대구' }, { value: 'OTHER', label: '기타' },
      ],
      jobCodes: [
        { value: 'OFFICE', label: '사무직' }, { value: 'TECH', label: '기술직' },
        { value: 'SERVICE', label: '서비스직' }, { value: 'SELF', label: '자영업' },
        { value: 'OTHER', label: '기타' },
      ],
      incomeRanges: [
        { value: 'UNDER30', label: '3천만원 미만', min: 0, max: 30000000 },
        { value: '30TO50', label: '3~5천만원', min: 30000000, max: 50000000 },
        { value: '50TO70', label: '5~7천만원', min: 50000000, max: 70000000 },
        { value: '70TO100', label: '7천~1억', min: 70000000, max: 100000000 },
        { value: 'OVER100', label: '1억 이상', min: 100000000, max: null },
      ],
    };
    return { success: true, data: options, code: '200', message: '' };
  },

  getHistory: async (_params: { companyId?: string; year?: number; page?: number; size?: number }) => {
    await sleep(300);
    return {
      success: true,
      data: {
        content: [
          { analysisSeq: 5, snapshotMonth: '2601', expCondition: '30대/남성', ctlCondition: '40대/남성', expCount: 142, ctlCount: 168, hasAiSummary: true, hasPdf: true, analysisUserNm: '관리자', regDt: '2026-02-19T14:30:00' },
          { analysisSeq: 4, snapshotMonth: '2512', expCondition: '서울/사무직', ctlCondition: '경기/서비스직', expCount: 215, ctlCount: 198, hasAiSummary: true, hasPdf: false, analysisUserNm: '관리자', regDt: '2026-01-15T10:20:00' },
          { analysisSeq: 3, snapshotMonth: '2511', expCondition: '연소득 5천~7천', ctlCondition: '연소득 3천~5천', expCount: 312, ctlCount: 285, hasAiSummary: false, hasPdf: false, analysisUserNm: '관리자', regDt: '2025-12-10T09:15:00' },
        ],
        totalCount: 3,
        page: 0,
        size: 10,
      },
      code: '200',
      message: '',
    };
  },

  searchPerson: async (keyword: string, _companyId?: string) => {
    await sleep(200);
    const persons: PersonSearchItem[] = [
      { personId: 'P0001', personNm: '김철수' },
      { personId: 'P0002', personNm: '이영희' },
      { personId: 'P0003', personNm: '박민준' },
    ].filter((p) => p.personNm.includes(keyword) || keyword === '');
    return { success: true, data: persons, code: '200', message: '' };
  },

  saveHistory: async (_request: any) => {
    await sleep(300);
    return { success: true, data: { analysisSeq: Date.now() }, code: '200', message: '' };
  },
};

export default spiderService;
