/**
 * 월간레포트 서비스 - 데모 모드 (Mock)
 */
import type {
  ReportItem,
  ReportItemCreateRequest,
  ReportItemUpdateRequest,
  ReportItemSelectRequest,
  SelectedItem,
  ReportGenerateRequest,
  ReportPreviewRequest,
  ReportHistoryResponse,
  MonthlyClose,
  CloseCancelRequest,
  CloseChangeHistory,
  ReportYearlyStats,
  AiSummaryResponse,
} from '@/types';
import type { ApiResponse } from '@/types';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Mock 레포트 항목
const MOCK_ITEMS: ReportItem[] = [
  { itemId: 'ITEM-001', itemNm: '신용등급 분포', itemDesc: '월간 신용등급별 대상자 분포 현황', itemCategory: 'CHART', chartType: 'PIE', isRequired: true, displayOrder: 1, itemOrder: 1, iconClass: 'PieChartOutlined', status: 'REQUIRED', defaultStatus: 'REQUIRED', useYn: 'Y', dataSource: 'FIXED' },
  { itemId: 'ITEM-002', itemNm: '신용점수 추이', itemDesc: '월별 평균 신용점수 변화 추이', itemCategory: 'CHART', chartType: 'LINE', isRequired: false, displayOrder: 2, itemOrder: 2, iconClass: 'LineChartOutlined', status: 'SELECTED', defaultStatus: 'AVAILABLE', useYn: 'Y', dataSource: 'FIXED' },
  { itemId: 'ITEM-003', itemNm: '평가 통계 요약', itemDesc: '월간 신용평가 핵심 통계 요약', itemCategory: 'SUMMARY', chartType: 'TEXT', isRequired: true, displayOrder: 3, itemOrder: 3, iconClass: 'BarChartOutlined', status: 'REQUIRED', defaultStatus: 'REQUIRED', useYn: 'Y', dataSource: 'FIXED' },
  { itemId: 'ITEM-004', itemNm: '등급 이동 현황', itemDesc: '전월 대비 신용등급 변화 현황', itemCategory: 'CHART', chartType: 'BAR', isRequired: false, displayOrder: 4, itemOrder: 4, iconClass: 'SwapOutlined', status: 'SELECTED', defaultStatus: 'AVAILABLE', useYn: 'Y', dataSource: 'FIXED' },
  { itemId: 'ITEM-005', itemNm: '신규/이탈 현황', itemDesc: '신규 평가 대상 및 이탈 현황', itemCategory: 'STAT', chartType: 'TABLE', isRequired: false, displayOrder: 5, itemOrder: 5, iconClass: 'TeamOutlined', status: 'SELECTED', defaultStatus: 'AVAILABLE', useYn: 'Y', dataSource: 'FIXED' },
  { itemId: 'ITEM-006', itemNm: '위험 등급 상세', itemDesc: 'D등급·E등급 대상자 상세 현황', itemCategory: 'LIST', chartType: 'TABLE', isRequired: false, displayOrder: 6, itemOrder: 6, iconClass: 'WarningOutlined', status: 'EXCLUDED', defaultStatus: 'AVAILABLE', useYn: 'Y', dataSource: 'FIXED' },
];

// 사용자 선택 상태 (localStorage 기반)
const SELECTION_KEY = 'demo_report_selections';
let _userSelections: Record<string, SelectedItem[]> = {};

const loadSelections = () => {
  try {
    const raw = localStorage.getItem(SELECTION_KEY);
    if (raw) _userSelections = JSON.parse(raw);
  } catch { /* ignore */ }
};
const saveSelections = () => {
  try { localStorage.setItem(SELECTION_KEY, JSON.stringify(_userSelections)); } catch { /* ignore */ }
};
loadSelections();

