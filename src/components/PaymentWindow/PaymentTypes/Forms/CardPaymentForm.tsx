import UnstyledButton from "@/components/Button/UnstyledButton";
import CheckboxComponent from "@/components/Checkbox/Checkbox";
import Field from "@/components/Field/Field";
import InputComponent from "@/components/Input/Input";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
    showPinForm: () => void
};

const CardPaymentForm = (props: Props) => {
  const router = useRouter();
  const [saveCardChecked, setSaveCardChecked] = useState<boolean>(false);
  return (
    <div className="mt-8">
      <Formik
        initialValues={{
          card: "",
          expiration: "",
          cvv: "",
          //   coupon: "",
        }}
        onSubmit={() => {
            props.showPinForm()
        }}
      >
        {({ isValid, dirty }) => (
          <Form>
            <Field
              classname="w-full"
              label="Card number"
              name="card"
              placeholder="1234  5678  9101  1121"
            />
            <div className="grid grid-cols-2 gap-x-6 mt-6">
              <Field
                classname="w-full"
                label="Expiration Date"
                name="expiration"
                placeholder="MM/YY"
              />
              <Field
                classname="w-full"
                label="CVV"
                name="cvv"
                placeholder="123"
              />
            </div>
            <div className="mt-8">
              <CheckboxComponent
                color="#333333"
                checked={saveCardChecked}
                setCheckedProps={(val) => setSaveCardChecked(val)}
                label={
                  <p
                    className={`${
                      saveCardChecked ? "text-black-2" : "text-unchecked-gray"
                    }`}
                  >
                    Save card details
                  </p>
                }
              />
            </div>
            <div className="mt-12">
              <label className="text-gray-3 text-sm block mb-2">
                Apply coupon code
              </label>
              <div className="flex">
                <InputComponent
                  className="rounded-se-none rounded-ee-none w-full px-4 py-2 text-input-text-color"
                  changed={() => {}}
                  placeholder=""
                  type=""
                />
                <UnstyledButton
                  type="button"
                  class="font-medium border border-l-0 border-gray-2 rounded-se-md rounded-ee-md text-[0.88rem] px-4"
                >
                  Apply
                </UnstyledButton>
              </div>
            </div>
            <UnstyledButton
              disabled={!(isValid && dirty)}
              type="submit"
              class="bg-black-2 disabled:bg-gray-2 bg- w-full py-3 text-[1.13rem] font-bold rounded-sm mt-12 text-white"
            >
              Pay ₦100,000
            </UnstyledButton>
            <p className="text-unchecked-gray text-[0.88rem] w-[80%] mt-8">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
            <UnstyledButton
              type="button"
              clicked={() => router.back()}
              class="rounded-md px-4 transition-all py-2 text-[0.88rem] font-medium mt-8 hover:bg-gray-bg-1 border-stroke-2 border"
            >
              Back
            </UnstyledButton>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CardPaymentForm;
