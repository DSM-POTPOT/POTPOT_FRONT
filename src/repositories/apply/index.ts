import { instance, mockUpInstance } from "@/utils/api";
import { allDetailVO, allVO, modifyDTO, myDetailVO, myVO } from "./types";

const mockAll: (n: number) => allDetailVO = (n: number) => ({
  id: n,
  user_name: "육기준",
  is_ok: true,
});

const mockMy: (n: number) => myDetailVO = (n: number) => ({
  id: n,
  feed_id: n,
  is_ok: true,
});

const mockApplyAll: allVO = Array.from({ length: 10 }, (_, index) => mockAll(index));
const mockMyAll: myVO = Array.from({ length: 10 }, (_, index) => mockMy(index));

class apply {
  public async apply(id: string | number, type: "APPLY" | "CANCEL") {
    return await instance(`/apply?feed-id=${id}`, { method: type === "APPLY" ? "POST" : "DELETE" });
  }

  public async modify(data: modifyDTO) {
    return await mockUpInstance<null>(null);
  }

  public async all() {
    return await mockUpInstance<allVO>(mockApplyAll);
  }

  public async my() {
    return await mockUpInstance<myVO>(mockMyAll);
  }
}

const applyCreated = new apply();

export default applyCreated;
