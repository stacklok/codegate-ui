import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useBrowserNotification } from "../useBrowserNotification";

describe("useBrowserNotification", () => {
  let mockRequestPermission: (
    deprecatedCallback?: NotificationPermissionCallback | undefined,
  ) => Promise<NotificationPermission>;
  let mockNotification: ReturnType<typeof vi.fn>;

  beforeAll(() => {
    mockRequestPermission = vi.fn();
    mockNotification = vi.fn();

    global.Notification = vi.fn(
      (title: string, options?: NotificationOptions) => {
        mockNotification(title, options);
        return {};
      },
    ) as unknown as typeof Notification;

    Object.defineProperty(global.Notification, "permission", {
      value: "default",
      writable: true,
    });
    global.Notification.requestPermission = mockRequestPermission;
  });

  it("should request the permission for notification", () => {
    renderHook(() => useBrowserNotification());
    expect(mockRequestPermission).toHaveBeenCalled();
  });

  it("should send a notification if permission is granted", () => {
    Object.defineProperty(global.Notification, "permission", {
      value: "granted",
    });

    const { result } = renderHook(() => useBrowserNotification());
    result.current.sendNotification("title", { body: "body" });

    expect(mockNotification).toHaveBeenCalledWith("title", {
      body: "body",
    });
  });

  it("should not send a notification if permission is denied", () => {
    Object.defineProperty(global.Notification, "permission", {
      value: "denied",
    });

    const { result } = renderHook(() => useBrowserNotification());
    result.current.sendNotification("title", { body: "body" });

    expect(mockNotification).not.toHaveBeenCalled();
  });
});
