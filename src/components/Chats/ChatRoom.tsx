import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import AttachIcon from "/public/assets/chats/attach-icon.svg";
import Image from "next/image";
import SendImg from "/public/assets/chats/send-icon.svg";
import { Textarea } from "@mantine/core";
import {
  emitTypingEvent,
  IChatMessagePayload,
  IContactMessagePayload,
  joinChatRoom,
  sendChatMessageEvent,
  sendContactData,
  sendFileAsChunk,
  sendFileMessage,
  stopTypingEmit,
} from "@/lib/socket";
import { ChatPayload } from "./CustomerChat/CutomerChatMiddle";
import ConsultantChatMessage from "./ConsultantChatMessage";
import { IUserInfoData } from "@/interfaces/auth/auth";
import { useSearchParams } from "next/navigation";
import { MdInfoOutline, MdPendingActions } from "react-icons/md";
import FileButtonComponent from "../FileButton/FileButtonComponent";
import UnstyledButton from "../Button/UnstyledButton";
import { FaFile } from "react-icons/fa";
import { useDisclosure } from "@mantine/hooks";
import RateYourExperience from "./ModalComponents/RateYourExperience";
import ModalComponent from "../Modal/Modal";
import { differenceInMilliseconds, isAfter } from "date-fns";
import classes from "@/app/styles/Input.module.css";
import ReplyBox from "./ReplyBox";
import { v4 as uuidv4 } from "uuid";
import MenuComponent from "../Menu/MenuComponent";
import { IoMdContact } from "react-icons/io";
import FilmmakerDatabaseModal from "./ModalComponents/FilmmakerDatabaseModal";
import { ICrewFilmmakerDatabaseColumnData } from "../Columns/admin/CrewFilmmakerDatabaseColumn";
import { ICompanyFilmmakerDatabaseColumnData } from "../Columns/admin/CompanyFilmmakerDatabaseColumn";
import { notify } from "@/utils/notification";
import { useSocket } from "../Providers/SocketProviders";
import { FaImage } from "react-icons/fa6";
import {
  socketApi,
  useLazyGetChatFileSocketQuery,
} from "@/lib/features/socketInstance";
import Spinner from "@/app/Spinner/Spinner";

export interface IReplyDataInfo {
  user: "admin" | "user" | "consultant" | null;
  reply: string;
  id: string;
  type: "text" | "file" | "img" | "typing" | "contacts";
  contacts?: {
    photourl?: string;
    name?: string;
    type?: string;
  };
}

type Props = {
  type: "user" | "consultant" | "admin";
  orderId: string;
  data: ChatPayload[];
  updateChatHandlerProps: (newEntry: ChatPayload) => void;
  userData: IUserInfoData | null;
  isTime?: boolean;
  sessionOver?: boolean;
  endTime: string;
  refetch: () => void;
  refreshChat: () => void;
  status: "ongoing" | "completed" | "pending" | "ready";
  profilepics?: string;
  isContinuedChat?: number;
};

export interface IChatMessagesData {
  text: string;
  user: "admin" | "user" | "consultant";
}