// Mock 이력
const MOCK_HISTORY_BASE = [
  { reportSeq: 5, companyId: 'C001', year: 2026, month: 1, title: '2026년 1월 신용평가 월간 보고서', genStatus: 'COMPLETED', filePath: '/reports/2026/01/report.pdf', fileNm: '2026년1월_신용평가_보고서.pdf', fileSize: 2485120, pageCnt: 18, errorMsg: null, createdBy: 'admin', createdByNm: '관리자', createdDt: '2026-02-05T10:30:00', completedDt: '2026-02-05T10:32:15' },
  { reportSeq: 4, companyId: 'C001', year: 2025, month: 12, title: '2025년 12월 신용평가 월간 보고서', genStatus: 'COMPLETED', filePath: '/reports/2025/12/report.pdf', fileNm: '2025년12월_신용평가_보고서.pdf', fileSize: 2318430, pageCnt: 16, errorMsg: null, createdBy: 'admin', createdByNm: '관리자', createdDt: '2026-01-06T14:15:00', completedDt: '2026-01-06T14:17:42' },
  { reportSeq: 3, companyId: 'C002', year: 2026, month: 1, title: '2026년 1월 대한무역 보고서', genStatus: 'COMPLETED', filePath: '/reports/2026/01/report_c002.pdf', fileNm: '2026년1월_대한무역_보고서.pdf', fileSize: 1982430, pageCnt: 14, errorMsg: null, createdBy: 'manager', createdByNm: '김매니저', createdDt: '2026-02-08T09:00:00', completedDt: '2026-02-08T09:01:52' },
  { reportSeq: 2, companyId: 'C001', year: 2025, month: 11, title: '2025년 11월 신용평가 월간 보고서', genStatus: 'COMPLETED', filePath: '/reports/2025/11/report.pdf', fileNm: '2025년11월_신용평가_보고서.pdf', fileSize: 2215320, pageCnt: 15, errorMsg: null, createdBy: 'admin', createdByNm: '관리자', createdDt: '2025-12-05T11:20:00', completedDt: '2025-12-05T11:22:30' },
  { reportSeq: 1, companyId: 'C001', year: 2025, month: 10, title: '2025년 10월 신용평가 월간 보고서', genStatus: 'FAILED', filePath: null, fileNm: null, fileSize: null, pageCnt: null, errorMsg: '데이터 조회 오류', createdBy: 'admin', createdByNm: '관리자', createdDt: '2025-11-05T09:00:00', completedDt: null },
];

// Mock 마감 상태
const _closeStatus: Record<string, MonthlyClose> = {
  '2026-01': { companyId: 'C001', year: 2026, month: 1, closeStatus: 'CLOSED', closedDt: '2026-02-10T10:00:00', closedBy: 'admin', closedByNm: '관리자', closeNote: '정상 마감', canCancel: true, closeSeq: 1 },
  '2025-12': { companyId: 'C001', year: 2025, month: 12, closeStatus: 'CLOSED', closedDt: '2026-01-10T10:00:00', closedBy: 'admin', closedByNm: '관리자', closeNote: '정상 마감', canCancel: false, closeSeq: 2 },
};

