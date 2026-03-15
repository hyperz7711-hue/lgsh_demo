/**
 * 시계열 분석 서비스 - 데모 모드 (Mock)
 */
import type { ApiResponse } from '@/types';
import type {
  TsSnapshotSummary,
  TsScoreBin,
  TsFeatureStats,
  TsPsiPoint,
  TsMigration,
} from '@/types/timeseries';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 6개월 스냅샷 샘플 데이터
const MOCK_SNAPSHOTS: TsSnapshotSummary[] = [
  { snapshotMonth: '202508', popCnt: 1180, scoreAvg: 661, scoreP50: 672, scoreP10: 520, scoreP90: 798, gradeCntJson: '{"A":112,"B":287,"C":428,"D":276,"E":77}', newCnt: 42, churnCnt: 18 },
  { snapshotMonth: '202509', popCnt: 1195, scoreAvg: 668, scoreP50: 679, scoreP10: 528, scoreP90: 805, gradeCntJson: '{"A":118,"B":294,"C":435,"D":271,"E":77}', newCnt: 38, churnCnt: 23 },
  { snapshotMonth: '202510', popCnt: 1210, scoreAvg: 672, scoreP50: 683, scoreP10: 531, scoreP90: 812, gradeCntJson: '{"A":121,"B":302,"C":440,"D":275,"E":72}', newCnt: 45, churnCnt: 30 },
  { snapshotMonth: '202511', popCnt: 1225, scoreAvg: 678, scoreP50: 690, scoreP10: 535, scoreP90: 818, gradeCntJson: '{"A":124,"B":308,"C":448,"D":278,"E":67}', newCnt: 52, churnCnt: 37 },
  { snapshotMonth: '202512', popCnt: 1238, scoreAvg: 681, scoreP50: 694, scoreP10: 538, scoreP90: 822, gradeCntJson: '{"A":124,"B":311,"C":452,"D":283,"E":68}', newCnt: 48, churnCnt: 35 },
  { snapshotMonth: '202601', popCnt: 1250, scoreAvg: 682, scoreP50: 695, scoreP10: 540, scoreP90: 825, gradeCntJson: '{"A":125,"B":312,"C":456,"D":289,"E":68}', newCnt: 56, churnCnt: 44 },
];

