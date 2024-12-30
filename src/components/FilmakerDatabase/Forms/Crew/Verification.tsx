import Field from "@/components/Field/Field";
import { Form, Formik } from "formik";
import React from "react";

type Props = {};

const Verification = (props: Props) => {
  return (
    <div>
      <Formik
        initialValues={{
          address: "",
          city: "",
          state: "",
          country: "",
        }}
        onSubmit={() => {}}
      >
        {({}) => (
          <Form>
            <div className="grid grid-cols-2 gap-8">
              <Field
                label="Address"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="address"
                placeholder="Enter your first name"
                required
              />
              <Field
                required
                label="City"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="city"
                placeholder="Enter your surname"
              />
              <Field
                required
                label="State"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="state"
                placeholder="Enter your surname"
              />
              <Field
                required
                label="Country"
                labelColor="text-[#A5A5A5]"
                classname="w-full"
                name="country"
                placeholder="Enter your surname"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Verification;
