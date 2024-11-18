import { instance, mockUpInstance } from "@/utils/api";
import { allVO, detailVO, editDTO, postVO, uploadDTO } from "./types";
import { server_instance } from "@/utils";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { toast } from "react-toastify";

class feed {
  public async upload(data: uploadDTO, router: AppRouterInstance) {
    try {
      await instance(
        "/feed",
        {
          method: "POST",
          body: data,
          headers: { "Content-Type": "multipart/form-data" },
        },
        true
      );
      router.replace("/main");
      toast.success("성공적으로 등록되었습니다!");
    } catch {
      toast.error("등록 중 오류가 발생했습니다");
    }
  }

  public async edit(data: uploadDTO, router: AppRouterInstance, id: string) {
    try {
      await instance(
        `/feed?id=${id}`,
        {
          method: "PATCH",
          body: data,
          headers: { "Content-Type": "multipart/form-data" },
        },
        true
      );
      router.replace("/main");
      toast.success("성공적으로 수정되었습니다!");
    } catch {
      toast.error("수정 중 오류가 발생했습니다");
    }
  }

  public async delete(id: string, router: AppRouterInstance) {
    try {
      instance(`/feed?id=${id}`, { method: "DELETE" }).then(() => {
        router.replace("/main");
        toast.success("성공적으로 삭제되었습니다!");
      });
    } catch {
      return;
    }
  }

  public async all() {
    try {
      return await server_instance<allVO>("/feed/query/all");
    } catch {
      return;
    }
  }

  public async my() {
    try {
      return await server_instance<allVO>("/feed/query/my");
    } catch {
      return;
    }
  }

  public async detail(id: string) {
    try {
      return await server_instance<detailVO>(`/comment/${id}`, { cache: "no-store" });
    } catch {
      return;
    }
  }
}

const feedCreated = new feed();

export default feedCreated;
