import { createTask } from "./[[...id]]"
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { userService } from "@/src/lib/services/user";
import { taskService } from "@/src/lib/services/task";

jest.mock("next-auth");
jest.mock("@/app/lib/services/user");
jest.mock("@/app/lib/services/task");

describe("createTask", () => {
  const mockSession = { user: { email: "test@example.com" } };
  const mockRequest = { body: { title: "Test Task" } } as NextApiRequest;
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
  } as unknown as NextApiResponse;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a task when user exists", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
    (userService.getByEmail as jest.Mock).mockResolvedValueOnce({ id: 1 });
    (taskService.create as jest.Mock).mockResolvedValueOnce({ id: 1 });

    await createTask(mockRequest, mockResponse);

    expect(getServerSession).toHaveBeenCalled();
    expect(userService.getByEmail).toHaveBeenCalledWith("test@example.com");
    expect(taskService.create).toHaveBeenCalledWith({
      title: "Test Task",
      userId: 1,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      msg: "Task created successfully",
    });
  });

  it("should return an error when user doesn't exist", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(mockSession);
    (userService.getByEmail as jest.Mock).mockResolvedValueOnce(undefined);

    await createTask(mockRequest, mockResponse);

    expect(getServerSession).toHaveBeenCalled();
    expect(userService.getByEmail).toHaveBeenCalledWith("test@example.com");
    expect(taskService.create).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: "User doesn't exist",
    });
  });

  it("should return an error when session is not available", async () => {
    (getServerSession as jest.Mock).mockResolvedValueOnce(undefined);

    await createTask(mockRequest, mockResponse);

    expect(getServerSession).toHaveBeenCalled();
    expect(userService.getByEmail).not.toHaveBeenCalled();
    expect(taskService.create).not.toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: "User doesn't exist",
    });
  });
});
