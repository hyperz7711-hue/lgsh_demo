/**
 * 즐겨찾기 서비스 - 데모 모드 (Mock + localStorage)
 */
import type { ApiResponse, FavoriteListResponse, FavoriteToggleResponse } from "@/types";

const STORAGE_KEY = "demo_favorites";

const loadFavorites = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

const saveFavorites = (favs: object[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
};

export const favoriteService = {
  getFavorites: async (): Promise<ApiResponse<FavoriteListResponse>> => {
    await new Promise((r) => setTimeout(r, 100));
    const favs = loadFavorites();
    return { success: true, data: { favorites: favs, totalCount: favs.length }, message: "", errorCode: null };
  },

  addFavorite: async (menuId: string): Promise<ApiResponse<FavoriteToggleResponse>> => {
    const favs = loadFavorites();
    if (!favs.find((f: { menuId: string }) => f.menuId === menuId)) {
      favs.push({ menuId, userId: "demo", menuNm: menuId, menuUrl: null, menuIcon: null, regDt: new Date().toISOString() });
      saveFavorites(favs);
    }
    return { success: true, data: { menuId, isFavorite: true, message: "즐겨찾기에 추가되었습니다." }, message: "", errorCode: null };
  },

  removeFavorite: async (menuId: string): Promise<ApiResponse<FavoriteToggleResponse>> => {
    saveFavorites(loadFavorites().filter((f: { menuId: string }) => f.menuId !== menuId));
    return { success: true, data: { menuId, isFavorite: false, message: "즐겨찾기에서 제거되었습니다." }, message: "", errorCode: null };
  },

  toggleFavorite: async (menuId: string): Promise<ApiResponse<FavoriteToggleResponse>> => {
    const favs = loadFavorites();
    const exists = favs.find((f: { menuId: string }) => f.menuId === menuId);
    if (exists) {
      saveFavorites(favs.filter((f: { menuId: string }) => f.menuId !== menuId));
      return { success: true, data: { menuId, isFavorite: false, message: "즐겨찾기에서 제거되었습니다." }, message: "", errorCode: null };
    } else {
      favs.push({ menuId, userId: "demo", menuNm: menuId, menuUrl: null, menuIcon: null, regDt: new Date().toISOString() });
      saveFavorites(favs);
      return { success: true, data: { menuId, isFavorite: true, message: "즐겨찾기에 추가되었습니다." }, message: "", errorCode: null };
    }
  },
};

export default favoriteService;
