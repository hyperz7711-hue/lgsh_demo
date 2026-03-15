/**
 * 대시보드 서비스 - 데모 모드 (Mock)
 */
import type {
  Widget,
  DashboardConfig,
  DashboardConfigRequest,
  WidgetData,
  DashboardLayoutItem,
  DashboardSettings,
  AllWidgetDataResponse,
} from '@/types/dashboard';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 기본 위젯 정의
const DEFAULT_WIDGETS: Widget[] = [
  { widgetId: 'WGT-TOTAL-CNT', widgetNm: '전체 평가 대상', widgetNmEn: 'Total Evaluations', widgetType: 'STAT_CARD', dataApiUrl: '/dashboard/widgets/WGT-TOTAL-CNT/data', defaultWidth: 3, defaultHeight: 2, minWidth: 2, minHeight: 2, maxWidth: 4, maxHeight: 3, refreshInterval: 60, iconNm: 'TeamOutlined', sortOrder: 1 },
  { widgetId: 'WGT-AVG-SCORE', widgetNm: '평균 신용점수', widgetNmEn: 'Avg Credit Score', widgetType: 'STAT_CARD', dataApiUrl: '/dashboard/widgets/WGT-AVG-SCORE/data', defaultWidth: 3, defaultHeight: 2, minWidth: 2, minHeight: 2, maxWidth: 4, maxHeight: 3, refreshInterval: 60, iconNm: 'LineChartOutlined', sortOrder: 2 },
  { widgetId: 'WGT-GRADE-A-CNT', widgetNm: 'A등급 대상자', widgetNmEn: 'Grade A Count', widgetType: 'STAT_CARD', dataApiUrl: '/dashboard/widgets/WGT-GRADE-A-CNT/data', defaultWidth: 3, defaultHeight: 2, minWidth: 2, minHeight: 2, maxWidth: 4, maxHeight: 3, refreshInterval: 60, iconNm: 'StarOutlined', sortOrder: 3 },
  { widgetId: 'WGT-RISK-CNT', widgetNm: '위험 대상자', widgetNmEn: 'High Risk Count', widgetType: 'STAT_CARD', dataApiUrl: '/dashboard/widgets/WGT-RISK-CNT/data', defaultWidth: 3, defaultHeight: 2, minWidth: 2, minHeight: 2, maxWidth: 4, maxHeight: 3, refreshInterval: 60, iconNm: 'WarningOutlined', sortOrder: 4 },
  { widgetId: 'WGT-GRADE-DIST', widgetNm: '신용등급 분포', widgetNmEn: 'Grade Distribution', widgetType: 'CHART', dataApiUrl: '/dashboard/widgets/WGT-GRADE-DIST/data', defaultWidth: 6, defaultHeight: 4, minWidth: 4, minHeight: 3, maxWidth: 12, maxHeight: 6, refreshInterval: 60, iconNm: 'PieChartOutlined', sortOrder: 5 },
  { widgetId: 'WGT-SCORE-TREND', widgetNm: '점수 추이', widgetNmEn: 'Score Trend', widgetType: 'CHART', dataApiUrl: '/dashboard/widgets/WGT-SCORE-TREND/data', defaultWidth: 6, defaultHeight: 4, minWidth: 4, minHeight: 3, maxWidth: 12, maxHeight: 6, refreshInterval: 60, iconNm: 'AreaChartOutlined', sortOrder: 6 },
  { widgetId: 'WGT-RECENT-EVAL', widgetNm: '최근 평가 현황', widgetNmEn: 'Recent Evaluations', widgetType: 'LIST', dataApiUrl: '/dashboard/widgets/WGT-RECENT-EVAL/data', defaultWidth: 6, defaultHeight: 4, minWidth: 4, minHeight: 3, maxWidth: 8, maxHeight: 6, refreshInterval: 60, iconNm: 'UnorderedListOutlined', sortOrder: 7 },
  { widgetId: 'WGT-MODEL-INFO', widgetNm: '모델 정보', widgetNmEn: 'Model Info', widgetType: 'INFO', dataApiUrl: '/dashboard/widgets/WGT-MODEL-INFO/data', defaultWidth: 6, defaultHeight: 4, minWidth: 4, minHeight: 3, maxWidth: 8, maxHeight: 6, refreshInterval: 300, iconNm: 'RobotOutlined', sortOrder: 8 },
];

// localStorage 기반 레이아웃 저장
const LAYOUT_KEY = 'demo_dashboard_layout';

const buildDefaultLayout = (): DashboardLayoutItem[] => {
  const positions = [
    { x: 0, y: 0 }, { x: 3, y: 0 }, { x: 6, y: 0 }, { x: 9, y: 0 },
    { x: 0, y: 2 }, { x: 6, y: 2 },
    { x: 0, y: 6 }, { x: 6, y: 6 },
  ];
  return DEFAULT_WIDGETS.map((w, i) => ({
    ...w,
    x: positions[i]?.x ?? 0,
    y: positions[i]?.y ?? 0,
    w: w.defaultWidth,
    h: w.defaultHeight,
    visible: true,
  }));
};

