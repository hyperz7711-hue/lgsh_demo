/**
 * 모델관리 서비스 - 데모 모드 (Mock)
 */
import type {
  ModelListResponse,
  ModelDetailResponse,
  ModelSearchParams,
  ModelCreateRequest,
  ModelUpdateRequest,
  ModelTrainRequest,
  ModelTrainStatusResponse,
  ModelDeployRequest,
} from '@/types';
import type { ApiResponse, PageResponse } from '@/types/common';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_MODELS: ModelListResponse[] = [
  {
    modelId: 'MODEL-001', companyId: 'C001', companyNm: '(주)한국전자',
    modelNm: 'LOGISTIC_V3', modelType: 'MAIN', modelTypeNm: '메인모델',
    modelVersion: '3.0.0', algorithmType: 'LOGISTIC', algorithmTypeNm: '로지스틱회귀',
    approvalStatus: 'DEPLOYED', approvalStatusNm: '배포중',
    aucScore: 0.921, ksStat: 0.512, ar: 0.843,
    trainingDataCnt: 12500, deployedDt: '2026-01-15T10:00:00',
    regUserId: 'admin', regDt: '2025-12-20T09:00:00',
  },
  {
    modelId: 'MODEL-002', companyId: 'C002', companyNm: '대한무역(주)',
    modelNm: 'XGBOOST_V2', modelType: 'CHALLENGER', modelTypeNm: '챌린저모델',
    modelVersion: '2.1.0', algorithmType: 'XGBOOST', algorithmTypeNm: 'XGBoost',
    approvalStatus: 'APPROVED', approvalStatusNm: '승인완료',
    aucScore: 0.935, ksStat: 0.528, ar: 0.861,
    trainingDataCnt: 11800, deployedDt: null,
    regUserId: 'admin', regDt: '2026-01-05T14:00:00',
  },
  {
    modelId: 'MODEL-003', companyId: 'C003', companyNm: '미래건설(주)',
    modelNm: 'LOGISTIC_V2', modelType: 'REFERENCE', modelTypeNm: '참조모델',
    modelVersion: '2.5.0', algorithmType: 'LOGISTIC', algorithmTypeNm: '로지스틱회귀',
    approvalStatus: 'ARCHIVED', approvalStatusNm: '보관',
    aucScore: 0.908, ksStat: 0.495, ar: 0.826,
    trainingDataCnt: 10200, deployedDt: '2025-07-01T10:00:00',
    regUserId: 'admin', regDt: '2025-06-10T09:00:00',
  },
  {
    modelId: 'MODEL-004', companyId: 'C001', companyNm: '(주)한국전자',
    modelNm: 'TABNET_V1', modelType: 'TEST', modelTypeNm: '테스트모델',
    modelVersion: '1.0.0', algorithmType: 'TABNET', algorithmTypeNm: 'TabNet',
    approvalStatus: 'DRAFT', approvalStatusNm: '초안',
    aucScore: 0.942, ksStat: 0.541, ar: 0.872,
    trainingDataCnt: 12500, deployedDt: null,
    regUserId: 'admin', regDt: '2026-02-01T11:00:00',
  },
];

