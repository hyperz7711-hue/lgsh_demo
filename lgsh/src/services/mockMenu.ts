/**
 * Mock 메뉴 데이터 - DB TB_SYS_MENU 기반 (데모용)
 */
import type { MenuItem, MenuPermission, ApiResponse } from "@/types";
import { MenuResponse } from "./menuService";

const mockMenus: MenuItem[] = [
  { menuId: "M01", menuNm: "대시보드", menuLevel: 1, parentMenuId: null, menuUrl: "/dashboard", menuIcon: "fa-tachometer-alt", sortOrder: 1, children: [] },
  {
    menuId: "M02", menuNm: "신용평가", menuLevel: 1, parentMenuId: null, menuUrl: null, menuIcon: "fa-chart-line", sortOrder: 2,
    children: [
      { menuId: "M0200", menuNm: "대상자 목록", menuLevel: 2, parentMenuId: "M02", menuUrl: "/persons", menuIcon: "fa-list-ul", sortOrder: 1, children: [] },
      { menuId: "M0201", menuNm: "대상자 등록", menuLevel: 2, parentMenuId: "M02", menuUrl: "/persons/create", menuIcon: "fa-user-plus", sortOrder: 2, children: [] },
      { menuId: "M0202", menuNm: "대상자 상세", menuLevel: 2, parentMenuId: "M02", menuUrl: "/persons/detail", menuIcon: "fa-id-card", sortOrder: 3, children: [] },
      { menuId: "M0203", menuNm: "평가 실행", menuLevel: 2, parentMenuId: "M02", menuUrl: "/credit/run", menuIcon: "fa-play-circle", sortOrder: 4, children: [] },
      { menuId: "M0204", menuNm: "점수 분포", menuLevel: 2, parentMenuId: "M02", menuUrl: "/credit/distribution", menuIcon: "fa-chart-bar", sortOrder: 5, children: [] },
      { menuId: "M0205", menuNm: "관리그룹", menuLevel: 2, parentMenuId: "M02", menuUrl: "/psngrp", menuIcon: "fa-layer-group", sortOrder: 6, children: [] },
      { menuId: "M0206", menuNm: "시뮬레이션", menuLevel: 2, parentMenuId: "M02", menuUrl: "/simulation", menuIcon: "ExperimentOutlined", sortOrder: 7, children: [] },
      { menuId: "M0207", menuNm: "시뮬레이션이력", menuLevel: 2, parentMenuId: "M02", menuUrl: "/simulation/history", menuIcon: "HistoryOutlined", sortOrder: 8, children: [] },
    ],
  },
  {
    menuId: "M03", menuNm: "시뮬레이션", menuLevel: 1, parentMenuId: null, menuUrl: null, menuIcon: "fa-flask", sortOrder: 3,
    children: [
      { menuId: "M0301", menuNm: "시뮬레이션 실행", menuLevel: 2, parentMenuId: "M03", menuUrl: "/simulation", menuIcon: "fa-flask", sortOrder: 1, children: [] },
      { menuId: "M0302", menuNm: "시뮬레이션 이력", menuLevel: 2, parentMenuId: "M03", menuUrl: "/simulation/history", menuIcon: "fa-history", sortOrder: 2, children: [] },
    ],
  },
  {
    menuId: "M04", menuNm: "분석관리", menuLevel: 1, parentMenuId: null, menuUrl: null, menuIcon: "fa-brain", sortOrder: 4,
    children: [
      { menuId: "M0401", menuNm: "모델 관리", menuLevel: 2, parentMenuId: "M04", menuUrl: "/models", menuIcon: "fa-cubes", sortOrder: 1, children: [] },
      { menuId: "M0406", menuNm: "모델 선택", menuLevel: 2, parentMenuId: "M04", menuUrl: "/analysis/model-select", menuIcon: "fa-play-circle", sortOrder: 2, children: [] },
      { menuId: "M0402", menuNm: "기초데이터업로드", menuLevel: 2, parentMenuId: "M04", menuUrl: "/admin/rawdata", menuIcon: "UploadOutlined", sortOrder: 3, children: [] },
      { menuId: "M0403", menuNm: "기초데이터조회", menuLevel: 2, parentMenuId: "M04", menuUrl: "/admin/rawdata-list", menuIcon: "DatabaseOutlined", sortOrder: 4, children: [] },
      { menuId: "M0404", menuNm: "데이터분석", menuLevel: 2, parentMenuId: "M04", menuUrl: "/analysis", menuIcon: "BarChartOutlined", sortOrder: 5, children: [] },
      { menuId: "M0405", menuNm: "시계열 분석", menuLevel: 2, parentMenuId: "M04", menuUrl: "/analysis/time-series", menuIcon: "LineChartOutlined", sortOrder: 6, children: [] },
      { menuId: "M0407", menuNm: "스파이더웹 분석", menuLevel: 2, parentMenuId: "M04", menuUrl: "/analysis/spider", menuIcon: "RadarChartOutlined", sortOrder: 7, children: [] },
      { menuId: "M0408", menuNm: "결과 시각화", menuLevel: 2, parentMenuId: "M04", menuUrl: "/analysis/result-visualization", menuIcon: "DotChartOutlined", sortOrder: 8, children: [] },
      { menuId: "M0409", menuNm: "변수메타", menuLevel: 2, parentMenuId: "M04", menuUrl: "/admin/variables", menuIcon: "ProfileOutlined", sortOrder: 9, children: [] },
    ],
  },
  {
    menuId: "M05", menuNm: "사용자관리", menuLevel: 1, parentMenuId: null, menuUrl: null, menuIcon: "fa-users", sortOrder: 5,
    children: [
      { menuId: "M0501", menuNm: "사용자 목록", menuLevel: 2, parentMenuId: "M05", menuUrl: "/users", menuIcon: "fa-user-cog", sortOrder: 1, children: [] },
      { menuId: "M0502", menuNm: "사용자 승인", menuLevel: 2, parentMenuId: "M05", menuUrl: "/users/approval", menuIcon: "fa-user-check", sortOrder: 2, children: [] },
    ],
  },
  {
    menuId: "M06", menuNm: "원청사관리", menuLevel: 1, parentMenuId: null, menuUrl: null, menuIcon: "fa-building", sortOrder: 6,
    children: [
      { menuId: "M0601", menuNm: "원청사 목록", menuLevel: 2, parentMenuId: "M06", menuUrl: "/companies", menuIcon: "fa-briefcase", sortOrder: 1, children: [] },
      { menuId: "M0602", menuNm: "원청사 설정", menuLevel: 2, parentMenuId: "M06", menuUrl: "/companies/settings", menuIcon: "fa-sliders-h", sortOrder: 2, children: [] },
    ],
  },
  {
    menuId: "M07", menuNm: "공지사항", menuLevel: 1, parentMenuId: null, menuUrl: "/notices", menuIcon: "fa-bullhorn", sortOrder: 7,
    children: [
      { menuId: "M0701", menuNm: "공지 목록", menuLevel: 2, parentMenuId: "M07", menuUrl: "/notices", menuIcon: "fa-list", sortOrder: 1, children: [] },
    ],
  },
  {
    menuId: "M08", menuNm: "시스템관리", menuLevel: 1, parentMenuId: null, menuUrl: null, menuIcon: "fa-cogs", sortOrder: 8,
    children: [
      { menuId: "M0801", menuNm: "공통코드 관리", menuLevel: 2, parentMenuId: "M08", menuUrl: "/admin/codes", menuIcon: "fa-tags", sortOrder: 1, children: [] },
      { menuId: "M0802", menuNm: "메뉴 관리", menuLevel: 2, parentMenuId: "M08", menuUrl: "/admin/menus", menuIcon: "fa-sitemap", sortOrder: 2, children: [] },
      { menuId: "M0803", menuNm: "역할 관리", menuLevel: 2, parentMenuId: "M08", menuUrl: "/admin/roles", menuIcon: "fa-user-shield", sortOrder: 3, children: [] },
      { menuId: "M0804", menuNm: "환경설정", menuLevel: 2, parentMenuId: "M08", menuUrl: "/admin/configs", menuIcon: "fa-wrench", sortOrder: 4, children: [] },
      { menuId: "M0805", menuNm: "메시지코드", menuLevel: 2, parentMenuId: "M08", menuUrl: "/admin/messages", menuIcon: "fa-comment-alt", sortOrder: 5, children: [] },
      { menuId: "M0806", menuNm: "배치 관리", menuLevel: 2, parentMenuId: "M08", menuUrl: "/admin/batches", menuIcon: "fa-clock", sortOrder: 6, children: [] },
      { menuId: "M0807", menuNm: "파일 관리", menuLevel: 2, parentMenuId: "M08", menuUrl: "/admin/files", menuIcon: "fa-folder-open", sortOrder: 7, children: [] },
    ],
  },
  {
    menuId: "M09", menuNm: "AI 어시스턴트", menuLevel: 1, parentMenuId: null, menuUrl: "/ai/chat", menuIcon: "fa-robot", sortOrder: 9,
    children: [
      { menuId: "M0901", menuNm: "AI 챗봇", menuLevel: 2, parentMenuId: "M09", menuUrl: "/ai/chat", menuIcon: "fa-comments", sortOrder: 1, children: [] },
      { menuId: "M0902", menuNm: "AI 채팅 로그", menuLevel: 2, parentMenuId: "M09", menuUrl: "/ai/chatlogs", menuIcon: "MessageOutlined", sortOrder: 2, children: [] },
    ],
  },
  {
    menuId: "M10", menuNm: "월간레포트", menuLevel: 1, parentMenuId: null, menuUrl: "/report", menuIcon: "fa-file-pdf", sortOrder: 10,
    children: [
      { menuId: "M1001", menuNm: "레포트 생성", menuLevel: 2, parentMenuId: "M10", menuUrl: "/report/create", menuIcon: "fa-plus-circle", sortOrder: 1, children: [] },
      { menuId: "M1002", menuNm: "레포트 이력", menuLevel: 2, parentMenuId: "M10", menuUrl: "/report/history", menuIcon: "fa-history", sortOrder: 2, children: [] },
      { menuId: "M1003", menuNm: "마감 관리", menuLevel: 2, parentMenuId: "M10", menuUrl: "/report/close", menuIcon: "fa-lock", sortOrder: 3, children: [] },
      { menuId: "M1004", menuNm: "항목관리", menuLevel: 2, parentMenuId: "M10", menuUrl: "/report/items", menuIcon: "fa-cogs", sortOrder: 4, children: [] },
    ],
  },
];

const buildPermissions = (menus: MenuItem[]): MenuPermission[] => {
  const perms: MenuPermission[] = [];
  const traverse = (items: MenuItem[]) => {
    items.forEach((item) => {
      perms.push({ menuId: item.menuId, canRead: true, canWrite: true, canDelete: true, exportYn: true });
      if (item.children && item.children.length > 0) traverse(item.children);
    });
  };
  traverse(menus);
  return perms;
};

const mockPermissions = buildPermissions(mockMenus);

export const mockMenuService = {
  getUserMenus: async (): Promise<ApiResponse<MenuResponse>> => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return {
      success: true,
      errorCode: "",
      data: { menus: mockMenus, permissions: mockPermissions },
      message: "메뉴 조회 성공",
    };
  },
};

export default mockMenuService;
