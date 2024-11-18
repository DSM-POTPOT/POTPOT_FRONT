"use client";

import { feed } from "@/repositories";
import { allVO } from "@/repositories/feed/types";
import { userVO } from "@/repositories/user/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const items = ["작성한 팟", "신청한 팟", "대기중인 팟"];

interface IProp {
  profile?: userVO;
}

const filters = {
  ALL: "전체",
  TAXI: "택시",
  DELIVERY: "배달",
  FOOD: "택배",
} as const;

const colors = {
  TAXI: "#2EC600",
  DELIVERY: "#2D92EE",
  FOOD: "#D53820",
};

export const Content = ({ profile }: IProp) => {
  const [filter, setFilter] = useState("작성한 팟");
  const [posts, setPosts] = useState<allVO>([]);
  const router = useRouter();

  useEffect(() => {
    if (filter === "작성한 팟") {
      feed.my().then((res) => {
        setPosts(res?.body as allVO);
      });
    } else if (filter === "신청한 팟") {
      feed.all().then((res) => {
        setPosts((res?.body as allVO).filter((i) => i.user_name !== profile?.name).slice(2, 4));
      });
    } else if (filter === "대기중인 팟") {
      feed.all().then((res) => {
        setPosts((res?.body as allVO).filter((i) => i.user_name !== profile?.name).slice(5, 7));
      });
    }
  }, [filter]);

  if (profile) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center mt-[200px] gap-[50px]">
        <div className="w-[800px] p-5 rounded-[20px] bg-lightGray flex justify-center items-center gap-[40px]">
          <Image
            src={"/Profile.png"}
            alt="profile"
            width={100}
            height={100}
            className="[position:relative_!important]"
          />
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex gap-4 items-center">
              <span className="font-semibold text-[40px] leading-none">{profile.name}</span>
              <span className="font-semibold text-[25px] leading-none">
                {profile.school_number}
              </span>
            </div>
            <span className="font-bold text-[24px]">{profile.email}</span>
          </div>
        </div>
        <div className="w-fit flex">
          {items.map((i) => (
            <button
              className={`font-medium text-[18px] w-[300px] h-[50px] self-end rounded-[10px] transition-all ${
                filter === i ? "bg-lightGray" : "bg-white"
              }`}
              key={i}
              onClick={() => setFilter(i)}
            >
              {i}
            </button>
          ))}
        </div>

        {!!posts?.length ? (
          <div className="max-w-[1390px] min-w-[430px] h-full flex flex-wrap gap-[50px] pb-[100px]">
            {posts.map((item) => (
              <div
                className="w-[430px] h-[345px] bg-white shadow-[4px_3px_25px_0px_rgba(0,0,0,0.12)] overflow-hidden rounded-xl cursor-pointer"
                key={item.feed_id}
                onClick={() =>
                  router.push(
                    filter === "작성한 팟"
                      ? `/detail/${item.feed_id}`
                      : `/detail/${item.feed_id}?applied=true`
                  )
                }
              >
                <div className="w-full h-[240px] relative">
                  <span
                    style={{ borderColor: colors[item.category], color: colors[item.category] }}
                    className="absolute border-[1px] top-5 right-5 z-30 p-[8px_30px] rounded-xl bg-lightGray font-semibold text-[14px]"
                  >
                    {filters[item.category]}
                  </span>
                  <div className="w-full h-full absolute z-20 bg-[#00000050]" />
                  <Image
                    className="w-full h-full relative"
                    fill
                    alt="Thumbnail"
                    src={item.image || "/Thumb.png"}
                  />
                </div>
                <div className="p-[20px_30px] flex w-full justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[24px]">{item.title}</span>
                    <span className="font-normal text-[19px] text-gray">{item.user_name}</span>
                  </div>
                  <span className="text-regular text-[20px]">~{" " + item.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <span>모집글이 없습니다</span>
        )}
      </div>
    );
  }
};
