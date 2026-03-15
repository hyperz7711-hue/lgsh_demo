/**
 * 신용평가 서비스 - 데모 모드 (Mock)
 */
import type { ApiResponse } from '@/types';
import type {
  CreditBasicStatsResult,
  CreditBatchRunResult,
  CreditBatchStatus,
  CreditCeleryStatus,
  CreditCorrelationResult,
  CreditDistributionResult,
  CreditMissingPatternResult,
  CreditOutlierResult,
  CreditPredictRequest,
  CreditPredictResult,
} from '@/types';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const creditService = {
  predict: async (_payload: CreditPredictRequest): Promise<ApiResponse<CreditPredictResult>> => {
    await sleep(800);
    return {
      success: true,
      data: {
        evalId: `EVAL-${Date.now()}`,
        creditScore: 720,
        creditGrade: 'B',
        itemScores: { income: 85, debt: 72, card: 78, asset: 68, job: 90 },
      },
      message: '',
      errorCode: null,
    };
  },

  warmup: async (_payload: { modelId: string }): Promise<ApiResponse<{ modelId: string; trainingDataCnt?: number; modelMetrics?: any }>> => {
    await sleep(500);
    return {
      success: true,
      data: { modelId: 'MODEL-001', trainingDataCnt: 12500, modelMetrics: { auc: 0.921, ks_stat: 0.512, ar: 0.843 } },
      message: '',
      errorCode: null,
    };
  },

  runBatch: async (_payload: CreditPredictRequest): Promise<ApiResponse<CreditBatchRunResult>> => {
    await sleep(600);
    return {
      success: true,
      data: {
        batchId: `BATCH-${Date.now()}`,
        mode: 'all',
        runStart: new Date().toISOString(),
        userId: 'admin',
        personGrp: null,
        runId: `RUN-${Date.now()}`,
        snapshotMonth: '202601',
        fromMonth: null,
        toMonth: null,
        rawDataId: null,
        modelMetrics: { auc: 0.921, ks_stat: 0.512, ar: 0.843 },
        trainingDataCnt: 12500,
      },
      message: '',
      errorCode: null,
    };
  },

  getBatchStatus: async (batchId: string, _runId: string): Promise<ApiResponse<CreditBatchStatus>> => {
    await sleep(300);
    return {
      success: true,
      data: {
        batchId,
        status: 'SUCCESS',
        totalCount: 1250,
        processedCount: 1250,
        successCount: 1248,
        failCount: 2,
        startedAt: new Date(Date.now() - 120000).toISOString(),
        endedAt: new Date().toISOString(),
        avgScore: 682,
        gradeDistribution: { A: 125, B: 312, C: 456, D: 289, E: 68 },
      },
      message: '',
      errorCode: null,
    };
  },

  getCeleryStatus: async (): Promise<ApiResponse<CreditCeleryStatus>> => {
    await sleep(200);
    return {
      success: true,
      data: { running: true, workerCount: 2, workers: ['celery@worker1', 'celery@worker2'] },
      message: '',
      errorCode: null,
    };
  },

  getLatestRawDataId: async (month: string): Promise<ApiResponse<{ month: string; rawDataId: string | null }>> => {
    await sleep(200);
    return {
      success: true,
      data: { month, rawDataId: `RAW-${month}-001` },
      message: '',
      errorCode: null,
    };
  },

  stopBatch: async (_payload: { batchId: string; runId: string; mode?: string; userId?: string }): Promise<ApiResponse<{ revokedCount?: number }>> => {
    await sleep(300);
    return { success: true, data: { revokedCount: 1 }, message: '', errorCode: null };
  },

  distribution: async (_params?: { startMonth?: string; endMonth?: string }): Promise<ApiResponse<CreditDistributionResult>> => {
    await sleep(400);
    return {
      success: true,
      data: {
        gradeCounts: { A: 125, B: 312, C: 456, D: 289, E: 68 },
        stats: { average: 682, median: 695, max: 980, min: 320, stddev: 118 },
        algorithmType: 'LOGISTIC',
        modelNm: 'LOGISTIC_V3',
      },
      message: '',
      errorCode: null,
    };
  },

  analysis: async (_modelId?: string): Promise<ApiResponse<CreditCorrelationResult>> => {
    await sleep(500);
    const variables = ['연소득', '부채비율', '카드수', '자산', '직업코드', '거주형태', '자녀수'];
    const n = variables.length;
    const matrix: number[][] = [
      [1.00,  0.62, -0.45,  0.71,  0.38, -0.12,  0.15],
      [0.62,  1.00, -0.58,  0.52,  0.28, -0.08,  0.10],
      [-0.45, -0.58,  1.00, -0.39, -0.22,  0.18, -0.07],
      [0.71,  0.52, -0.39,  1.00,  0.45, -0.15,  0.12],
      [0.38,  0.28, -0.22,  0.45,  1.00, -0.05,  0.08],
      [-0.12, -0.08,  0.18, -0.15, -0.05,  1.00, -0.03],
      [0.15,  0.10, -0.07,  0.12,  0.08, -0.03,  1.00],
    ];
    const pairs = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        pairs.push({ var1: variables[i], var2: variables[j], corrCoef: matrix[i][j], sampleCount: 1250 });
      }
    }
    return {
      success: true,
      data: { modelId: 'MODEL-001', variables, correlationMatrix: matrix, stabilityMatrix: null, pairs, sampleCount: 1250 },
      message: '',
      errorCode: null,
    };
  },

  basicStats: async (_params?: { page?: number; size?: number; search?: string; modelId?: string }): Promise<ApiResponse<CreditBasicStatsResult>> => {
    await sleep(400);
    const variables = [
      { name: 'annual_income', displayName: '연소득', count: 1250, mean: 42500000, median: 38000000, min: 15000000, max: 180000000, stddev: 22000000 },
      { name: 'debt_ratio', displayName: '부채비율', count: 1250, mean: 0.38, median: 0.32, min: 0.01, max: 1.85, stddev: 0.28 },
      { name: 'credit_card_cnt', displayName: '카드보유수', count: 1248, mean: 2.8, median: 2.0, min: 0, max: 12, stddev: 1.9 },
      { name: 'asset_amt', displayName: '자산금액', count: 1245, mean: 85000000, median: 62000000, min: 0, max: 980000000, stddev: 95000000 },
      { name: 'debt_amt', displayName: '부채금액', count: 1250, mean: 32000000, median: 22000000, min: 0, max: 420000000, stddev: 45000000 },
      { name: 'children_cnt', displayName: '자녀수', count: 1250, mean: 1.2, median: 1.0, min: 0, max: 5, stddev: 1.1 },
      { name: 'age', displayName: '나이', count: 1250, mean: 42.3, median: 41.0, min: 22, max: 68, stddev: 10.5 },
      { name: 'loan_cnt', displayName: '대출건수', count: 1250, mean: 1.6, median: 1.0, min: 0, max: 8, stddev: 1.4 },
    ];
    return {
      success: true,
      data: { page: 0, size: 20, total: variables.length, totalPages: 1, totalRows: 1250, variables },
      message: '',
      errorCode: null,
    };
  },

  missingPatterns: async (_params?: { variableSeq?: number | string; startDate?: string; endDate?: string }): Promise<ApiResponse<CreditMissingPatternResult | CreditMissingPatternResult[]>> => {
    await sleep(400);
    return {
      success: true,
      data: {
        items: [
          { rownum: 1, variableName: '연소득', totalCount: 1250, missingCount: 0, missingRate: 0.0, missingStatus: '정상' },
          { rownum: 2, variableName: '부채비율', totalCount: 1250, missingCount: 5, missingRate: 0.4, missingStatus: '양호' },
          { rownum: 3, variableName: '카드보유수', totalCount: 1250, missingCount: 2, missingRate: 0.16, missingStatus: '양호' },
          { rownum: 4, variableName: '자산금액', totalCount: 1250, missingCount: 18, missingRate: 1.44, missingStatus: '주의' },
          { rownum: 5, variableName: '부채금액', totalCount: 1250, missingCount: 0, missingRate: 0.0, missingStatus: '정상' },
          { rownum: 6, variableName: '자녀수', totalCount: 1250, missingCount: 32, missingRate: 2.56, missingStatus: '주의' },
          { rownum: 7, variableName: '나이', totalCount: 1250, missingCount: 0, missingRate: 0.0, missingStatus: '정상' },
          { rownum: 8, variableName: '대출건수', totalCount: 1250, missingCount: 0, missingRate: 0.0, missingStatus: '정상' },
        ],
      },
      message: '',
      errorCode: null,
    };
  },

  outliers: async (params: { variableSeq: number | string; method: string; threshold: number }): Promise<ApiResponse<CreditOutlierResult | CreditOutlierResult[]>> => {
    await sleep(400);
    return {
      success: true,
      data: {
        outliers: [
          { personId: 'P0042', personName: '김철수', variableValue: 182000000, zScore: 3.21, isOutlier: true },
          { personId: 'P0118', personName: '이영희', variableValue: 178000000, zScore: 3.07, isOutlier: true },
          { personId: 'P0235', personName: '박민준', variableValue: 175000000, zScore: 2.98, isOutlier: true },
          { personId: 'P0389', personName: '최지수', variableValue: 172000000, zScore: 2.87, isOutlier: true },
          { personId: 'P0521', personName: '정우성', variableValue: 168000000, zScore: 2.74, isOutlier: true },
        ],
        summary: { totalCount: 1250, outlierCount: 5, method: params.method, threshold: params.threshold },
      },
      message: '',
      errorCode: null,
    };
  },
};

export default creditService;