export const modelService = {
  list: async (params: ModelSearchParams = {}) => {
    await sleep(400);
    let filtered = [...MOCK_MODELS];
    if (params.companyId) filtered = filtered.filter((m) => m.companyId === params.companyId);
    if (params.algorithmType) filtered = filtered.filter((m) => m.algorithmType === params.algorithmType);
    if (params.approvalStatus) filtered = filtered.filter((m) => m.approvalStatus === params.approvalStatus);
    const page = params.page ?? 0;
    const size = params.size ?? 10;
    const response: ApiResponse<PageResponse<ModelListResponse>> = {
      success: true,
      data: {
        content: filtered.slice(page * size, page * size + size),
        totalElements: filtered.length,
        totalPages: Math.ceil(filtered.length / size),
        number: page,
        size,
      },
      message: '',
      errorCode: null,
    };
    return { data: response };
  },

  detail: async (modelId: string) => {
    await sleep(300);
    const model = MOCK_MODELS.find((m) => m.modelId === modelId);
    if (!model) return { data: { success: false, data: null, message: '모델을 찾을 수 없습니다.', errorCode: 'NOT_FOUND' } };
    const detail: ModelDetailResponse = {
      ...model,
      modelFilePath: `/models/${modelId}/model.pkl`,
      evalReportJson: JSON.stringify({ accuracy: 0.891, precision: 0.842, recall: 0.875 }),
      featureListJson: JSON.stringify(['annual_income', 'debt_ratio', 'credit_card_cnt', 'asset_amt', 'debt_amt', 'children_cnt', 'age']),
      variables: [],
      changeHistory: [
        { changeSeq: 1, modelId, changeType: 'DEPLOY', changeTypeNm: '배포', changeReason: '운영 배포', beforeStatus: 'APPROVED', afterStatus: 'DEPLOYED', changeUserId: 'admin', changeDt: '2026-01-15T10:00:00' },
        { changeSeq: 2, modelId, changeType: 'APPROVE', changeTypeNm: '승인', changeReason: '성능 검증 완료', beforeStatus: 'READY', afterStatus: 'APPROVED', changeUserId: 'manager', changeDt: '2026-01-14T15:00:00' },
      ],
    };
    return { data: { success: true, data: detail, message: '', errorCode: null } };
  },

  create: async (data: ModelCreateRequest) => {
    await sleep(500);
    const newModel: ModelDetailResponse = {
      modelId: `MODEL-${String(Date.now()).slice(-5)}`, companyId: 'C001',
      modelNm: data.modelNm, modelType: data.modelType, modelVersion: '1.0.0',
      algorithmType: data.algorithmType, approvalStatus: 'DRAFT',
      useYn: 'Y', regUserId: 'admin', regDt: new Date().toISOString(),
    };
    return { data: { success: true, data: newModel, message: '등록되었습니다.', errorCode: null } };
  },

  update: async (modelId: string, data: ModelUpdateRequest) => {
    await sleep(300);
    return { data: { success: true, data: { modelId, ...data }, message: '수정되었습니다.', errorCode: null } };
  },

  train: async (_data: ModelTrainRequest) => {
    await sleep(600);
    const status: ModelTrainStatusResponse = {
      modelId: _data.modelId, modelNm: 'MODEL', approvalStatus: 'TRAINING', approvalStatusNm: '학습중',
      progress: 0, currentStep: '데이터 전처리', steps: [],
      trainingStartDt: new Date().toISOString(),
    };
    return { data: { success: true, data: status, message: '', errorCode: null } };
  },

  getTrainStatus: async (modelId: string) => {
    await sleep(300);
    const status: ModelTrainStatusResponse = {
      modelId, modelNm: 'MODEL', approvalStatus: 'READY', approvalStatusNm: '학습완료',
      progress: 100, currentStep: '완료',
      steps: [
        { step: '데이터 전처리', status: 'COMPLETED', duration: 12 },
        { step: '모델 학습', status: 'COMPLETED', duration: 48 },
        { step: '성능 평가', status: 'COMPLETED', duration: 8 },
      ],
      trainingStartDt: new Date(Date.now() - 68000).toISOString(),
    };
    return { data: { success: true, data: status, message: '', errorCode: null } };
  },

  deploy: async (modelId: string, _data: ModelDeployRequest = {}) => {
    await sleep(500);
    const model = MOCK_MODELS.find((m) => m.modelId === modelId);
    return { data: { success: true, data: { ...model, approvalStatus: 'DEPLOYED', deployedDt: new Date().toISOString() }, message: '배포되었습니다.', errorCode: null } };
  },

  delete: async (_modelId: string) => {
    await sleep(300);
    return { data: { success: true, data: undefined, message: '삭제되었습니다.', errorCode: null } };
  },
};

export default modelService;
