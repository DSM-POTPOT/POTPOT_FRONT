import commentCreated from "@/repositories/comment";
import { commentVO } from "@/repositories/comment/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextArea } from "./TextArea";
import { Button } from "./Button";

export const Comment = ({ data }: { data: commentVO }) => {
  const router = useRouter();
  const [menuOpened, setMenuOpened] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState("");

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-[10px] items-center">
          <Image src="/Profile.png" alt="" width={35} height={35} className="w-[35px] h-[35px]" />
          <span>{data.name}</span>
        </div>
        <div className="relative flex flex-col h-fit self-center">
          <Image
            width={16}
            height={10}
            alt="menu"
            src="/Menu.svg"
            className="cursor-pointer"
            onClick={() => !isEdit && setMenuOpened((prev) => !prev)}
          />
          {menuOpened && (
            <div className="absolute top-4 flex flex-col p-3 gap-3 shadow-xl w-[100px] self-end h-fit-content z-20 bg-white border-lightGray border-[2px] rounded-lg">
              <span
                className="text-[14px] font-bold cursor-pointer"
                onClick={() => {
                  setMenuOpened(false);
                  setIsEdit(true);
                  setEdit(data.comment.replaceAll('"', ""));
                }}
              >
                수정
              </span>
              <span
                className="text-[14px] font-bold text-red-400 cursor-pointer"
                onClick={() => {
                  const check = confirm("정말 삭제하시겠습니까?");
                  if (check) {
                    commentCreated.delete(data.comment_id).then(() => router.refresh());
                  }
                }}
              >
                삭제
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-[20px] w-full pl-[45px]">
        {isEdit ? (
          <div className="w-full flex flex-col gap-2 justify-end">
            <TextArea value={edit} onChange={(e) => setEdit(e.target.value)} />
            <Button
              size="small"
              onClick={() => {
                commentCreated.edit(edit, data.comment_id).then(() => {
                  setIsEdit(false);
                  router.refresh();
                });
              }}
            >
              수정 완료
            </Button>
          </div>
        ) : (
          <span className="font-medium text-[14px]">{data.comment.replaceAll('"', "")}</span>
        )}
      </div>
    </div>
  );
};
