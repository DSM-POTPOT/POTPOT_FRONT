import { mockUpInstance } from "@/api";
import { allVO, detailVO, editDTO, postVO, uploadDTO } from "./types";

const mockFeed: (n: number) => postVO = (n: number) => ({
  user_name: "육기준",
  title: "배달달",
  category: "DELIVERY",
  date: "24.10.22",
  content: "토요일인데 배달 시킵시다",
  image: null,
  is_ok: true,
  feed_id: n,
});

const mockFeedAll: allVO = Array.from({ length: 10 }, (_, index) => mockFeed(index));

const mockFeedDetail: detailVO = {
  ...mockFeed(0),
  comment_list: [{ comment: "test" }],
};

class feed {
  public async upload(data: uploadDTO) {
    return await mockUpInstance<null>(null);
  }

  public async edit(data: editDTO) {
    return await mockUpInstance<null>(null);
  }

  public async delete(id: string) {
    return await mockUpInstance<null>(null);
  }

  public async all() {
    return await mockUpInstance<allVO>(mockFeedAll);
  }

  public async detail(id: string) {
    return await mockUpInstance<detailVO>(mockFeedDetail);
  }
}

export default new feed();
