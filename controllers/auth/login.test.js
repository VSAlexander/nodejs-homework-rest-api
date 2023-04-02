const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");

const { handleRequestError } = require("../../helpers");

const login = require("./login");

jest.mock("../../models/user", () => ({
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
}));

jest.mock("../../helpers", () => ({
  handleRequestError: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

describe("login", () => {
  let req, res, next;
  beforeEach(() => {
    req = {
      body: {
        email: "test@test.com",
        password: "password123",
      },
    };
    res = {
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should handle invalid email", async () => {
    User.findOne.mockResolvedValueOnce(null);
    await expect(login(req, res, next)).rejects.toEqual(
      handleRequestError(401, "Email or password are incorrect")
    );
    expect(handleRequestError).toHaveBeenCalledWith(
      401,
      "Email or password are incorrect"
    );
    expect(User.findOne).toHaveBeenCalledWith({ email: "test@test.com" });
  });

  it("should handle invalid password", async () => {
    User.findOne.mockResolvedValueOnce({
      password: "hashedPassword",
    });
    bcrypt.compare.mockResolvedValueOnce(false);

    await expect(login(req, res, next)).rejects.toEqual(
      handleRequestError(401, "Email or password are incorrect")
    );

    expect(handleRequestError).toHaveBeenCalledWith(
      401,
      "Email or password are incorrect"
    );
    expect(User.findOne).toHaveBeenCalledWith({ email: "test@test.com" });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "password123",
      "hashedPassword"
    );
  });

  it("should login successfully", async () => {
    const token = "myToken";
    User.findOne.mockResolvedValueOnce({
      _id: "user123",
      password: "hashedPassword",
    });
    bcrypt.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValueOnce(token);

    await login(req, res, next);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith("user123", { token });
    expect(res.json).toHaveBeenCalledWith({ token });
  });
});
