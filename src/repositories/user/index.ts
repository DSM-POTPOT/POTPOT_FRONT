import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { emailDTO, fileDTO, loginDTO, loginVO, signupDTO, userDTO, userVO } from "./types";
import { instance, mockUpInstance } from "@/utils/api";
import cookies from "js-cookie";
import { toast } from "react-toastify";
import { server_instance } from "@/utils";

class user {
  public async login(data: loginDTO, router: AppRouterInstance) {
    try {
      const { body }: { body: loginVO } = await instance("/user/signin", {
        method: "POST",
        body: { ...data },
      });

      console.log(body);
      router.replace("/main");
      cookies.set("access_token", body.access_token);
      cookies.set("refresh_token", body.refresh_token);
      toast.success("성공적으로 로그인되었습니다!");
    } catch {
      toast.error("로그인 중 오류가 발생했습니다");
    }
  }

  public async signUp(data: signupDTO, router: AppRouterInstance) {
    try {
      await instance("/user/signup", { method: "POST", body: { ...data, image_url: null } });
      router.replace("/login");
      toast.success("성공적으로 회원가입되었습니다!");
    } catch {
      toast.error("회원가입 중 오류가 발생했습니다");
    }
  }

  public async file(data: fileDTO) {
    return await mockUpInstance<null>(null);
  }

  public async profile() {
    try {
      return await server_instance<userVO>("/user/users");
    } catch {
      return;
    }
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

const userCreated = new user();

export default userCreated;
