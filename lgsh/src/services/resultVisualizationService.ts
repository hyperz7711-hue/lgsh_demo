/**
 * 결과 시각화 서비스 - 데모 모드 (Mock)
 */
import type { ApiResponse, ResultVisualizationRequestParams, ResultVisualizationResponse } from '@/types';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// 50명 샘플 데이터 생성
const generateRows = () => {
  const grades = ['A', 'A', 'A', 'B', 'B', 'B', 'B', 'C', 'C', 'C', 'C', 'C', 'D', 'D', 'D', 'E'];
  const edCodes = ['GRAD', 'GRAD', 'UNI', 'UNI', 'UNI', 'HIGH', 'HIGH'];
  const homeCodes = ['OWN', 'OWN', 'RENT', 'RENT', 'LEASE'];
  const names = ['김철수', '이영희', '박민준', '최지수', '정우성', '강민서', '윤재현', '임소연', '조현우', '한지민',
                 '서준호', '오채원', '남기준', '류지은', '황도윤', '전민아', '김도현', '박수빈', '이태양', '신유나',
                 '문성준', '배나연', '손현석', '안수진', '장태호', '변지현', '백민수', '노은지', '홍정훈', '곽미래',
                 '심재원', '양은서', '추민성', '원지수', '태현준', '계수빈', '두정훈', '봉은미', '석준혁', '견수아',
                 '마준서', '달지현', '단현우', '동하연', '련수진', '수민준', '아지수', '자현서', '차민아', '하윤호'];

  return Array.from({ length: 50 }, (_, i) => {
    const grade = grades[i % grades.length];
    const scoreBase = grade === 'A' ? 870 : grade === 'B' ? 770 : grade === 'C' ? 670 : grade === 'D' ? 570 : 470;
    const score = Math.min(999, Math.max(300, scoreBase - 30 + Math.floor(i * 7.3) % 60));
    return {
      personId: `P${String(i + 1).padStart(4, '0')}`,
      personNm: names[i],
      creditScore: score,
      creditGrade: grade,
      scoreDt: '2026-01-31',
      marriageYn: i % 3 === 0 ? 'N' : 'Y',
      childrenCnt: i % 5 === 0 ? 0 : i % 4 === 0 ? 3 : i % 3 === 0 ? 1 : 2,
      educationCode: edCodes[i % edCodes.length],
      homeTypeCode: homeCodes[i % homeCodes.length],
      carYn: i % 3 === 0 ? 'N' : 'Y',
      assetAmt: 10000000 + (score - 300) * 500000 + (i * 3000000),
      debtAmt: 5000000 + Math.max(0, (700 - score) * 200000) + (i * 500000),
      creditCardCnt: Math.max(0, Math.floor((score - 400) / 100) + (i % 3)),
      annualIncome: 20000000 + (score - 300) * 200000 + (i * 1000000),
    };
  });
};

const MOCK_ROWS = generateRows();

export const resultVisualizationService = {
  getData: async (
    _params: ResultVisualizationRequestParams
  ): Promise<ApiResponse<ResultVisualizationResponse>> => {
    await sleep(400);
    return {
      success: true,
      data: {
        modelId: 'MODEL-001',
        modelNm: 'LOGISTIC_V3',
        deployedDt: '2026-01-15T10:00:00',
        totalCount: MOCK_ROWS.length,
        rows: MOCK_ROWS,
      },
      message: '',
      errorCode: null,
    };
  },
};

export default resultVisualizationService;
