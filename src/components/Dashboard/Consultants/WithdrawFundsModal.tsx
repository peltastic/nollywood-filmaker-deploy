import Image from "next/image";
import React, { useEffect } from "react";
import CancelImg from "/public/assets/cancel.svg";
import { Form, Formik } from "formik";
import Spinner from "@/app/Spinner/Spinner";
import Field from "@/components/Field/Field";
import UnstyledButton from "@/components/Button/UnstyledButton";
import { useCreateWithdrawalRequestMutation } from "@/lib/features/consultants/dashboard/withdrawals/withdrawals";
import { withdrawalRequestSchema } from "@/utils/validation/withdrawals";
import { nprogress } from "@mantine/nprogress";
import { notify } from "@/utils/notification";

type Props = {
  close: () => void;
  isFetching?: boolean;
  data?: {
    bankname: string;
    accountnumber: string;
  };
};

const WithdrawFundsModal = (props: Props) => {
  const [
    createWithdrawalRequest,
    { isLoading, data, isError, isSuccess, error },
  ] = useCreateWithdrawalRequestMutation();

  useEffect(() => {
    if (isError) {
      nprogress.complete();
      notify("error", "", (error as any).data?.message || "An Error Occcured");
    }
    if (isSuccess) {
      notify("success", "Withdrawal request created successfully");
      nprogress.complete();
      props.close();
    }
  }, [isError, isSuccess]);
  return (
    <section className="px-4 py-4">
      <div className="flex items-center">
        <h1 className="font-semibold text-[1.6rem] sm:text-[2rem]">
          Withdraw funds
        </h1>
        <div
          onClick={props.close}
          className="cursor-pointer hover:bg-gray-bg-2 py-2 px-2 placeholder:rounded-md transition-all ml-auto"
        >
          <Image src={CancelImg} alt="cancel-img" />
        </div>
      </div>
      {props.isFetching ? (
        <div className="w-[2rem] mx-auto py-20">
          <Spinner dark />
        </div>
      ) : (
        <>
          {props.data && (
            <Formik
              initialValues={{
                amount: "",
                bankName: (props.data && props.data.bankname) || "",
                accountNumber: (props.data && props.data.accountnumber) || "",
              }}
              onSubmit={(values) => {
                nprogress.start();
                createWithdrawalRequest({
                  accountnumber: values.accountNumber,
                  amount: values.amount,
                  bankname: values.bankName
                });
              }}
              validationSchema={withdrawalRequestSchema}
            >
              {({ isValid }) => (
                <Form>
                  <div className="mt-10">
                    <Field
                      classname="w-full"
                      label="Withdrawal amount"
                      name="amount"
                      placeholder=""
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 mt-6">
                    <Field
                      classname="w-full"
                      label="Bank name"
                      name="bankName"
                      placeholder=""
                    />
                    <Field
                      classname="w-full"
                      label="Account number"
                      name="accountNumber"
                      placeholder=""
                    />
                  </div>
                  <div className="flex items-center mt-10">
                    <UnstyledButton
                      clicked={props.close}
                      class="mb-4 xs:mb-0 py-2 rounded-md px-4 border-stroke-2 w-full xs:w-auto border ml-auto xs:mr-4"
                    >
                      Cancel
                    </UnstyledButton>
                    <UnstyledButton
                      disabled={isLoading || !isValid}
                      class="flex w-[10rem] py-2 px-4 transition-all rounded-md  justify-center items-center text-white border border-black-3 disabled:border-black-2  bg-black-3 disabled:opacity-50 text-[0.88rem]"
                    >
                      {isLoading ? (
                        <div className="w-[1rem] py-1">
                          <Spinner />
                        </div>
                      ) : (
                        <p>Create request</p>
                      )}
                    </UnstyledButton>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </>
      )}
    </section>
  );
};

export default WithdrawFundsModal;
