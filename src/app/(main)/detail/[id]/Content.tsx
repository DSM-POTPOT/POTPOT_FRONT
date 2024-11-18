"use client";

import { Button } from "@/components";
import { Comment } from "@/components/Comment";
import { TextArea } from "@/components/TextArea";
import { feed } from "@/repositories";
import commentCreated from "@/repositories/comment";
import { detailVO } from "@/repositories/feed/types";
import { userVO } from "@/repositories/user/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  data?: detailVO;
  profile?: userVO;
  id: string;
}

export const Content = ({ data, profile, id }: IProp) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [selected, setSelected] = useState(false);
  const [applied, setApplied] = useState(["육기준", "유하은", "박수현"]);

  useEffect(() => {
    if (document.location.href.split("?")[1]?.split("=")[1] === "true") {
      setSelected(true);
    }
  }, []);

  if (data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="max-w-[1100px] h-[80%] w-full flex gap-[50px]">
          <Image
            className="w-[50%_!important] h-full [position:relative_!important] shrink object-cover rounded-[10px]"
            fill
            alt="Thumbnail"
            src={data.image || "/Thumb.png"}
          />
          <div className="w-[50%] overflow-auto h-full flex flex-col gap-[50px]">
            <div className="w-full flex flex-col gap-[10px]">
              <div className="w-full flex gap-[20px]">
                <span
                  style={{ borderColor: colors[data.category], color: colors[data.category] }}
                  className="border-[1px] h-fit top-5 right-5 z-30 p-[8px_30px] rounded-xl bg-lightGray font-semibold text-[14px]"
                >
                  {filters[data.category]}
                </span>
                {data.user_name === profile?.name ? (
                  <div className="relative flex flex-col h-fit self-center">
                    <Image
                      width={16}
                      height={10}
                      alt="menu"
                      src="/Menu.svg"
                      className="cursor-pointer"
                      onClick={() => setMenuOpened((prev) => !prev)}
                    />
                    {menuOpened && (
                      <div className="absolute top-9 flex flex-col p-3 gap-3 shadow-xl w-[100px] self-center h-fit-content z-20 bg-white border-lightGray border-[2px] rounded-lg">
                        <span
                          className="text-[14px] font-bold cursor-pointer"
                          onClick={() => router.push(`/edit/${id}`)}
                        >
                          수정
                        </span>
                        <span
                          className="text-[14px] font-bold text-red-400 cursor-pointer"
                          onClick={() => {
                            const check = confirm("정말 삭제하시겠습니까?");
                            if (check) {
                              feed.delete(id, router);
                            }
                          }}
                        >
                          삭제
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <Button
                    size="small"
                    onClick={() => {
                      setTimeout(() => {
                        setSelected((prev) => !prev);
                        toast.success(
                          `성공적으로 ${selected ? "참여 취소" : "참여 신청"}되었습니다`
                        );
                      }, 1000);
                    }}
                  >
                    {selected ? "참여 취소하기" : "참여하기"}
                  </Button>
                )}
              </div>

              <div className="flex gap-[15px] items-center h-fit">
                <span className="font-bold text-[30px]">{data.title}</span>
                <span className="font-normal text-[18px] text-gray">
                  ~ {data.date} | {data.user_name}
                </span>
              </div>
              <span>{data.content}</span>
            </div>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-4">
                {data.user_name === profile?.name &&
                  applied.map((i) => (
                    <div className="w-full flex justify-between items-center" key={i}>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/Profile.png"
                          alt=""
                          width={35}
                          height={35}
                          className="w-[35px] h-[35px]"
                        />
                        <span>{i}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => {
                            setTimeout(() => {
                              setApplied((prev) => prev.filter((j) => i !== j));
                              toast.success("성공적으로 수락되었습니다!");
                            }, 500);
                          }}
                          size="small"
                        >
                          수락
                        </Button>
                        <Button
                          onClick={() => {
                            setTimeout(() => {
                              setApplied((prev) => prev.filter((j) => i !== j));
                              toast.success("성공적으로 거부되었습니다!");
                            }, 500);
                          }}
                          size="small"
                        >
                          거부
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex flex-col gap-4">
                <div className="w-full flex flex-col gap-[10px]">
                  <TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value.replaceAll('"', ""))}
                    placeholder="댓글을 입력하세요.."
                  />
                  <Button
                    onClick={() => {
                      if (!!comment) {
                        commentCreated.upload(comment, id).then(() => {
                          router.refresh();
                          setComment("");
                        });
                      }
                    }}
                    size="small"
                    className="w-fit self-end"
                  >
                    등록하기
                  </Button>
                </div>
                {data.comment_list.map((i) => (
                  <Comment data={i} key={i.comment_id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
