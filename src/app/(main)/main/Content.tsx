"use client";

import { Button } from "@/components";
import { allVO } from "@/repositories/feed/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

interface IProp {
  data?: allVO;
}

export const Content = ({ data }: IProp) => {
  const [filter, setFilter] = useState<keyof typeof filters>("ALL");
  const { push } = useRouter();
  const filteredData = filter === "ALL" ? data : data?.filter((i) => i.category === filter);

  return (
    <div className="w-full h-full flex justify-center mt-[50px]">
      <div className="max-w-[1390px] min-w-[430px] w-full flex flex-col gap-[50px] items-center">
        <nav className="w-fit h-[50px] flex gap-[15px] shrink-0 self-end">
          <Button onClick={() => push("/create")}>팟 모집하기</Button>
          <div className="w-fit flex">
            {Object.entries(filters).map((i) => (
              <button
                className={`font-medium text-[18px] w-[100px] h-full self-end rounded-[10px] transition-all ${
                  filter === i[0] ? "bg-lightGray" : "bg-white"
                }`}
                key={i[1]}
                onClick={() => setFilter(i[0] as keyof typeof filters)}
              >
                {i[1]}
              </button>
            ))}
          </div>
        </nav>

        {!!filteredData?.length ? (
          <div className="w-full flex flex-wrap gap-[50px] pb-[50px]">
            {filteredData.map((item) => (
              <div
                className="w-[430px] h-[345px] bg-white shadow-[4px_3px_25px_0px_rgba(0,0,0,0.12)] overflow-hidden rounded-xl cursor-pointer"
                key={item.feed_id}
                onClick={() => push("/detail/" + item.feed_id)}
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
    </div>
  );
};
