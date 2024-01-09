'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";

import { save } from "./actions";

import { useFormState } from 'react-dom'
import { useEffect } from "react";


interface Props {

  heading: string;
  closeModal: any;
  lead?: {
    firstName: string,
    lastName: string,
    email: string,
    url: string,
    status: string,
    notes: string,
    designation: string
  }

}

const initialState = {
  message: '',
  status: null
}

const Form: React.FC<Props> = ({ heading, lead, closeModal }) => {

  const [state, formAction] = useFormState(save, initialState);

  useEffect(() => {
    state.status === 201 && closeModal();
  }, [state])

  return (
    <Modal heading={heading} closeModal={closeModal} >


      <p>{state?.message}</p>

      <form action={formAction}>

        <Input type="text" label="first Name" name="lastName" value={lead?.firstName} />
        <Input type="text" label="last Name" name="firstName" value={lead?.lastName} />
        <Input type="text" label="designation" name="designation" value={lead?.designation} />
        <Input type="text" label="email" name="email" value={lead?.email} />
        <Input type="text" label="url" name="url" value={lead?.url} />
        <Input type="text" label="status" name="status" value={lead?.status} />
        <Input type="text" label="notes" name="notes" value={lead?.notes} />

        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>
      </form>
    </Modal>
  )
}

export default Form;