const loadLayout = (): DashboardLayoutItem[] => {
  try {
    const raw = localStorage.getItem(LAYOUT_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return buildDefaultLayout();
};

const saveLayoutToStorage = (layout: DashboardLayoutItem[]) => {
  try { localStorage.setItem(LAYOUT_KEY, JSON.stringify(layout)); } catch { /* ignore */ }
};

// Widget data generators
const getWidgetMockData = (widgetId: string): unknown => {
  switch (widgetId) {
    case 'WGT-TOTAL-CNT':
      return { value: 1250, unit: '명', yearMonth: '202601', comparison: { type: 'MOM', value: 12, direction: 'UP' } };
    case 'WGT-AVG-SCORE':
      return { value: 682, unit: '점', yearMonth: '202601', comparison: { type: 'MOM', value: 1, direction: 'UP' } };
    case 'WGT-GRADE-A-CNT':
      return { value: 125, unit: '명', yearMonth: '202601', comparison: { type: 'MOM', value: 1, direction: 'UP' } };
    case 'WGT-RISK-CNT':
      return { value: 357, unit: '명', yearMonth: '202601', comparison: { type: 'MOM', value: 8, direction: 'UP' } };
    case 'WGT-GRADE-DIST':
      return {
        chartType: 'PIE',
        chartData: [
          { name: 'A등급', value: 125, color: '#52c41a' },
          { name: 'B등급', value: 312, color: '#1890ff' },
          { name: 'C등급', value: 456, color: '#faad14' },
          { name: 'D등급', value: 289, color: '#fa8c16' },
          { name: 'E등급', value: 68, color: '#f5222d' },
        ],
      };
    case 'WGT-SCORE-TREND':
      return {
        chartType: 'LINE',
        chartData: [
          { name: '2025-08', value: 661 },
          { name: '2025-09', value: 668 },
          { name: '2025-10', value: 672 },
          { name: '2025-11', value: 678 },
          { name: '2025-12', value: 681 },
          { name: '2026-01', value: 682 },
        ],
      };
    case 'WGT-RECENT-EVAL':
      return {
        items: [
          { personId: 'P0001', personNm: '김철수', score: 762, grade: 'B', evalDt: '2026-01-31T14:22:00' },
          { personId: 'P0003', personNm: '박민준', score: 845, grade: 'A', evalDt: '2026-01-31T14:20:00' },
          { personId: 'P0005', personNm: '정우성', score: 878, grade: 'A', evalDt: '2026-01-31T14:18:00' },
          { personId: 'P0009', personNm: '조현우', score: 785, grade: 'B', evalDt: '2026-01-31T14:15:00' },
          { personId: 'P0004', personNm: '최지수', score: 542, grade: 'D', evalDt: '2026-01-31T14:12:00' },
        ],
        totalCount: 1250,
        displayCount: 5,
      };
    case 'WGT-MODEL-INFO':
      return {
        modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', modelVersion: '3.0.0',
        modelStatus: 'DEPLOYED', algorithmType: 'LOGISTIC', algorithmTypeNm: '로지스틱회귀',
        aucScore: 0.921, deployDt: '2026-01-15T10:00:00',
      };
    default:
      return null;
  }
};

export const dashboardService = {
  async getWidgets(_widgetType?: string, _useYn: string = 'Y'): Promise<Widget[]> {
    await sleep(200);
    return DEFAULT_WIDGETS;
  },

  async getConfig(): Promise<DashboardConfig> {
    await sleep(300);
    const layout = loadLayout();
    return { isCustomized: true, layout, refreshInterval: 60 };
  },

  async saveConfig(request: DashboardConfigRequest): Promise<void> {
    await sleep(300);
    const current = loadLayout();
    const updated = current.map((item) => {
      const req = request.layout.find((r) => r.widgetId === item.widgetId);
      if (req) return { ...item, x: req.x, y: req.y, w: req.w, h: req.h, visible: req.visible };
      return item;
    });
    saveLayoutToStorage(updated);
  },

  async resetConfig(): Promise<DashboardConfig> {
    await sleep(300);
    const layout = buildDefaultLayout();
    saveLayoutToStorage(layout);
    return { isCustomized: false, layout, refreshInterval: 60 };
  },

  async getWidgetData<T = unknown>(widgetId: string, _yearMonth?: string, _refresh: boolean = false): Promise<WidgetData<T>> {
    await sleep(200);
    return {
      widgetId,
      data: getWidgetMockData(widgetId) as T,
      updatedAt: new Date().toISOString(),
    };
  },

  async getRoleDefaultLayout(_roleId: string): Promise<DashboardLayoutItem[]> {
    await sleep(200);
    return buildDefaultLayout();
  },

  async getSettings(): Promise<DashboardSettings> {
    await sleep(200);
    return { autoRefreshEnabled: true, refreshInterval: 60, minWidgetCount: 4, maxWidgetCount: 8 };
  },

  async getLastEvalMonth(): Promise<string> {
    await sleep(200);
    return '202601';
  },

  async getAllWidgetData(_yearMonth?: string): Promise<AllWidgetDataResponse> {
    await sleep(400);
    const result: AllWidgetDataResponse = {};
    const layout = loadLayout();
    layout.filter((w) => w.visible).forEach((widget) => {
      result[widget.widgetId] = {
        widgetId: widget.widgetId,
        data: getWidgetMockData(widget.widgetId),
        updatedAt: new Date().toISOString(),
      };
    });
    return result;
  },
};

export default dashboardService;