const ChatRoom = (props: Props) => {
  const [getFileChatSocket, fileSocket] = useLazyGetChatFileSocketQuery();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const { socket } = useSocket();
  const ref = useRef<HTMLTextAreaElement | null>(null);
  const mobileTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [missedPongs, setMissedPongs] = useState(0);
  const [fileType, setFileType] = useState<"file" | "img">("file");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [istyping, setIsTyping] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [replyData, setReplyData] = useState<IReplyDataInfo>({
    user: null,
    reply: "",
    id: "",
    type: "text",
  });

  const [fileInputValue, setFileInputValue] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | ArrayBuffer | null>(
    null
  );
  const [inputValue, setInputValue] = useState<string>("");
  const search = useSearchParams();
  const searchVal = search.get("chat");
  const [selectedRepliedToMessageId, setSelectedRepliedToMessageId] =
    useState<string>("");

  const [opened, { open, close }] = useDisclosure();

  ////////////////CUSTOM CHAT LISTENERS - CLOSE///////////////////////

  //join room

  useEffect(() => {
    if (props.type === "admin") return () => {};
    if (props.sessionOver || !props.isTime) return () => {};
    if (props.userData) {
      if (socket) {
        joinChatRoom(
          {
            room: props.orderId,
            name: `${props.userData.fname} ${props.userData.lname}`,
            role: "user",
            userId: props.userData.id,
          },
          socket
        );
      }
    }
  }, [props.isTime, props.sessionOver, props.orderId]);

  //typing listeners
  useEffect(() => {
    if (!socket) return;
    if (props.isTime) {
      socket.on("stoptyping", (data) => {
        if (data.userId !== props.userData?.id) {
          setIsTyping(false);
        }
      });
      socket.on("istyping", (data) => {
        if (data.userId !== props.userData?.id) {
          setIsTyping(true);
        }
      });

      return;
    }
  }, [props.isTime, socket]);

  useEffect(() => {
    if (socket) {
      socket.on("disconnect", (reason) => {
        console.log("Disconnected:", reason);
      });
    }
  }, []);

  //send message

  const setActiveIdHandler = (id?: string) => {
    setActiveId(id || null);
  };

  const sendCrewContactMessage = (data: ICrewFilmmakerDatabaseColumnData[]) => {
    if (props.userData) {
      const id = uuidv4();

      const payload: IContactMessagePayload = {
        message: "contacts",
        room: props.orderId,
        sender: {
          replyto: replyData.contacts
            ? JSON.stringify(replyData.contacts)
            : replyData.reply,
          replytoId: replyData.id,
          mid: id,
          replytousertype: replyData.user,
          chatRoomId: searchVal as string,
          role: props.type,
          type: "contacts",
          userid: props.userData.id,
          replytochattype: replyData.type,
          name: `${props.userData.fname} ${props.userData.lname}`,
          recommendations: data.map((el) => {
            return {
              name: el.fullname,
              propic: el.fulldata.propic,
              type: "crew",
              userid: el.fulldata.userId,
            };
          }),
        },
      };
      if (socket) {
        sendContactData(payload, socket);
      }
      for (const el of payload.sender.recommendations) {
        props.updateChatHandlerProps({
          text: "",
          user: props.type,
          id: id,
          file: "",
          filename: "",
          type: "contacts",
          replyTo: replyData.contacts
            ? JSON.stringify(replyData.contacts)
            : replyData.reply,
          replyToId: replyData.id,
          replytousertype: replyData.user,
          replytochattype: replyData.type,
          recommendations: {
            name: el.name,
            propic: el.propic,
            type: el.type,
            userid: el.userid,
          },
        });
      }
      setReplyData({
        id: "",
        reply: "",
        user: null,
        type: "text",
      });
    }
  };
  const sendCompanyContactMessage = (
    data: ICompanyFilmmakerDatabaseColumnData[]
  ) => {
    if (props.userData) {
      const id = uuidv4();
      const payload: IContactMessagePayload = {
        message: "contacts",
        room: props.orderId,
        sender: {
          replyto: replyData.contacts
            ? JSON.stringify(replyData.contacts)
            : replyData.reply,
          replytoId: replyData.id,
          mid: id,
          replytousertype: replyData.user,
          chatRoomId: searchVal as string,
          role: props.type,
          type: "contacts",
          userid: props.userData.id,
          replytochattype: replyData.type,
          name: `${props.userData.fname} ${props.userData.lname}`,
          recommendations: data.map((el) => {
            return {
              name: el.name,
              propic: el.fulldata.propic,
              type: "company",
              userid: el.fulldata.userId,
            };
          }),
        },
      };
      if (socket) {
        sendContactData(payload, socket);
      }
      for (const el of payload.sender.recommendations) {
        props.updateChatHandlerProps({
          text: "",
          user: props.type,
          id: id,
          file: "",
          filename: "",
          type: "contacts",
          replyTo: replyData.contacts
            ? JSON.stringify(replyData.contacts)
            : replyData.reply,
          replytochattype: replyData.type,
          replyToId: replyData.id,
          replytousertype: replyData.user,
          recommendations: {
            name: el.name,
            propic: el.propic,
            type: el.type,
            userid: el.userid,
          },
        });
      }
      setReplyData({
        id: "",
        reply: "",
        user: null,
        type: "text",
      });
    }
  };
  const sendMessageHandler = () => {
    if (socket) {
      stopTypingEmit(props.orderId, `${props.userData?.id}`, socket);
    }
    const id = uuidv4();
    if (props.userData) {
      const payload: IChatMessagePayload = {
        room: props.orderId,
        message: inputValue,
        sender: {
          type: "text",
          name: `${props.userData.fname} ${props.userData.lname}`,
          role: props.type,
          userid: props.userData.id,
          chatRoomId: props.orderId,
          replyto: replyData.contacts
            ? JSON.stringify(replyData.contacts)
            : replyData.reply,
          replytoId: replyData.id,
          mid: id,
          replytochattype: replyData.type,
          replytousertype: replyData.user,
        },
      };

      // if (socket.connected) {
      if (socket) {
        sendChatMessageEvent(payload, socket);
      }
      // } else {
      //   messageQueueRef.current.push(payload);
      // }
      props.updateChatHandlerProps({
        text: inputValue,
        user: props.type,
        id: id,
        file: "",
        filename: "",
        type: "text",
        replytochattype: replyData.type,
        replyTo: replyData.contacts
          ? JSON.stringify(replyData.contacts)
          : replyData.reply,
        replyToId: replyData.id,
        replytousertype: replyData.user,
      });
      setInputValue("");
      setReplyData({
        id: "",
        reply: "",
        user: null,
        type: "text",
      });
    }
  };

  //custom ping interval

  useEffect(() => {
    if (props.type === "admin") return;
    let interval: NodeJS.Timeout | undefined;
    if (props.sessionOver) return;
    if (props.isTime) {
      interval = setInterval(() => {
        // console.log("i sent ping", moment(new Date()).format("h:mm a"));
        if (socket) {
          socket.emit("triggerPing", {
            room: props.orderId,
          });
        }
        setMissedPongs((prev) => prev + 1);
      }, 20000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [props.isTime, props.sessionOver]);

  useEffect(() => {
    if (!socket) return;
    if (props.type === "admin") return () => {};
    if (props.sessionOver) return () => {};
    if (props.isTime) {
      socket.on("roomPing", () => {
        setMissedPongs(0);
      });
      return () => {
        socket.off("roomPing");
      };
    }
  }, [props.isTime, props.sessionOver]);

  //socket listener for new messages

  useEffect(() => {
    if (!socket) return;
    if (props.type === "admin") return () => {};
    socket.on(
      "message",
      (data: {
        sender: {
          name: string;
          role: "user" | "consultant" | "admin";
          userid: string;
          uid: string;
          chatRoomId: string;
          replyto: string;
          replytoId: string;
          mid: string;
          type: string;
          replytousertype?: "user" | "consultant" | "admin" | null;
          replytochattype: "text" | "file" | "img" | "typing" | "contacts";
          recommendations: {
            type: "crew" | "company";
            name: string;
            userid: string;
            propic: string;
          }[];
        };
        message: string;
      }) => {
        if (
          props.userData?.id === data.sender.userid ||
          props.userData?.id === data.sender.userid
        ) {
        } else {
          if (props.orderId === data.sender.chatRoomId) {
            if (data.sender.type === "contacts") {
              for (const el of data.sender.recommendations) {
                props.updateChatHandlerProps({
                  text: "",
                  user: data.sender.role,
                  id: data.sender.mid,
                  file: "",
                  filename: "",
                  type: "contacts",
                  replyTo: data.sender.replyto,
                  replyToId: data.sender.replytoId,
                  replytousertype: data.sender.replytousertype,
                  replytochattype: data.sender.replytochattype,
                  recommendations: {
                    name: el.name,
                    propic: el.propic,
                    type: el.type,
                    userid: el.userid,
                  },
                });
              }
            } else {
              props.updateChatHandlerProps({
                text: data.message,
                user: data.sender.role,
                id: data.sender.mid,
                type: "text",
                file: "",
                filename: "",
                replyTo: data.sender.replyto,
                replyToId: data.sender.replytoId,
                replytousertype: data.sender.replytousertype,
                replytochattype: data.sender.replytochattype,
              });
            }
          }
        }
      }
    );

    return () => {
      socket.off("message");
    };
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    if (missedPongs > 3) {
      socket.connect();
      setMissedPongs(0);
      console.log("missed my pong, i am reconnecting..");
    }
  }, [missedPongs]);

  //socket listener for new files

  useEffect(() => {
    if (!socket) return;
    if (props.type === "admin") return () => {};
    socket.on(
      "fileMessage",
      (data: {
        fileUrl: string;
        fileName: string;
        sender: {
          chatRoomId: string;
          name: string;
          role: "user" | "consultant" | "admin";
          userid: string;
          mid: string;
          replyto: string;
          replytoId: string;
          replytousertype?: "user" | "consultant" | "admin" | null;
          type: "text" | "file" | "img" | "typing" | "contacts";
          replytochattype: "text" | "file" | "img" | "typing" | "contacts";
        };
      }) => {
        setIsUploading(false);
        if (props.userData?.id === data.sender.userid) {
        } else {
          if (props.orderId === data.sender.chatRoomId) {
            props.updateChatHandlerProps({
              text: data.fileName,
              user: data.sender.role,
              id: data.sender.mid,
              type: data.sender.type,
              file: data.fileUrl,
              filename: data.fileName,
              replyTo: data.sender.replyto,
              replyToId: data.sender.replytoId,
              replytousertype: data.sender.replytousertype,
              replytochattype: data.sender.replytochattype,
            });
          }
        }
      }
    );
    return () => {
      socket.off("fileMessage");
    };
  }, [socket]);

  useEffect(() => {
    if (typeof document === "undefined" || props.type === "admin") return;
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !socket?.connected) {
        if (socket) {
          socket.connect();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [socket, props.type]);

  useEffect(() => {
    if (props.type === "admin") return;
    if (!socket) return;

    socket.on("connect", () => {
      if (props.userData) {
        joinChatRoom(
          {
            room: props.orderId,
            name: `${props.userData.fname} ${props.userData.lname}`,
            role: "user",
            userId: props.userData.id,
          },
          socket
        );
        props.refreshChat();
      }
    });
    return () => {
      socket.off("connect");
    };
  }, [socket]);

  //get base64 for chat files to be uploaded

  const getBase64 = (file: File) => {
    return new Promise((resolve) => {
      let baseUrl: string | ArrayBuffer | null = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Make a fileInfo Object
        baseUrl = reader.result;
        resolve(baseUrl);
      };
    });
  };

  //open feedback after chat session is over

  useEffect(() => {
    if (props.type === "admin") return () => {};
    let timer: NodeJS.Timeout | undefined;
    if (props.endTime && props.type === "user") {
      const now = new Date();
      const isAfterEndTime = isAfter(now, props.endTime);
      if (isAfterEndTime) return () => {};
      const delay = differenceInMilliseconds(props.endTime, now);
      timer = setTimeout(() => {
        open();
      }, delay);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [props.endTime]);

  useEffect(() => {
    if (!ref.current) return () => {};
    if (replyData.reply) {
      ref.current?.focus();
    }
  }, [replyData.reply]);

  useEffect(() => {
    if (!mobileTextAreaRef.current) return () => {};
    if (replyData.reply) {
      mobileTextAreaRef.current.focus();
    }
  }, [replyData.reply]);
  useEffect(() => {
    getFileChatSocket();
  }, []);

  const handleTextAreaInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.currentTarget.value);

      if (socket) {
        emitTypingEvent(props.orderId, `${props.userData?.id}`, socket);

        // Clear previous timeout if user is still typing
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        // Set a timeout to stop typing event
        typingTimeoutRef.current = setTimeout(() => {
          stopTypingEmit(props.orderId, `${props.userData?.id}`, socket);
        }, 7000);
      }
    },
    [props.orderId, props.userData, socket]
  );

  const [databaseOpened, database] = useDisclosure();
  const sendFileMessageHandler = (file: File, type: "img" | "file") => {
    setFileType("file");
    setFileInputValue(file);
    getBase64(file).then((res) => {
      const id = uuidv4();
      if (res) {
        if (res && props.userData) {
          const payload = {
            fileData: res as string,
            fileName: file.name,
            room: props.orderId,
            sender: {
              type: type,
              name: `${props.userData.fname} ${props.userData.lname}`,
              role: props.type,
              userid: props.userData.id,
              chatRoomId: searchVal as string,
              mid: id,
              replyto: replyData.contacts
                ? JSON.stringify(replyData.contacts)
                : replyData.reply,
              replytoId: replyData.id,
              replytousertype: replyData.user,
              replytochattype: replyData.type,
            },
          };
          if (socket) {
            sendFileMessage(payload, socket);
          }

          props.updateChatHandlerProps({
            text: file.name,
            user: props.type,
            id,
            file: res as string,
            filename: file.name,
            type: type,
            replyTo: replyData.contacts
              ? JSON.stringify(replyData.contacts)
              : replyData.reply,
            replyToId: replyData.id,
            replytousertype: replyData.user,
            replytochattype: replyData.type,
          });
          setFileInputValue(null);
          setReplyData({
            id: "",
            reply: "",
            user: null,
            type: "text",
          });
        }
        // setBase64File(res as any);
      }
    });
  };

  const sendFileAsChunkMessage = async (file: File, type: "img" | "file") => {
    setUploadProgress(0);
    const id = uuidv4();
    const socketInstance = fileSocket.data;
    getBase64(file).then((res) => {
      props.updateChatHandlerProps({
        text: file.name,
        user: props.type,
        id,
        file: res as string,
        filename: file.name,
        type: type,
        replyTo: replyData.contacts
          ? JSON.stringify(replyData.contacts)
          : replyData.reply,
        replyToId: replyData.id,
        replytousertype: replyData.user,
        replytochattype: replyData.type,
      });
    });
    const CHUNK_SIZE = 300 * 1024; // 300KB chunks
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    // const uploadId = uuidv4();

    const sendChunk = async (chunkIndex: number): Promise<void> => {
      if (chunkIndex >= totalChunks) {
        return; // All chunks sent
      }

      const offset = chunkIndex * CHUNK_SIZE;
      const chunk = file.slice(offset, offset + CHUNK_SIZE);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          if (!e.target?.result) {
            reject(new Error("Failed to read chunk"));
            return;
          }

          const fileData = (e.target.result as string).split(",")[1];

          if (props.userData && socketInstance) {
            const chunkData = {
              uploadId: id,
              fileName: file.name,
              totalChunks,
              chunkIndex,
              fileData,
              sender: {
                type,
                name: `${props.userData.fname} ${props.userData.lname}`,
                role: props.type,
                userid: props.userData.id,
                chatRoomId: props.orderId,
                mid: id,
                replyto: replyData.contacts
                  ? JSON.stringify(replyData.contacts)
                  : replyData.reply,
                replytoId: replyData.id,
                replytousertype: replyData.user,
                replytochattype: replyData.type,
              },
              room: props.orderId,
            };
            socketInstance.emit("sendFileChunk", chunkData);
            // console.log(chunkData);
            // sendFileAsChunk(chunkData, socket);
            setUploadProgress(
              Math.ceil(((chunkIndex + 1) / totalChunks) * 100)
            );
          }
          resolve();
        };

        reader.onerror = () => reject(new Error("Error reading file chunk"));
        reader.readAsDataURL(chunk);
        // socketInstance.on("uploadComplete", (data) => {
        //   console.log("transfer-complete", data, id);
        //   socketApi.endpoints.closeChatSocket.initiate(id);
        //   resolve();
        // });
      });
    };

    try {
      // Sequentially send each chunk
      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        await sendChunk(chunkIndex);
        // Optional: Add small delay between chunks to prevent overwhelming the socket
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    } catch (error) {
      console.error("Upload error:", error);
      throw error; // Handle this in your component
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on("disconnect", (reason) => {
        console.log("Disconnected:", reason);
      });
    }
  }, [socket]);
  const [imagesLoaded, setImagesLoaded] = useState(0); // Track loaded images
  const totalImages = props.data.filter((msg) => msg.type === "img").length;
  const scrollToBottom = () => {
    if (spanRef.current) {
      spanRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start", // Scrolls so the top of the element is at the top of the viewport
        inline: "nearest", // Adjusts horizontally to the nearest edge
      });
    }
  };
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1); // Increment when an image loads
  };
  useEffect(() => {
    // Scroll when messages change and all images are loaded
    if (imagesLoaded === totalImages) {
      scrollToBottom();
    }
  }, [props.data, imagesLoaded, totalImages]);
  const isLastConsultantFileOrImage = (message: ChatPayload): boolean => {
    const messages: ChatPayload[] = props.data;
    if (messages.length === 0) return false;

    let lastConsultantFileOrImage: ChatPayload | null = null;

    for (let i = messages.length - 1; i >= 0; i--) {
      if (
        (messages[i].type === "file" || messages[i].type === "img") &&
        messages[i].user === "consultant"
      ) {
        lastConsultantFileOrImage = messages[i];
        break;
      }
    }

    return (
      lastConsultantFileOrImage !== null &&
      lastConsultantFileOrImage.id === message.id
    );
  };
  const isLastUserFileOrImage = (message: ChatPayload): boolean => {
    const messages: ChatPayload[] = props.data;
    if (messages.length === 0) return false;

    let lastUserFileOrImage: ChatPayload | null = null;

    for (let i = messages.length - 1; i >= 0; i--) {
      if (
        (messages[i].type === "file" || messages[i].type === "img") &&
        messages[i].user === "user"
      ) {
        lastUserFileOrImage = messages[i];
        break;
      }
    }

    return (
      lastUserFileOrImage !== null && lastUserFileOrImage.id === message.id
    );
  };
  return (
    <>
      <ModalComponent
        onClose={close}
        opened={opened}
        centered
        size="xl"
        withCloseButton={false}
      >
        <RateYourExperience orderId={props.orderId} close={close} />
      </ModalComponent>
      <ModalComponent
        onClose={database.close}
        fullscreen
        withCloseButton={false}
        size="xl"
        opened={databaseOpened}
      >
        <FilmmakerDatabaseModal
          sendCrewContact={sendCrewContactMessage}
          close={database.close}
          sendCompanyContact={sendCompanyContactMessage}
        />
      </ModalComponent>
      <div className=" py-6  h-full  relative bg-white">
        <div
          ref={chatRef}
          className=" overflow-y-scroll nolly-film-hide-scrollbar w-full h-[90%] pb-8"
        >
          {props.data && (
            <>
              {props.data.map((el, index) => (
                <div key={el.id + index.toString()}>
                  {props.type === "user" ? (
                    <ChatMessage
                      setProgressIsComplete={() => setIsUploading(false)}
                      uploadProgress={uploadProgress}
                      file={el.file}
                      filename={el.filename}
                      type={el.type}
                      key={el.text + index.toString()}
                      text={el.text}
                      user={el.user}
                      prevUser={index ? props.data[index - 1].user : null}
                      index={index}
                      lastmessage={index === props.data.length - 1}
                      setActiveId={
                        props.isTime ? setActiveIdHandler : undefined
                      }
                      id={el.id}
                      activeId={activeId}
                      setReplyDataProps={(val) => setReplyData(val)}
                      repliedText={el.replyTo}
                      repliedTextId={el.replyToId}
                      replytochattype={el.replytochattype}
                      handleImgUpload={handleImageLoad}
                      selectedRepliedToMessageId={selectedRepliedToMessageId}
                      setSelectedRepliedToMessageId={(val) =>
                        setSelectedRepliedToMessageId(val)
                      }
                      repliedToUser={el.replytousertype}
                      userId={props.userData?.id}
                      recommendations={el.recommendations}
                      socket={socket}
                      isLastUserFileOrImage={isLastUserFileOrImage(el)}
                    />
                  ) : (
                    <ConsultantChatMessage
                      setProgressIsComplete={() => setIsUploading(false)}
                      uploadProgress={uploadProgress}
                      recommendations={el.recommendations}
                      file={el.file}
                      filename={el.filename}
                      type={el.type}
                      socket={socket}
                      key={el.text + index.toString()}
                      isLastMessageAConsultantFileOrImage={isLastConsultantFileOrImage(
                        el
                      )}
                      text={el.text}
                      user={el.user}
                      prevUser={index ? props.data[index - 1].user : null}
                      lastmessage={
                        props.data[props.data.length - 1].id === el.id
                      }
                      index={index}
                      userprofilepic={props.profilepics}
                      setActiveId={
                        props.isTime ? setActiveIdHandler : undefined
                      }
                      id={el.id}
                      activeId={activeId}
                      setReplyDataProps={(val) => setReplyData(val)}
                      repliedText={el.replyTo}
                      repliedTextId={el.replyToId}
                      repliedToUser={el.replytousertype}
                      replytochattype={el.replytochattype}
                      userId={props.userData?.id}
                      handleImgLoad={handleImageLoad}
                      selectedRepliedToMessageId={selectedRepliedToMessageId}
                      setSelectedRepliedToMessageId={(val) =>
                        setSelectedRepliedToMessageId(val)
                      }
                    />
                  )}
                </div>
              ))}
              <span className="border" ref={spanRef}></span>
            </>
          )}
          {istyping && (
            <>
              {props.type === "user" ? (
                <ChatMessage
                  setProgressIsComplete={() => {}}
                  uploadProgress={uploadProgress}
                  file=""
                  filename=""
                  index={props.data.length}
                  prevUser={"user"}
                  text=""
                  type="typing"
                  handleImgUpload={handleImageLoad}
                  user={props.type === "user" ? "consultant" : "user"}
                  lastmessage={true}
                />
              ) : (
                <ConsultantChatMessage
                  setProgressIsComplete={() => {}}
                  file=""
                  filename=""
                  index={props.data.length}
                  prevUser={"user"}
                  text=""
                  uploadProgress={uploadProgress}
                  type="typing"
                  user={props.type === "consultant" ? "user" : "consultant"}
                  lastmessage={true}
                  handleImgLoad={handleImageLoad}
                />
              )}
            </>
          )}
        </div>
        {replyData.reply && (
          <ReplyBox
            cancelReplyBox={() =>
              setReplyData({
                reply: "",
                user: null,
                id: "",
                type: "text",
              })
            }
            type={props.type}
            replyData={replyData}
          />
        )}
        {props.type === "admin" ? null : (
          <div className="h-[10%] fixed left-0 bottom-0 bg-white w-full chatbp1:relative ">
            {props.sessionOver ? (
              <div className="absolute bottom-0 w-[90%] xs:w-[93%] sm:w-[95%]   flex items-center text-[0.88rem] bg-gray-bg-7 border mx-4 mt-8 py-2 rounded-md px-4 border-border-gray">
                <MdInfoOutline className="text-gray-4 mr-4 text-xl " />
                <p className="text-gray-4">This conversation has ended</p>
              </div>
            ) : props.isTime ? (
              <div className="h-full ">
                <div className="w-full   px-6  absolute bottom-4 chatbp1:bottom-0 mt-5">
                  <div className="flex items-center">
                    <MenuComponent
                      position="top-start"
                      target={
                        <div className="cursor-pointer">
                          <div className="mr-3 md:mr-10">
                            <Image src={AttachIcon} alt="attach-icon" />
                          </div>
                        </div>
                      }
                    >
                      <div className="">
                        <ul className=" text-black-2 py-2 px-2">
                          <li className="">
                            <UnstyledButton
                              disabled={isUploading}
                              class="hover:bg-gray-bg-9 transition-all py-1 rounded-md px-3 w-full disabled:cursor-not-allowed"
                            >
                              <FileButtonComponent
                                accept=""
                                setFile={(file) => {
                                  if (file) {
                                    if (file?.size > 20 * 1024 * 1024) {
                                      notify(
                                        "message",
                                        "Cannot send files more than 20mb"
                                      );
                                    } else {
                                      if (file.size > 1 * 1024 * 1024) {
                                        setIsUploading(true);
                                        sendFileAsChunkMessage(file, "file");
                                      } else {
                                        setIsUploading(true);
                                        sendFileMessageHandler(file, "file");
                                      }
                                    }
                                  }
                                }}
                              >
                                {isUploading ? (
                                  <p className="italics">Uploading...</p>
                                ) : (
                                  <div className="flex items-center">
                                    <div className="h-[2rem] mr-2 flex items-center justify-center w-[2rem] rounded-full bg-gray-300">
                                      <FaFile className="text-md" />
                                    </div>
                                    <p>File</p>
                                  </div>
                                )}
                              </FileButtonComponent>
                            </UnstyledButton>
                          </li>
                          {props.type === "consultant" && (
                            <li
                              onClick={database.open}
                              className="flex items-center px-3 mt-4 hover:bg-gray-bg-9 cursor-pointer transition-all py-1 rounded-md"
                            >
                              <div className="h-[2rem] mr-2 flex items-center justify-center w-[2rem] rounded-full bg-gray-300">
                                <IoMdContact className="text-md" />
                              </div>
                              <p>Contact</p>
                            </li>
                          )}
                        </ul>
                      </div>
                    </MenuComponent>
                    <form
                      className="w-full"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <div className="w-full relative hidden lg:block">
                        <Textarea
                          ref={ref}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              sendMessageHandler();
                            }
                          }}
                          minRows={0}
                          autosize
                          size="md"
                          radius={"md"}
                          value={inputValue}
                          onChange={(e) => handleTextAreaInputChange(e)}
                          classNames={{
                            input: classes.input,
                          }}
                        />
                        <button
                          disabled={isUploading}
                          className=" flex items-center absolute right-6 -translate-y-1/2 top-1/2"
                        >
                          <FileButtonComponent
                            accept="image/*"
                            setFile={(file) => {
                              if (file) {
                                if (file?.size > 20 * 1024 * 1024) {
                                  notify(
                                    "message",
                                    "Cannot send files more than 20mb"
                                  );
                                } else {
                                  if (file.size > 1 * 1024 * 1024) {
                                    setIsUploading(true);
                                    sendFileAsChunkMessage(file, "img");
                                  } else {
                                    setIsUploading(true);
                                    sendFileMessageHandler(file, "img");
                                  }
                                }
                              }
                            }}
                          >
                            {isUploading ? (
                              <div className="mr-4 w-[1rem]">
                                <Spinner dark />
                              </div>
                            ) : (
                              <button className="mr-4 text-xl">
                                <FaImage />
                              </button>
                            )}
                          </FileButtonComponent>
                          <button
                            onClick={sendMessageHandler}
                            disabled={!inputValue}
                            className="w-fit disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                          >
                            <Image src={SendImg} alt="send-img" />
                          </button>
                        </button>
                      </div>
                      <div className="w-full relative block lg:hidden">
                        <Textarea
                          ref={mobileTextAreaRef}
                          minRows={0}
                          autosize
                          size="md"
                          radius={"md"}
                          value={inputValue}
                          onChange={(e) => handleTextAreaInputChange(e)}
                          classNames={{
                            input: classes.input,
                          }}
                        />
                        <button
                          disabled={isUploading}
                          className=" flex items-center absolute right-6 -translate-y-1/2 top-1/2"
                        >
                          <FileButtonComponent
                            accept="image/*"
                            setFile={(file) => {
                              if (file) {
                                if (file?.size > 20 * 1024 * 1024) {
                                  notify(
                                    "message",
                                    "Cannot send files more than 20mb"
                                  );
                                } else {
                                  if (file.size > 1 * 1024 * 1024) {
                                    setIsUploading(true);
                                    sendFileAsChunkMessage(file, "img");
                                  } else {
                                    setIsUploading(true);
                                    sendFileMessageHandler(file, "img");
                                  }
                                }
                              }
                            }}
                          >
                            {isUploading ? (
                              <div className="mr-4 w-[1rem]">
                                <Spinner dark />
                              </div>
                            ) : (
                              <button className="mr-4 text-xl mt-1">
                                <FaImage />
                              </button>
                            )}
                          </FileButtonComponent>
                          <button
                            onClick={sendMessageHandler}
                            disabled={!inputValue}
                            className="w-fit disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                          >
                            <Image src={SendImg} alt="send-img" />
                          </button>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                {props.isContinuedChat ? (
                  <div className="absolute bottom-0 w-[90%] xs:w-[93%] sm:w-[95%]   flex items-center text-[0.88rem] bg-gray-bg-7 border mx-4 mt-8 py-2 rounded-md px-4 border-border-gray">
                    <MdPendingActions className="text-gray-4 mr-4 text-xl " />
                    <p className="text-gray-4">Session hasn't started yet</p>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatRoom;

// const messageQueueRef = useRef<
// {
//   room: string;
//   message: string;
//   sender: {
//     type: "text";
//     userid: string;
//     name: string;
//     role: "user" | "consultant" | "admin";
//     chatRoomId: string;
//     replyto: string;
//     replytoId: string;
//     mid: string;
//     replytousertype: "user" | "consultant" | "admin" | null;
//   };
// }[]
// >([]);

// const fileQueueRef = useRef<
// {
//   room: string;
//   fileData: string | ArrayBuffer;
//   fileName: string;
//   sender: {
//     type: "img" | "file";
//     userid: string;
//     name: string;
//     role: "user" | "consultant" | "admin";
//     chatRoomId: string;
//     mid: string;
//   };
// }[]
// >([]);

// {fileInputValue && (
//   <div className=" flex items-center mb-6 bg-white shadow-[rgba(0,0,10,0.1)_2px_2px_2px_4px] ml-10 w-fit py-4 px-6 rounded-md">
//     <div
//       className=""
//       onClick={() => {
//         setFileInputValue(null);
//         setBase64File(null);
//       }}
//     >
//       <MdCancel className="text-2xl text-red-1 mr-2 cursor-pointer" />
//     </div>
//     <div className="max-w-[30rem] flex items-center break-words  border w-fit py-3 px-2 text-white rounded-md bg-black-2 ">
//       <FaFile className="mr-4" />
//       <p>{fileInputValue.name}</p>
//     </div>
//     <div className="ml-2">
//       <UnstyledButton
//         clicked={() => {
//           const id = uuidv4();
//           if (base64File && props.userData) {
//             const payload = {
//               fileData: base64File,
//               fileName: fileInputValue.name,
//               room: props.orderId,
//               sender: {
//                 type: fileType,
//                 name: `${props.userData.fname} ${props.userData.lname}`,
//                 role: props.type,
//                 userid: props.userData.id,
//                 chatRoomId: props.orderId,
//                 mid: id,
//                 replyto: replyData.contacts
//                   ? JSON.stringify(replyData.contacts)
//                   : replyData.reply,
//                 replytoId: replyData.id,
//                 replytousertype: replyData.user,
//                 replytochattype: replyData.type,
//               },
//             };
//             if (socket) {
//               sendFileMessage(payload, socket);
//             }
//             props.updateChatHandlerProps({
//               text: fileInputValue.name,
//               user: props.type,
//               id,
//               file: base64File as string,
//               filename: fileInputValue.name,
//               type: fileType,
//               replyTo: replyData.contacts
//                 ? JSON.stringify(replyData.contacts)
//                 : replyData.reply,
//               replyToId: replyData.id,
//               replytousertype: replyData.user,
//             });
//             setFileInputValue(null);
//             setReplyData({
//               id: "",
//               reply: "",
//               user: null,
//               type: "text",
//             });
//           }
//         }}
//         class="flex hover:bg-blue-1 transition-all items-center bg-black-2 text-white py-2 px-4 rounded-md"
//       >
//         <p className="mr-2">Send</p>
//         <RiSendPlane2Line className=" text-xl" />
//       </UnstyledButton>
//     </div>
//   </div>
// )}
