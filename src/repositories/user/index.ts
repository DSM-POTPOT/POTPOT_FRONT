import { emailDTO, fileDTO, loginDTO, loginVO, signupDTO, userDTO, userVO } from "./types";
import { mockUpInstance } from "@/api";

class user {
  public async login(data: loginDTO) {
    return await mockUpInstance<loginVO>({
      accessToken: "abcd",
      refreshToken: "efgh",
    });
  }

  public async signUp(data: signupDTO) {
    return await mockUpInstance<null>(null);
  }

  public async file(data: fileDTO) {
    return await mockUpInstance<null>(null);
  }

  public async profile() {
    return await mockUpInstance<userVO>({
      schoolNumber: "2111",
      name: "육기준",
      email: "dbrrl1127@gmail.com",
      imageUrl: null,
    });
  }

  public async updateProfile(data: userDTO) {
    return await mockUpInstance<null>(null);
  }

  public async sendEmail(data: emailDTO) {
    return await mockUpInstance<null>(null);
  }

  public async matchEmail(email: string, code: string) {
    return await mockUpInstance<null>(null);
  }
}

export default new user();