const reportService = {
  // ===== 레포트 항목 =====
  getItems: async (_companyId: string): Promise<ApiResponse<ReportItem[]>> => {
    await sleep(300);
    return { success: true, data: MOCK_ITEMS, message: '', errorCode: null };
  },

  updateItemStatus: async (_request: ReportItemSelectRequest): Promise<ApiResponse<void>> => {
    await sleep(200);
    return { success: true, data: undefined, message: '', errorCode: null };
  },

  getUserItemSelections: async (companyId: string): Promise<ApiResponse<SelectedItem[]>> => {
    await sleep(200);
    const selections = _userSelections[companyId] || MOCK_ITEMS
      .filter((i) => i.status !== 'EXCLUDED')
      .map((i) => ({ itemId: i.itemId, status: i.status as 'REQUIRED' | 'SELECTED' | 'EXCLUDED', order: i.itemOrder }));
    return { success: true, data: selections, message: '', errorCode: null };
  },

  saveItemSelections: async (companyId: string, selections: SelectedItem[]): Promise<ApiResponse<void>> => {
    await sleep(300);
    _userSelections[companyId] = selections;
    saveSelections();
    return { success: true, data: undefined, message: '저장되었습니다.', errorCode: null };
  },

  // ===== 레포트 항목 관리 =====
  getItem: async (itemId: string): Promise<ApiResponse<ReportItem>> => {
    await sleep(200);
    const item = MOCK_ITEMS.find((i) => i.itemId === itemId);
    if (!item) return { success: false, data: null, message: '항목을 찾을 수 없습니다.', errorCode: 'NOT_FOUND' };
    return { success: true, data: item, message: '', errorCode: null };
  },

  createItem: async (data: ReportItemCreateRequest): Promise<ApiResponse<ReportItem>> => {
    await sleep(300);
    const newItem: ReportItem = { ...data, itemNm: data.itemNm, itemDesc: data.itemDesc ?? '', chartType: data.chartType ?? null, useYn: data.useYn ?? 'Y', status: 'EXCLUDED' };
    return { success: true, data: newItem, message: '등록되었습니다.', errorCode: null };
  },

  updateItem: async (_itemId: string, _data: ReportItemUpdateRequest): Promise<ApiResponse<ReportItem>> => {
    await sleep(300);
    const item = MOCK_ITEMS.find((i) => i.itemId === _itemId) || MOCK_ITEMS[0];
    return { success: true, data: item, message: '수정되었습니다.', errorCode: null };
  },

  deleteItem: async (_itemId: string): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '삭제되었습니다.', errorCode: null };
  },

  updateItemOrders: async (_orders: { itemId: string; order: number }[]): Promise<ApiResponse<void>> => {
    await sleep(200);
    return { success: true, data: undefined, message: '', errorCode: null };
  },

  // ===== 보고서 생성 =====
  getPreview: async (_request: ReportPreviewRequest): Promise<ApiResponse<any>> => {
    await sleep(1000);
    return {
      success: true,
      data: {
        stats: { evalCount: 1250, avgScore: 682, gradeDistribution: { gradeACount: 125, gradeBCount: 312, gradeCCount: 456, gradeDCount: 289, gradeECount: 68 } },
        items: {
          'ITEM-001': { chartType: 'PIE', data: [{ name: 'A등급', value: 125 }, { name: 'B등급', value: 312 }, { name: 'C등급', value: 456 }, { name: 'D등급', value: 289 }, { name: 'E등급', value: 68 }] },
          'ITEM-002': { chartType: 'LINE', data: [{ month: '202508', avgScore: 661 }, { month: '202509', avgScore: 668 }, { month: '202510', avgScore: 672 }, { month: '202511', avgScore: 678 }, { month: '202512', avgScore: 681 }, { month: '202601', avgScore: 682 }] },
          'ITEM-003': { chartType: 'TEXT', data: [{ label: '평가 대상', value: 1250 }, { label: '평균 점수', value: 682 }, { label: '중앙값', value: 695 }, { label: '최고 점수', value: 980 }, { label: '최저 점수', value: 320 }] },
        },
      },
      message: '',
      errorCode: null,
    };
  },

  generate: async (_companyId: string, _request: ReportGenerateRequest): Promise<ApiResponse<{ reportSeq: number }>> => {
    await sleep(1500);
    return { success: true, data: { reportSeq: Date.now() }, message: '보고서가 생성되었습니다.', errorCode: null };
  },

  getAiSummary: async (_companyId: string, _year: number, _month: number): Promise<ApiResponse<AiSummaryResponse>> => {
    await sleep(1000);
    return {
      success: true,
      data: {
        summary: `${_year}년 ${_month}월 신용평가 결과, 전체 1,250명의 평균 신용점수는 682점으로 전월(681점) 대비 소폭 상승하였습니다. A등급 비율이 10.0%로 전월과 유사한 수준을 유지하였으며, 전반적으로 안정적인 신용 포트폴리오를 구성하고 있습니다.`,
        keyInsights: [
          '평균 신용점수 682점으로 전월 대비 1점 상승',
          'A등급 비율 10.0%, B등급 24.96%로 우량 비율 35% 유지',
          'E등급(위험) 비율 5.44%로 관리 수준 내 유지',
          '신규 평가 56건, 이탈 44건으로 순증 12건',
        ],
        recommendations: [
          'D/E등급 대상자(357명)에 대한 모니터링 강화',
          '소득 변동 요인 분석을 통한 조기 경보 체계 운영',
          '분기별 포트폴리오 재검토 시행 권고',
        ],
        riskLevel: 'LOW',
        trend: 'STABLE',
        data: { avgScore: 682, evalCount: 1250, gradeDistribution: { A: 125, B: 312, C: 456, D: 289, E: 68 } },
      },
      message: '',
      errorCode: null,
    };
  },

  // ===== 보고서 이력 =====
  getHistory: async (params: { companyId: string; year?: number; month?: number; page?: number; pageSize?: number }): Promise<ApiResponse<ReportHistoryResponse>> => {
    await sleep(300);
    let filtered = MOCK_HISTORY_BASE.filter((h) => h.companyId === params.companyId || !params.companyId);
    if (params.year) filtered = filtered.filter((h) => h.year === params.year);
    if (params.month) filtered = filtered.filter((h) => h.month === params.month);
    const page = params.page ?? 0;
    const size = params.pageSize ?? 10;
    return {
      success: true,
      data: {
        content: filtered.slice(page * size, page * size + size) as any,
        totalCount: filtered.length,
        page,
        size,
      },
      message: '',
      errorCode: null,
    };
  },

  getHistoryDetail: async (reportSeq: number): Promise<ApiResponse<any>> => {
    await sleep(200);
    const report = MOCK_HISTORY_BASE.find((h) => h.reportSeq === reportSeq);
    return { success: true, data: report, message: '', errorCode: null };
  },

  download: async (_reportSeq: number): Promise<Blob> => {
    await sleep(500);
    return new Blob(['%PDF-1.4 Mock PDF Content'], { type: 'application/pdf' });
  },

  deleteHistory: async (_reportSeq: number): Promise<ApiResponse<void>> => {
    await sleep(300);
    return { success: true, data: undefined, message: '삭제되었습니다.', errorCode: null };
  },

  // ===== 월마감 =====
  getCloseStatus: async (companyId: string, year: number): Promise<ApiResponse<MonthlyClose[]>> => {
    await sleep(300);
    const months: MonthlyClose[] = [];
    for (let m = 1; m <= 12; m++) {
      const key = `${year}-${String(m).padStart(2, '0')}`;
      const closed = _closeStatus[key];
      if (closed && closed.companyId === companyId) {
        months.push(closed);
      } else {
        months.push({ companyId, year, month: m, closeStatus: 'OPEN', closedDt: null, closedBy: null, canCancel: false, closeNote: null });
      }
    }
    return { success: true, data: months, message: '', errorCode: null };
  },

  processClose: async (companyId: string, year: number, month: number, closeNote?: string): Promise<ApiResponse<MonthlyClose>> => {
    await sleep(500);
    const key = `${year}-${String(month).padStart(2, '0')}`;
    const closed: MonthlyClose = {
      companyId, year, month, closeStatus: 'CLOSED',
      closedDt: new Date().toISOString(), closedBy: 'admin', closedByNm: '관리자',
      closeNote: closeNote ?? '정상 마감', canCancel: true, closeSeq: Date.now(),
    };
    _closeStatus[key] = closed;
    return { success: true, data: closed, message: '마감이 처리되었습니다.', errorCode: null };
  },

  cancelClose: async (_companyId: string, _year: number, _month: number, _request: CloseCancelRequest): Promise<ApiResponse<void>> => {
    await sleep(400);
    const key = `${_year}-${String(_month).padStart(2, '0')}`;
    delete _closeStatus[key];
    return { success: true, data: undefined, message: '마감이 취소되었습니다.', errorCode: null };
  },

  getCloseHistory: async (_companyId: string, _year: number, _month: number): Promise<ApiResponse<CloseChangeHistory[]>> => {
    await sleep(200);
    return {
      success: true,
      data: [
        { histSeq: 1, companyId: _companyId, year: _year, month: _month, changeType: 'CLOSE', changeTypeNm: '마감', changeReason: '정상 마감', changedBy: 'admin', changedByNm: '관리자', changedDt: new Date().toISOString() },
      ],
      message: '',
      errorCode: null,
    };
  },

  getYearlyStats: async (companyId: string, year: number): Promise<ApiResponse<ReportYearlyStats>> => {
    await sleep(300);
    const stats = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      reportCount: i < 4 ? 1 : 0,
      closedYn: (i < 4) ? 'Y' : 'N',
      closedDt: (i < 4) ? `${year}-${String(i + 2).padStart(2, '0')}-10T10:00:00` : null,
    }));
    return {
      success: true,
      data: { year, stats, totalReports: 4, closedMonths: 4 },
      message: '',
      errorCode: null,
    };
  },
};

export default reportService;
