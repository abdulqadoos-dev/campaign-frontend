'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";

import { save } from "./actions";

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



const Form: React.FC<Props> = ({ heading, lead, closeModal }) => {

  return (
    <Modal heading={heading} closeModal={closeModal} >
      <form action={save}>

        <Input type="text" label="first Name" name="lastName" value={lead?.firstName} />
        <Input type="text" label="last Name" name="firstName" value={lead?.lastName} />
        <Input type="text" label="designation" name="designation" value={lead?.designation} />
        <Input type="text" label="email" name="email" value={lead?.email} />
        <Input type="text" label="url" name="url" value={lead?.url} />
        <Input type="text" label="status" name="status" value={lead?.status} />
        <Input type="text" label="notes" name="notes" value={lead?.notes} />

        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" onClick={() => console.log('save')} />
        </div>
      </form>
    </Modal>
  )
}

export default Form;