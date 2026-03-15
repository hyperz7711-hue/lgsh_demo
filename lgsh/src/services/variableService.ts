/**
 * 모델 변수 관리 서비스 - 데모 모드 (Mock)
 * 테이블: TB_MODEL_VARIABLE
 * 화면ID: VAR-001
 */
import {
    Variable,
    VariableListParams,
    VariableCreateRequest,
    VariableUpdateRequest,
    PageResponse,
    ApiResponse
} from '../types';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const MOCK_VARIABLES: Variable[] = [
  { variableSeq: 1, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'annual_income', variableNm: '연소득', variableGroup: 'INCOME', variableGroupNm: '소득', variableType: 'NUMERIC', variableTypeNm: '수치형', encodingType: 'WOE', encodingTypeNm: 'WOE', variableOrder: 1, weight: 0.285, useYn: 'Y', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
  { variableSeq: 2, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'debt_ratio', variableNm: '부채비율', variableGroup: 'DEBT', variableGroupNm: '부채', variableType: 'NUMERIC', variableTypeNm: '수치형', encodingType: 'WOE', encodingTypeNm: 'WOE', variableOrder: 2, weight: 0.198, useYn: 'Y', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
  { variableSeq: 3, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'credit_card_cnt', variableNm: '카드보유수', variableGroup: 'CREDIT', variableGroupNm: '신용', variableType: 'NUMERIC', variableTypeNm: '수치형', encodingType: 'WOE', encodingTypeNm: 'WOE', variableOrder: 3, weight: 0.152, useYn: 'Y', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
  { variableSeq: 4, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'asset_amt', variableNm: '자산금액', variableGroup: 'ASSET', variableGroupNm: '자산', variableType: 'NUMERIC', variableTypeNm: '수치형', encodingType: 'WOE', encodingTypeNm: 'WOE', variableOrder: 4, weight: 0.145, useYn: 'Y', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
  { variableSeq: 5, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'debt_amt', variableNm: '부채금액', variableGroup: 'DEBT', variableGroupNm: '부채', variableType: 'NUMERIC', variableTypeNm: '수치형', encodingType: 'WOE', encodingTypeNm: 'WOE', variableOrder: 5, weight: 0.128, useYn: 'Y', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
  { variableSeq: 6, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'children_cnt', variableNm: '자녀수', variableGroup: 'FAMILY', variableGroupNm: '가족', variableType: 'NUMERIC', variableTypeNm: '수치형', encodingType: 'WOE', encodingTypeNm: 'WOE', variableOrder: 6, weight: 0.052, useYn: 'Y', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
  { variableSeq: 7, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'home_type_code', variableNm: '주거형태', variableGroup: 'ASSET', variableGroupNm: '자산', variableType: 'CATEGORICAL', variableTypeNm: '범주형', encodingType: 'ONE-HOT', encodingTypeNm: 'One-Hot', variableOrder: 7, weight: 0.040, useYn: 'Y', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
  { variableSeq: 8, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'education_code', variableNm: '학력', variableGroup: 'PERSONAL', variableGroupNm: '개인정보', variableType: 'CATEGORICAL', variableTypeNm: '범주형', encodingType: 'ONE-HOT', encodingTypeNm: 'One-Hot', variableOrder: 8, weight: 0.038, useYn: 'Y', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
  { variableSeq: 9, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'age', variableNm: '나이', variableGroup: 'PERSONAL', variableGroupNm: '개인정보', variableType: 'NUMERIC', variableTypeNm: '수치형', encodingType: 'WOE', encodingTypeNm: 'WOE', variableOrder: 9, weight: 0.035, useYn: 'Y', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
  { variableSeq: 10, modelId: 'MODEL-001', modelNm: 'LOGISTIC_V3', variableId: 'car_yn', variableNm: '자동차보유', variableGroup: 'ASSET', variableGroupNm: '자산', variableType: 'CATEGORICAL', variableTypeNm: '범주형', encodingType: 'ONE-HOT', encodingTypeNm: 'One-Hot', variableOrder: 10, weight: 0.027, useYn: 'N', regUserId: 'admin', regDt: '2025-12-01T00:00:00' },
];

export const variableService = {
    list: async (params: VariableListParams): Promise<ApiResponse<PageResponse<Variable>>> => {
        await sleep(300);
        let filtered = [...MOCK_VARIABLES];
        if (params.modelId) filtered = filtered.filter((v) => v.modelId === params.modelId);
        if (params.variableGroup) filtered = filtered.filter((v) => v.variableGroup === params.variableGroup);
        if (params.keyword) filtered = filtered.filter((v) => v.variableNm.includes(params.keyword!) || v.variableId.includes(params.keyword!));
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

    get: async (variableSeq: number): Promise<ApiResponse<Variable>> => {
        await sleep(200);
        const v = MOCK_VARIABLES.find((x) => x.variableSeq === variableSeq);
        if (!v) return { success: false, data: null, message: '변수를 찾을 수 없습니다.', errorCode: 'NOT_FOUND' };
        return { success: true, data: v, message: '', errorCode: null };
    },

    create: async (_data: VariableCreateRequest): Promise<ApiResponse<number>> => {
        await sleep(400);
        const newSeq = MOCK_VARIABLES.length + 1;
        return { success: true, data: newSeq, message: '등록되었습니다.', errorCode: null };
    },

    update: async (_variableSeq: number, _data: VariableUpdateRequest): Promise<ApiResponse<void>> => {
        await sleep(300);
        return { success: true, data: undefined, message: '수정되었습니다.', errorCode: null };
    },

    delete: async (_variableSeq: number): Promise<ApiResponse<void>> => {
        await sleep(300);
        return { success: true, data: undefined, message: '삭제되었습니다.', errorCode: null };
    },
};

export default variableService;
