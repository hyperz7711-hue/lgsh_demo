/**
 * 채팅 서비스 - 데모 모드 (Mock)
 */
import type { ApiResponse } from "@/types/common";
import type { ChatUnreadCountResponse } from "@/types";

export const chatService = {
  getRooms: () => Promise.resolve({ data: { success: true, data: [], message: "", errorCode: null } }),
  createRoom: () => Promise.resolve({ data: { success: true, data: "", message: "", errorCode: null } }),
  createDirectRoom: () => Promise.resolve({ data: { success: true, data: "", message: "", errorCode: null } }),
  getCompanyUsersForDirect: () => Promise.resolve({ data: { success: true, data: [], message: "", errorCode: null } }),
  getMessages: () => Promise.resolve({ data: { success: true, data: [], message: "", errorCode: null } }),
  sendMessage: () => Promise.resolve({ data: { success: true, data: null, message: "", errorCode: null } }),
  getUnreadCount: (): Promise<{ data: ApiResponse<ChatUnreadCountResponse> }> =>
    Promise.resolve({ data: { success: true, data: { unreadCount: 0 }, message: "", errorCode: null } }),
  markRoomRead: () => Promise.resolve({ data: { success: true, data: null, message: "", errorCode: null } }),
};

export default chatService;
