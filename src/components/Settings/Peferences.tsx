import React, { useEffect, useState } from "react";
import SelectComponent from "../Select/SelectComponent";
import SwitchComponent from "../Switch/SwitchComponent";
import UnstyledButton from "../Button/UnstyledButton";
import {
  useUpdateUserPreferencesMutation,
} from "@/lib/features/users/profile/profile";
import { IUpdateUserPreference, IUserPreferencesDataResponse } from "@/interfaces/profile/profile";
import Spinner from "@/app/Spinner/Spinner";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { notify } from "@/utils/notification";

type Props = {
  consultant?: boolean;
  data?: IUserPreferencesDataResponse
};

const PeferencesSettings = (props: Props) => {
  const userId = useSelector(
    (state: RootState) => state.persistedState.user.user?.id
  );
  const [updatePreferences, { data, isLoading, isSuccess, isError, error }] =
    useUpdateUserPreferencesMutation();
  

  const [preferences, setPreferences] = useState<IUpdateUserPreference>({
    currency: props.data?.preferences.currency,
    timezone: props.data?.preferences.timezone,
    newRequestOrder: props.data?.preferences.newRequestOrder,
    recommendation: props.data?.preferences.recommendation,
    updateOnMyOrders: props.data?.preferences.updateOnMyOrders,
  });

  const updatePreferencesHandler = (key: string, value: string) => {
    setPreferences({
      ...preferences,
      [key]: value,
    });
  };

  useEffect(() => {
    if (isError) {
      notify("error", (error as any).data?.message || "An Error Occured");
    }
    if (isSuccess) {
      notify("success", "Successful", "Preferences Updated Successfully!");
    }
  }, [isSuccess, isError]);

  return (
    <div className="bg-white border border-border-gray mt-10 py-10 px-3 sm:px-10">
      <div className="w-full lg:w-[85%]">
        <div className="grid gap-10 md:grid-cols-2">
          {props.consultant ? null : (
            <SelectComponent
              largeLabel
              size="lg"
              data={[
                {
                  label: "USD",
                  value: "USD",
                },
              ]}
              label="Currency"
              placeholder=""
              value={preferences.currency}
              defaultValue={preferences.currency}
              setValueProps={(val) =>
                updatePreferencesHandler("currency", val!)
              }
            />
          )}
          <SelectComponent
            largeLabel
            size="lg"
            data={[
              {
                label: "West Africa Standard Time (GMT+1)",
                value: "(GMT+1)",
              },
            ]}
            value={preferences.timezone}
            defaultValue={preferences.timezone}
            label="Time Zone"
            placeholder=""
            setValueProps={(val) => updatePreferencesHandler("timezone", val!)}
          />
        </div>

        <h1 className="text-[17px] font-medium mt-10">Notification</h1>
        <div className="my-4">
          <SwitchComponent
            setChecked={(val) =>
              updatePreferencesHandler("newRequestOrder", val ? "on" : "off")
            }
            defaultChecked={preferences.newRequestOrder === "on" ? true : false}
            size="lg"
            color="#181818"
            label={
              <p className="text-black-2 ml-4">I create a new request order</p>
            }
          />
        </div>
        <div className="my-4">
          <SwitchComponent
            defaultChecked={
              preferences.updateOnMyOrders === "on" ? true : false
            }
            setChecked={(val) =>
              updatePreferencesHandler("updateOnMyOrders", val ? "on" : "off")
            }
            color="#181818"
            size="lg"
            label={
              <p className="text-black-2 ml-4">
                I receive an update on my request order
              </p>
            }
          />
        </div>
        <SwitchComponent
          size="lg"
          color="#181818"
          defaultChecked={preferences.recommendation === "on" ? true : false}
          setChecked={(val) =>
            updatePreferencesHandler("recommendation", val ? "on" : "off")
          }
          label={
            <p className="text-black-2 ml-4">
              There are recommendation for my account
            </p>
          }
        />
        <UnstyledButton
          clicked={() =>
            updatePreferences({
              body: preferences,
              id: userId!,
            })
          }
          disabled={isLoading}
          class="text-[0.88rem] w-[9rem] flex justify-center disabled:opacity-50 font-medium mt-10 bg-black-2 text-white px-4 py-2 rounded-md "
        >
          {isLoading ? (
            <div className="w-[1rem] py-1">
              <Spinner />
            </div>
          ) : (
            <p>Update</p>
          )}
        </UnstyledButton>
      </div>
    </div>
  );
};

export default PeferencesSettings;
