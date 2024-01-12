'use client'
import { useFormState } from 'react-dom'


import Modal from "@ui/modal";
import Input from "@ui/input";
import Button from "@ui/button";
import Select from '@ui/select';

import { saveLead } from "./actions";


import { useEffect, useState } from "react";
import Textarea from '@/app/ui/textarea';



interface Props {

  heading: string;
  closeModal: any;
  refreshLeads: any;
  setLeadForm: any;
  leadForm?: {
    id?: number,
    firstName?: string,
    lastName?: string,
    email?: string,
    url?: string,
    status?: string,
    notes?: string,
    designation?: string
  }
}

const initialState = {
  message: '',
  status: null
}

const Form: React.FC<Props> = ({ heading, leadForm, setLeadForm, closeModal, refreshLeads }) => {

  const [state, formAction] = useFormState(saveLead, initialState);

  useEffect(() => {

    if (state?.status === 201 || state?.status === 200) {
      closeModal();
      refreshLeads();
    };

  }, [state])

  const [statuses, setStatuses] = useState([
    { label: "acitve", value: "active" },
    { label: "requested", value: "requested" }
  ])

  return (
    <Modal heading={heading} closeModal={closeModal} >


      <p>{state?.message}</p>

      <form action={formAction}>

        <input type="hidden" name="id" value={leadForm?.id} />
        <Input type="text" label="first Name" name="firstName" value={leadForm?.firstName}
          onChange={(e: any) => setLeadForm({ ...leadForm, firstName: e.target.value })}
        />
        <Input type="text" label="last Name" name="lastName" value={leadForm?.lastName}
          onChange={(e: any) => setLeadForm({ ...leadForm, lastName: e.target.value })}
        />
        <Input type="text" label="designation" name="designation" value={leadForm?.designation}
          onChange={(e: any) => setLeadForm({ ...leadForm, designation: e.target.value })}
        />
        <Input type="text" label="email" name="email" value={leadForm?.email}
          onChange={(e: any) => setLeadForm({ ...leadForm, email: e.target.value })}
        />
        <Input type="text" label="url" name="url" value={leadForm?.url}
          onChange={(e: any) => setLeadForm({ ...leadForm, url: e.target.value })}
        />
        {/* <Input type="text" label="status" name="status" value={leadForm?.status}
          onChange={(e: any) => setLeadForm({ ...leadForm, status: e.target.value })}
        /> */}


        <Select label='status' name='status' options={statuses} selected={leadForm?.status}
          onChange={(e: any) => setLeadForm({ ...leadForm, status: e.target.value })}
        />
{/* 
        <Input type="text" label="notes" name="notes" value={leadForm?.notes}
          onChange={(e: any) => setLeadForm({ ...leadForm, notes: e.target.value })}
        /> */}

        <Textarea name='notes' label='notes' value={leadForm?.notes}
          onChange={(e: any) => setLeadForm({ ...leadForm, notes: e.target.value })}
        />


        <div className="grid justify-items-stretch">
          <Button lable="save" className="w-32 my-2 justify-self-end" active="true" />
        </div>

      </form>
    </Modal>
  )
}

export default Form;