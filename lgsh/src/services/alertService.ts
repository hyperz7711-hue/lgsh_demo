/**
 * 알림 서비스 - 데모 모드 (Mock)
 */

export interface UserAlert {
  alertId: number;
  alertType: string;
  alertTypeNm: string;
  alertTitle: string;
  alertMsg: string;
  linkUrl: string;
  readYn: string;
  readDt: string | null;
  regDt: string;
  timeAgo: string;
}

export interface AlertListResponse {
  content: UserAlert[];
  totalCount: number;
  page: number;
  size: number;
  totalPages: number;
}

const mockAlerts: UserAlert[] = [
  { alertId: 1, alertType: "NOTICE", alertTypeNm: "공지사항", alertTitle: "시스템 점검 안내", alertMsg: "2026년 3월 1일 새벽 2시~4시 시스템 점검이 예정되어 있습니다.", linkUrl: "/notices", readYn: "N", readDt: null, regDt: "2026-02-20T09:00:00", timeAgo: "1시간 전" },
  { alertId: 2, alertType: "MODEL_TRAIN_SUCCESS", alertTypeNm: "모델학습완료", alertTitle: "신용평가 모델 학습 완료", alertMsg: "LOGISTIC_V3 모델 학습이 완료되었습니다. 정확도: 94.2%", linkUrl: "/models", readYn: "N", readDt: null, regDt: "2026-02-20T08:30:00", timeAgo: "2시간 전" },
  { alertId: 3, alertType: "UPLOAD_COMPLETE", alertTypeNm: "업로드완료", alertTitle: "기초데이터 업로드 완료", alertMsg: "2026년 1월 기초데이터 업로드가 완료되었습니다. 총 1,250건", linkUrl: "/admin/rawdata", readYn: "Y", readDt: "2026-02-19T15:00:00", regDt: "2026-02-19T14:30:00", timeAgo: "어제" },
];

let _alerts = [...mockAlerts];

export const alertService = {
  getAlertList: async (params?: { readYn?: string; page?: number; size?: number }): Promise<AlertListResponse> => {
    await new Promise((r) => setTimeout(r, 100));
    const filtered = params?.readYn ? _alerts.filter((a) => a.readYn === params.readYn) : _alerts;
    return { content: filtered, totalCount: filtered.length, page: 0, size: 10, totalPages: 1 };
  },
  getUnreadCount: async (): Promise<number> => {
    return _alerts.filter((a) => a.readYn === "N").length;
  },
  readAlert: async (alertId: number): Promise<void> => {
    _alerts = _alerts.map((a) => a.alertId === alertId ? { ...a, readYn: "Y", readDt: new Date().toISOString() } : a);
  },
  readAllAlerts: async (): Promise<number> => {
    const count = _alerts.filter((a) => a.readYn === "N").length;
    _alerts = _alerts.map((a) => ({ ...a, readYn: "Y", readDt: new Date().toISOString() }));
    return count;
  },
};

export default alertService;