export const timeseriesService = {
  snapshotSummary: async (_params: {
    companyId: string;
    modelId: string;
    fromMonth?: string;
    toMonth?: string;
  }): Promise<ApiResponse<TsSnapshotSummary[]>> => {
    await sleep(400);
    return { success: true, data: MOCK_SNAPSHOTS, message: '', errorCode: null };
  },

  scoreDistribution: async (_params: {
    companyId: string;
    modelId: string;
    month: string;
  }): Promise<ApiResponse<TsScoreBin[]>> => {
    await sleep(300);
    const bins: TsScoreBin[] = [
      { binNo: 1, binMin: 300, binMax: 350, binCnt: 12, binRate: 0.96 },
      { binNo: 2, binMin: 350, binMax: 400, binCnt: 28, binRate: 2.24 },
      { binNo: 3, binMin: 400, binMax: 450, binCnt: 45, binRate: 3.60 },
      { binNo: 4, binMin: 450, binMax: 500, binCnt: 68, binRate: 5.44 },
      { binNo: 5, binMin: 500, binMax: 550, binCnt: 92, binRate: 7.36 },
      { binNo: 6, binMin: 550, binMax: 600, binCnt: 118, binRate: 9.44 },
      { binNo: 7, binMin: 600, binMax: 650, binCnt: 145, binRate: 11.60 },
      { binNo: 8, binMin: 650, binMax: 700, binCnt: 168, binRate: 13.44 },
      { binNo: 9, binMin: 700, binMax: 750, binCnt: 185, binRate: 14.80 },
      { binNo: 10, binMin: 750, binMax: 800, binCnt: 162, binRate: 12.96 },
      { binNo: 11, binMin: 800, binMax: 850, binCnt: 112, binRate: 8.96 },
      { binNo: 12, binMin: 850, binMax: 900, binCnt: 72, binRate: 5.76 },
      { binNo: 13, binMin: 900, binMax: 950, binCnt: 32, binRate: 2.56 },
      { binNo: 14, binMin: 950, binMax: 1000, binCnt: 11, binRate: 0.88 },
    ];
    return { success: true, data: bins, message: '', errorCode: null };
  },

  featureList: async (_params: { companyId: string; modelId: string }): Promise<ApiResponse<string[]>> => {
    await sleep(200);
    return {
      success: true,
      data: ['annual_income', 'debt_ratio', 'credit_card_cnt', 'asset_amt', 'debt_amt', 'children_cnt', 'age', 'loan_cnt'],
      message: '',
      errorCode: null,
    };
  },

  featureStats: async (params: {
    companyId: string;
    modelId: string;
    feature: string;
    fromMonth?: string;
    toMonth?: string;
  }): Promise<ApiResponse<TsFeatureStats[]>> => {
    await sleep(350);
    const months = ['202508', '202509', '202510', '202511', '202512', '202601'];
    const baseValues: Record<string, { mean: number; std: number }> = {
      annual_income: { mean: 42500000, std: 2200000 },
      debt_ratio: { mean: 0.38, std: 0.02 },
      credit_card_cnt: { mean: 2.8, std: 0.15 },
      asset_amt: { mean: 85000000, std: 5000000 },
      debt_amt: { mean: 32000000, std: 1800000 },
      children_cnt: { mean: 1.2, std: 0.08 },
      age: { mean: 42.3, std: 0.5 },
      loan_cnt: { mean: 1.6, std: 0.1 },
    };
    const base = baseValues[params.feature] || { mean: 100, std: 10 };
    const stats: TsFeatureStats[] = months.map((m, i) => ({
      snapshotMonth: m,
      missingRate: Math.max(0, 0.5 + i * 0.05),
      zeroRate: Math.max(0, 0.8 + i * 0.03),
      mean: base.mean + i * base.std * 0.05,
      std: base.std * (1 + i * 0.01),
      min: base.mean - base.std * 2.5,
      p01: base.mean - base.std * 2.1,
      p05: base.mean - base.std * 1.6,
      p50: base.mean + i * base.std * 0.03,
      p95: base.mean + base.std * 1.7,
      p99: base.mean + base.std * 2.3,
      max: base.mean + base.std * 2.8,
      outlierRate: 0.4 + i * 0.05,
    }));
    return { success: true, data: stats, message: '', errorCode: null };
  },

  psi: async (_params: {
    companyId: string;
    modelId: string;
    baseMonth: string;
    targetType: string;
    targetName: string;
    fromMonth?: string;
    toMonth?: string;
  }): Promise<ApiResponse<TsPsiPoint[]>> => {
    await sleep(350);
    const months = ['202509', '202510', '202511', '202512', '202601'];
    const psiPoints: TsPsiPoint[] = months.map((m, i) => ({
      snapshotMonth: m,
      psiValue: 0.05 + i * 0.025,
      detailJson: null,
    }));
    return { success: true, data: psiPoints, message: '', errorCode: null };
  },

  migration: async (_params: {
    companyId: string;
    modelId: string;
    fromMonth: string;
    toMonth: string;
  }): Promise<ApiResponse<TsMigration>> => {
    await sleep(400);
    const matrixJson = JSON.stringify({
      grades: ['A', 'B', 'C', 'D', 'E'],
      matrix: [
        [85, 12,  2,  1,  0],
        [ 8, 78, 11,  2,  1],
        [ 2,  9, 76, 11,  2],
        [ 1,  3, 10, 74, 12],
        [ 0,  1,  3, 15, 81],
      ],
    });
    const scoreDeltaStatsJson = JSON.stringify({
      mean: 3.2, median: 2.5, p10: -18.5, p90: 24.8, min: -68, max: 95,
    });
    return {
      success: true,
      data: { matrixJson, scoreDeltaStatsJson, upgradeRate: 12.4, downgradeRate: 9.8, stayRate: 77.8 },
      message: '',
      errorCode: null,
    };
  },

  rebuild: async (_payload: { companyId: string; modelId: string; fromMonth?: string; toMonth?: string }): Promise<ApiResponse<Record<string, any>>> => {
    await sleep(500);
    return { success: true, data: { status: 'COMPLETED', rebuiltMonths: 6 }, message: '', errorCode: null };
  },
};

export default timeseriesService;
