'use client'

import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";
import { useState } from "react";


interface Props {

  heading: string;
  closeModal: any;
  lead?: { name?: string, title?: string }

}

const heandelSubmit = (event: any) => {
  event.preventDefault();
}

const Form: React.FC<Props> = ({ heading, lead, closeModal }) => {


  const [form, setForm] = useState(lead);

  console.log(form, 'check');

  return (
    <Modal heading={heading} closeModal={closeModal} >
      <form onSubmit={heandelSubmit}>

        <Input type="text" label="name" value={form?.name} onChange={(event: any) => setForm({ ...form, name: event?.target.value })} />
        <Input type="text" label="title" value={form?.title} onChange={(event: any) => setForm({ ...form, title: event?.target.value })} />

        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" onClick={() => console.log('save')} />
        </div>
      </form>
    </Modal>
  )
}

export default Form;