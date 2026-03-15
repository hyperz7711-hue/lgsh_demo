/**
 * 공지사항 서비스 - 데모 모드 (Mock)
 */
import {
  Notice,
  NoticeListParams,
  NoticeCreateRequest,
  NoticeUpdateRequest,
  PageResponse,
  ApiResponse
} from '../types';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let _notices: Notice[] = [
  { noticeId: 3, title: '2026년 1분기 신용평가 일정 안내', content: '2026년 1분기 신용평가 일정을 안내드립니다.\n\n- 1월 마감: 2026-02-10\n- 2월 마감: 2026-03-10\n- 3월 마감: 2026-04-10\n\n일정에 맞추어 데이터 업로드 부탁드립니다.', lvl: '1', pinYn: 'Y', useYn: 'Y', startDt: '2026-01-01', endDt: '2026-03-31', viewCnt: 142, regUserId: 'admin', regDt: '2026-01-02T09:00:00' },
  { noticeId: 2, title: '시스템 점검 안내 (2026-03-01)', content: '시스템 정기 점검이 예정되어 있습니다.\n\n- 일시: 2026년 3월 1일(일) 02:00 ~ 04:00\n- 내용: DB 최적화 및 서버 업그레이드\n\n점검 시간 중 서비스 이용이 불가합니다.', lvl: '2', pinYn: 'Y', useYn: 'Y', startDt: '2026-02-20', endDt: '2026-03-01', viewCnt: 89, regUserId: 'admin', regDt: '2026-02-20T09:00:00' },
  { noticeId: 1, title: 'LGSH AI 신용평가 시스템 오픈 안내', content: 'LGSH AI 신용평가 시스템이 정식 오픈되었습니다.\n\n주요 기능:\n1. AI 기반 자동 신용평가\n2. 실시간 대시보드\n3. 월간 보고서 자동 생성\n4. 시계열 분석\n\n문의사항은 관리자에게 연락 바랍니다.', lvl: '1', pinYn: 'N', useYn: 'Y', startDt: '2025-01-01', endDt: '2026-12-31', viewCnt: 328, regUserId: 'admin', regDt: '2025-01-01T09:00:00' },
];

export const noticeService = {
  list: async (params: NoticeListParams): Promise<ApiResponse<PageResponse<Notice>>> => {
    await sleep(300);
    let filtered = _notices.filter((n) => n.useYn === 'Y');
    if (params.keyword) filtered = filtered.filter((n) => n.title.includes(params.keyword!) || n.content.includes(params.keyword!));
    const page = params.page || 1;
    const size = params.size || 10;
    const start = (page - 1) * size;
    return {
      success: true,
      data: {
        content: filtered.slice(start, start + size),
        totalCount: filtered.length,
        page,
        size,
        totalPages: Math.ceil(filtered.length / size),
      },
      message: '',
      errorCode: null,
    };
  },

  get: async (noticeId: number): Promise<ApiResponse<Notice>> => {
    await sleep(200);
    const notice = _notices.find((n) => n.noticeId === noticeId);
    if (!notice) return { success: false, data: null, message: '공지사항을 찾을 수 없습니다.', errorCode: 'NOT_FOUND' };
    notice.viewCnt++;
    return { success: true, data: notice, message: '', errorCode: null };
  },

  create: async (data: NoticeCreateRequest): Promise<ApiResponse<Notice>> => {
    await sleep(400);
    const newNotice: Notice = {
      noticeId: _notices.length + 1,
      title: data.title,
      content: data.content,
      lvl: data.lvl as '1' | '2' | '3',
      pinYn: data.pinYn as 'Y' | 'N',
      useYn: data.useYn as 'Y' | 'N',
      startDt: data.startDt,
      endDt: data.endDt,
      viewCnt: 0,
      regUserId: data.regUserId ?? 'admin',
      regDt: new Date().toISOString(),
    };
    _notices.unshift(newNotice);
    return { success: true, data: newNotice, message: '등록되었습니다.', errorCode: null };
  },

  update: async (noticeId: number, _data: NoticeUpdateRequest): Promise<ApiResponse<void>> => {
    await sleep(300);
    _notices = _notices.map((n) => n.noticeId === noticeId ? { ...n, ..._data, updDt: new Date().toISOString() } as Notice : n);
    return { success: true, data: undefined, message: '수정되었습니다.', errorCode: null };
  },

  delete: async (noticeId: number): Promise<ApiResponse<void>> => {
    await sleep(300);
    _notices = _notices.filter((n) => n.noticeId !== noticeId);
    return { success: true, data: undefined, message: '삭제되었습니다.', errorCode: null };
  },
};

export default noticeService;
