import UnstyledButton from "@/components/Button/UnstyledButton";
import { useLazyExportChatQuery } from "@/lib/features/export";
import { notify } from "@/utils/notification";
import { nprogress } from "@mantine/nprogress";
import moment from "moment";
import React from "react";

type Props = {
  orderId?: string;
  chat_name?: string;
};

const AdminChatMenu = (props: Props) => {
  const [exportChat, result] = useLazyExportChatQuery();
  const exportChatHandler = async () => {
    const now = new Date();
    if (props.orderId && props.chat_name) {
      nprogress.start();
      try {
        const blob = await exportChat(props.orderId).unwrap();

        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${props.chat_name}-${moment(now).format(
          "YYYY-MM-DD"
        )}.pdf`; // Default filename
        document.body.appendChild(a);
        a.click();
        nprogress.complete();
        document.body.removeChild(a);

        // Clean up
        window.URL.revokeObjectURL(url);
      } catch (error) {
        nprogress.complete();
        notify("error", "", "Error exporting chat");
      }
    }
  };
  return (
    <div className="">
      <ul className="px-1 text-gray-6 text-[0.88rem]">
        <li className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
          Re-open chat
        </li>
        <UnstyledButton
          disabled={result.isFetching}
          clicked={exportChatHandler}
        >
          <li className="py-2 px-4 hover:bg-gray-bg-1 transition-all rounded-md">
            Export conversation
          </li>
        </UnstyledButton>
      </ul>
    </div>
  );
};

export default AdminChatMenu;
