import { instance } from "@/utils/api";

class comment {
  public async upload(data: string, feedId: string) {
    return await instance(`/comment/${feedId}`, {
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: data,
      method: "POST",
    });
  }

  public async edit(data: string, id: number) {
    return await instance(`/comment/${id}`, {
      body: data,
      method: "PATCH",
    });
  }

  public async delete(id: number) {
    return await instance(`/comment/${id}`, { method: "DELETE" });
  }
}

const commentCreated = new comment();

export default commentCreated;
