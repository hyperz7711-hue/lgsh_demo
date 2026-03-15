/**
 * 시뮬레이션 서비스 - 데모 모드 (Mock)
 */
import type { ApiResponse } from '@/types';
import type {
  SimulationHistoryResponse,
  SimulationRequest,
  SimulationResult,
  SimulationSaveRequest,
  SimulationSaveResponse,
} from '@/types';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const GRADE_MAP = (score: number): string => {
  if (score >= 850) return 'A';
  if (score >= 750) return 'B';
  if (score >= 650) return 'C';
  if (score >= 550) return 'D';
  return 'E';
};

let _simIdSeq = 100;

const simulationService = {
  runSimulation: async (payload: SimulationRequest): Promise<ApiResponse<SimulationResult>> => {
    await sleep(600);
    const beforeScore = 652;
    // Calculate delta based on adjustments
    let totalDelta = 0;
    const breakdown = payload.adjustments.map((adj) => {
      const delta = adj.mode === 'replace'
        ? (adj.value > 50000000 ? 18 : adj.value > 30000000 ? 8 : -5)
        : adj.value * 0.5;
      totalDelta += delta;
      return { key: adj.key, inputValue: adj.value, delta: Math.round(delta) };
    });
    const afterScore = Math.min(999, Math.max(300, Math.round(beforeScore + totalDelta)));
    return {
      success: true,
      data: {
        beforeScore,
        afterScore,
        delta: afterScore - beforeScore,
        beforeGrade: GRADE_MAP(beforeScore),
        afterGrade: GRADE_MAP(afterScore),
        appliedColumns: payload.adjustments.map((a) => a.key),
        breakdown,
      },
      message: '',
      errorCode: null,
    };
  },

  saveSimulation: async (_payload: SimulationSaveRequest): Promise<ApiResponse<SimulationSaveResponse>> => {
    await sleep(300);
    return { success: true, data: { simId: ++_simIdSeq }, message: '시뮬레이션이 저장되었습니다.', errorCode: null };
  },

  fetchHistory: async (_params?: {
    scenarioType?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
  }): Promise<ApiResponse<SimulationHistoryResponse>> => {
    await sleep(400);
    const items = [
      { simId: 100, personId: 'P0001', personName: '김철수', scenarioType: 'INCOME_UP', beforeScore: 612, afterScore: 648, scoreDiff: 36, simDt: '2026-02-19T14:22:00', simScenario: '연소득 5000만원 조정' },
      { simId: 99, personId: 'P0012', personName: '이영희', scenarioType: 'DEBT_DOWN', beforeScore: 578, afterScore: 632, scoreDiff: 54, simDt: '2026-02-18T11:05:00', simScenario: '부채금액 감소 시나리오' },
      { simId: 98, personId: 'P0035', personName: '박민준', scenarioType: 'CARD_REDUCE', beforeScore: 695, afterScore: 712, scoreDiff: 17, simDt: '2026-02-17T09:45:00', simScenario: '카드수 2장 감소' },
      { simId: 97, personId: 'P0048', personName: '최지수', scenarioType: 'ASSET_UP', beforeScore: 540, afterScore: 568, scoreDiff: 28, simDt: '2026-02-16T15:30:00', simScenario: '자산 증가 시나리오' },
      { simId: 96, personId: 'P0062', personName: '정우성', scenarioType: 'INCOME_UP', beforeScore: 720, afterScore: 742, scoreDiff: 22, simDt: '2026-02-15T10:12:00', simScenario: '연소득 6000만원 조정' },
    ];
    return {
      success: true,
      data: { items, page: 0, size: 10, total: items.length },
      message: '',
      errorCode: null,
    };
  },
};

export default simulationService;
