import UnstyledButton from '@/components/Button/UnstyledButton';
import Field from '@/components/Field/Field';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';

type Props = {}

const ForgotPasswordForm = (props: Props) => {
    const router = useRouter();
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={() => {}}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div className="mt-10">
              <Field
                name="email"
                classname="w-full"
                label="Email"
                placeholder="niyi@gmail.com"
              />
            </div>
       
            <UnstyledButton
              clicked={() => router.push("/auth/reset-password")}
              disabled={!(dirty && isValid)}
              class="flex mt-[13rem] hover:bg-blue-1 py-2 px-4 transition-all rounded-md items-center text-white ml-auto bg-black-2 disabled:opacity-50 text-[0.88rem] disabled:bg-black-2"
            >
              <p className="mr-2">Send reset link</p>
              <FaArrowRight className="text-[0.7rem]" />
            </UnstyledButton>
          </Form>
        )}
      </Formik>
    );
}

export default ForgotPasswordForm